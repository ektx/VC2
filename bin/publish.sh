#!/usr/bin/env bash

# 合并分支
git checkout master
git merge dev

# 更新组件
yarn run update

# 构建组件
yarn run build
