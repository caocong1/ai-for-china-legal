#!/bin/bash
# setup-skills.sh — 创建符号链接，将各插件的 SKILL.md 注册到 .qwen/skills/
#
# 用法：bash scripts/setup-skills.sh
#
# 原理：Qwen Code 自动发现 <project>/.qwen/skills/ 下的 skill。
# 本脚本将各插件的 skills 目录链接到这里，使用前缀避免命名冲突。

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SKILLS_DIR="$PROJECT_DIR/.qwen/skills"

# 创建 .qwen/skills 目录（如不存在）
mkdir -p "$SKILLS_DIR"

echo "注册 skill 符号链接到 $SKILLS_DIR ..."

# 遍历所有插件目录
for plugin in "$PROJECT_DIR"/*/; do
  plugin_name=$(basename "$plugin")

  # 跳过非插件目录
  if [ ! -d "${plugin}skills" ]; then
    continue
  fi

  # 提取前缀（去掉 -legal 后缀）
  prefix="${plugin_name%-legal}"

  # 遍历该插件下的所有 skill 目录
  for skill_dir in "${plugin}skills"/*/; do
    # 检查是否有 SKILL.md
    if [ ! -f "${skill_dir}SKILL.md" ]; then
      continue
    fi

    skill_name=$(basename "$skill_dir")
    link_name="${prefix}-${skill_name}"
    link_path="$SKILLS_DIR/$link_name"

    # 创建相对路径符号链接
    if [ -L "$link_path" ]; then
      # 已存在，跳过
      echo "  [已存在] $link_name"
    else
      # 使用相对于 .qwen/skills/ 的路径
      rel_path="../../../${plugin_name}/skills/${skill_name}"
      ln -sf "$rel_path" "$link_path"
      echo "  [已注册] $link_name -> $rel_path"
    fi
  done
done

# 注册共享研究闸门
research_gate="$PROJECT_DIR/shared/research-gate"
if [ -d "$research_gate" ]; then
  link_path="$SKILLS_DIR/shared-research-gate"
  if [ ! -L "$link_path" ]; then
    ln -sf "../../shared/research-gate" "$link_path"
    echo "  [已注册] shared-research-gate -> ../../shared/research-gate"
  fi
fi

echo ""
echo "完成。已注册 $(ls -1 "$SKILLS_DIR" | grep -v '^\.' | wc -l) 个 skill。"
echo ""
echo "在新 session 中打开本项目目录即可使用。"
echo "卸载：bash scripts/cleanup-skills.sh"
