#!/bin/bash
# setup-claude-skills.sh — 将 ai-for-china-legal 总路由和动态 intake 注册为 Claude Code 个人 skill。
#
# 注册后，Claude Code 在任何目录下都能在 skill 列表中看到这两个 skill，遇到法律事项时
# 先加载总路由与 intake（列问题、提问），而不是在任务中途才读到它们。
# 卸载：删除 ~/.claude/skills/ 下对应的两个符号链接即可。

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
CLAUDE_ROOT_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
CLAUDE_SKILLS_DIR="$CLAUDE_ROOT_DIR/skills"

mkdir -p "$CLAUDE_SKILLS_DIR"

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
  "$CLAUDE_SKILLS_DIR/ai-for-china-legal-workflow"

install_skill_link \
  "$PROJECT_DIR/shared/legal-document-intake" \
  "$CLAUDE_SKILLS_DIR/legal-document-intake"

echo ""
echo "安装完成。新开一个 Claude Code 会话后，可直接说："
echo "请使用 ai-for-china-legal 法律工作流，处理……；开工前的问题出问卷发律师。"
