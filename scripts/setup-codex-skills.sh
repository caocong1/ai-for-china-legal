#!/bin/bash
# setup-codex-skills.sh — 将 ai-for-china-legal 总路由和动态 intake 注册到个人 Codex skills。

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
CODEX_ROOT_DIR="${CODEX_HOME:-$HOME/.codex}"
CODEX_SKILLS_DIR="$CODEX_ROOT_DIR/skills"

mkdir -p "$CODEX_SKILLS_DIR"

install_skill_link() {
  target_path="$1"
  link_path="$2"

  if [ ! -d "$target_path" ] || [ ! -f "$target_path/SKILL.md" ]; then
    echo "[错误] skill 目录无效：$target_path" >&2
    exit 1
  fi

  if [ -L "$link_path" ]; then
    current_target="$(readlink "$link_path")"
    if [ "$current_target" = "$target_path" ]; then
      echo "[已安装] $(basename "$link_path")"
      return
    fi
    echo "[冲突] 已存在指向其他位置的符号链接：$link_path -> $current_target" >&2
    exit 1
  fi

  if [ -e "$link_path" ]; then
    echo "[冲突] 已存在非符号链接路径，不会覆盖：$link_path" >&2
    exit 1
  fi

  ln -s "$target_path" "$link_path"
  echo "[已注册] $(basename "$link_path") -> $target_path"
}

install_skill_link \
  "$PROJECT_DIR/shared/ai-for-china-legal-workflow" \
  "$CODEX_SKILLS_DIR/ai-for-china-legal-workflow"

install_skill_link \
  "$PROJECT_DIR/shared/legal-document-intake" \
  "$CODEX_SKILLS_DIR/legal-document-intake"

echo ""
echo "安装完成。新建一个 Codex 任务后，可直接说："
echo "请使用 ai-for-china-legal 法律工作流，审阅并修订……"
