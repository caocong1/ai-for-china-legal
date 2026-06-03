#!/bin/bash
# cleanup-skills.sh — 移除由 setup-skills.sh 创建的符号链接
#
# 用法：bash scripts/cleanup-skills.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SKILLS_DIR="$PROJECT_DIR/.qwen/skills"

if [ ! -d "$SKILLS_DIR" ]; then
  echo ".qwen/skills 目录不存在。"
  exit 0
fi

echo "清理 .qwen/skills/ 中的符号链接 ..."

removed=0
for link in "$SKILLS_DIR"/*; do
  if [ -L "$link" ]; then
    name=$(basename "$link")
    rm -f "$link"
    echo "  [已移除] $name"
    removed=$((removed + 1))
  fi
done

echo ""
echo "完成。共移除 $removed 个符号链接。"
