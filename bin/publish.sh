#!/usr/bin/env bash

# 合并分支
git checkout master
git merge dev

# 更新组件
yarn run update

# 构建组件
yarn run build

# 提交到公司 NPM
VERSION=$(awk '/version/ {print $2}' ./package.json)

echo $VERSION

# 发布
npm publish --registry http://47.111.127.77:4873

# git tag 0.0.0

# git tag -l