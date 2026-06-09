/**
 * HTTP client for the National Laws & Regulations Database API.
 *
 * Handles authentication, retries with exponential backoff, rate limiting,
 * and circuit breaker logic.
 */

const RETRYABLE_STATUS_CODES = [429, 502, 503, 504];

export class LawDatabaseClient {
  constructor({ baseUrl, apiKey, timeoutMs = 30000, maxRetries = 3 }) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
    this.apiKey = apiKey;
    this.timeoutMs = timeoutMs;
    this.maxRetries = maxRetries;

    // Rate limiting state
    this._requestTimestamps = [];
    this._maxRequestsPerSecond = 5;

    // Circuit breaker state
    this._consecutiveFailures = 0;
    this._circuitOpen = false;
    this._circuitOpenAt = null;
    this._failureThreshold = 5;
    this._recoveryTimeoutMs = 60000;
  }

  async _waitForRateLimit() {
    const now = Date.now();
    this._requestTimestamps = this._requestTimestamps.filter(
      (t) => now - t < 1000
    );
    if (this._requestTimestamps.length >= this._maxRequestsPerSecond) {
      const oldest = this._requestTimestamps[0];
      const waitMs = 1000 - (now - oldest);
      if (waitMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, waitMs));
      }
    }
    this._requestTimestamps.push(Date.now());
  }

  _checkCircuitBreaker() {
    if (!this._circuitOpen) return;
    const elapsed = Date.now() - this._circuitOpenAt;
    if (elapsed >= this._recoveryTimeoutMs) {
      this._circuitOpen = false;
      this._consecutiveFailures = 0;
    } else {
      throw new Error(
        `Circuit breaker open. Recovery in ${Math.ceil(
          (this._recoveryTimeoutMs - elapsed) / 1000
        )}s`
      );
    }
  }

  _recordSuccess() {
    this._consecutiveFailures = 0;
    this._circuitOpen = false;
  }

  _recordFailure() {
    this._consecutiveFailures++;
    if (this._consecutiveFailures >= this._failureThreshold) {
      this._circuitOpen = true;
      this._circuitOpenAt = Date.now();
    }
  }

  async _request(method, path, { params, body } = {}) {
    this._checkCircuitBreaker();
    await this._waitForRateLimit();

    const cleanPath = path.replace(/^\/+/, "");
    const url = new URL(cleanPath, this.baseUrl + "/");
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    let lastError;
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      let timer;
      try {
        const controller = new AbortController();
        timer = setTimeout(() => controller.abort(), this.timeoutMs);

        const headers = {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        };

        const response = await fetch(url.toString(), {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        if (response.ok) {
          this._recordSuccess();
          return await response.json();
        }

        const status = response.status;

        if (status === 401 || status === 403) {
          this._recordFailure();
          const err = new Error(`Authentication failed (HTTP ${status}). Check LAW_DB_API_KEY.`);
          err._noRetry = true;
          throw err;
        }

        if (status === 400) {
          const errorBody = await response.json().catch(() => ({}));
          const err = new Error(`Bad request (HTTP 400): ${JSON.stringify(errorBody)}`);
          err._noRetry = true;
          throw err;
        }

        if (status === 404) {
          this._recordSuccess();
          return null;
        }

        if (RETRYABLE_STATUS_CODES.includes(status) && attempt < this.maxRetries) {
          const retryAfter = response.headers.get("Retry-After");
          const baseDelay = 2000 * Math.pow(2.5, attempt);
          const retrySeconds = retryAfter ? Number(retryAfter) : NaN;
          const delay = Number.isFinite(retrySeconds)
            ? Math.min(retrySeconds * 1000, 30000)
            : Math.min(baseDelay, 30000);

          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        this._recordFailure();
        const err = new Error(`HTTP ${status}: ${await response.text()}`);
        err._noRetry = true;
        throw err;
      } catch (error) {
        lastError = error;

        if (error.name === "AbortError") {
          lastError = new Error(`Request timeout after ${this.timeoutMs}ms`);
        }

        if (error._noRetry || lastError._noRetry) {
          this._recordFailure();
          throw lastError;
        }

        if (attempt < this.maxRetries) {
          const delay = 2000 * Math.pow(2.5, attempt);
          await new Promise((resolve) => setTimeout(resolve, Math.min(delay, 30000)));
          continue;
        }

        this._recordFailure();
        throw lastError;
      } finally {
        clearTimeout(timer);
      }
    }

    throw lastError;
  }

  /**
   * Search laws by keyword, type, issuing authority, date range, status.
   */
  async searchLaws({ keyword, lawType, issuingAuthority, dateRange, status, page = 1, pageSize = 20 }) {
    const params = {
      searchWord: keyword,
      type: lawType,
      office: issuingAuthority,
      beginDate: dateRange?.start,
      endDate: dateRange?.end,
      status,
      page: String(page),
      pageSize: String(pageSize),
    };

    const data = await this._request("GET", "/search", { params });

    if (!data) {
      return { total: 0, items: [] };
    }

    return {
      total: data.total || data.count || 0,
      items: (data.result || data.data || []).map((item) => ({
        title: item.title || item.name,
        documentNumber: item.documentNumber || item.doc_number,
        lawType: item.type || item.lawType,
        issuingAuthority: item.office || item.issuingAuthority,
        publishDate: item.publishDate || item.publish_date,
        effectiveDate: item.effectiveDate || item.effective_date,
        status: item.status || item.effective_status,
        summary: item.summary || item.abstract,
      })),
    };
  }

  /**
   * Get full text and details of a specific law.
   */
  async getLawDetail({ documentNumber, lawName, includeHistory = false, includeRelatedCases = false }) {
    const params = {
      docNumber: documentNumber,
      name: lawName,
      history: includeHistory,
      relatedCases: includeRelatedCases,
    };

    const data = await this._request("GET", "/detail", { params });

    if (!data) {
      return null;
    }

    return {
      title: data.title || data.name,
      documentNumber: data.documentNumber || data.doc_number,
      lawType: data.type || data.lawType,
      issuingAuthority: data.office || data.issuingAuthority,
      publishDate: data.publishDate || data.publish_date,
      effectiveDate: data.effectiveDate || data.effective_date,
      status: data.status,
      fullText: data.content || data.fullText || data.text,
      chapters: data.chapters || [],
      history: includeHistory ? data.history || [] : undefined,
      relatedCases: includeRelatedCases ? data.relatedCases || [] : undefined,
    };
  }

  /**
   * Search court cases that cite a specific law.
   */
  async searchCasesByLaw({ lawName, documentNumber, articleNumber, courtLevel, page = 1, pageSize = 20 }) {
    const params = {
      lawName,
      docNumber: documentNumber,
      article: articleNumber,
      courtLevel,
      page: String(page),
      pageSize: String(pageSize),
    };

    const data = await this._request("GET", "/cases/by-law", { params });

    if (!data) {
      return { total: 0, items: [] };
    }

    return {
      total: data.total || data.count || 0,
      items: (data.result || data.data || []).map((item) => ({
        caseNumber: item.caseNumber || item.case_number,
        caseName: item.caseName || item.title,
        court: item.court,
        courtLevel: item.courtLevel || item.court_level,
        decisionDate: item.decisionDate || item.decision_date,
        caseType: item.caseType || item.case_type,
        summary: item.summary || item.abstract,
        citedArticles: item.citedArticles || item.cited_articles || [],
      })),
    };
  }

  /**
   * Simple health check — ping the API.
   */
  async ping() {
    try {
      const data = await this._request("GET", "/health");
      return data !== null;
    } catch {
      return false;
    }
  }
}
