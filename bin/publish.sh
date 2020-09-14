#!/usr/bin/env bash

# 获取当前分支
GIT_STATUS=$(git branch --show-current)

if [ $GIT_STATUS != 'dev' ]; then 
  echo "请选择 Dev 分支进行发布"
  exit 0
fi

# 合并分支
git checkout master
git merge dev

# 提交到公司 NPM
VERSION=$(awk '/version/ {print $2}' ./package.json)

VERSION=${VERSION#*\"}
VERSION=${VERSION%\"*}

echo $VERSION

# 发布
ONLINE_VERSION=$(npm show vc2 --registry http://47.111.127.77:4873 | grep 'latest')
ONLINE_VERSION=${ONLINE_VERSION#*:}

if [ONLINE_VERSION == VERSION]
then 
  echo '此版本已经发布过'
  exit 0
fi

# 更新组件
yarn run update

# 构建组件
yarn run build

npm publish --registry http://47.111.127.77:4873
git commit -am $VERSION

git tag $VERSION