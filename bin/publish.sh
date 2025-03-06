#!/usr/bin/env bash

# 获取当前分支
GIT_STATUS=$(git branch --show-current)

# if [ $GIT_STATUS != 'dev' ]; then 
#   echo "请选择 Dev 分支进行发布"
#   exit 0
# fi

# 合并分支
# git checkout master
# git merge dev
echo -e "\n🚚 选择发布地址"

REGISTRY=""
address=(
  "Local"
  "NPM"
)

select add in ${address[@]}
do
  if [ $add = 'Local' ];then
    REGISTRY="--registry http://localhost:4873"
    break
  else
    REGISTRY="--registry https://registry.npmjs.org"
    break
  fi
done

echo $REGISTRY

echo -e "\n🔖 选择发布的版本标签"
PUBLISH_TAG=""
tags=(
  "latest"
  "beta"
)
select tag in ${tags[@]}
do
  if [ $tag = 'latest' ];then
    PUBLISH_TAG="latest"
    break
  else
    PUBLISH_TAG="beta"
    break
  fi
done

echo -e "\n"
read -r -p "🗑  是否需要回收版本? [y/N]" input
NEED_UNPUBLISH=0
case $input in 
  [yY][eE][sS]|[yY])
    echo "是"
    npm unpublish $REGISTRY --force
    NEED_UNPUBLISH=1
    ;;
  *)
    echo "否"
    ;;
esac

# 获取版本信息
VERSION=$(grep version package.json | awk -F'"' '{ print $4}')
ONLINE_VERSION=$(npm show vc2 $REGISTRY | awk -F':' '/latest/ {print $2}')

echo $VERSION

if [ $PUBLISH_TAG == "beta" ]
then
  ONLINE_VERSION=$(npm show vc2 $REGISTRY | awk -F':' '/beta/ {print $2}')
fi 

if [ $NEED_UNPUBLISH == 0 ] 
then
  echo -e "\n📇 版本信息验证"
  echo -e "线上版本: $ONLINE_VERSION"
  echo -e "当前版本: $ONLINE_VERSION"

  if [ $VERSION == $ONLINE_VERSION ]
  then
    echo -e "\n⚠️ 与上一个版本相同"
    exit 0
  fi
fi

echo -e "\n🔨 开始编译"

npm run lib

echo -e "\n🚀 提交版本"

npm publish --tag $PUBLISH_TAG $REGISTRY
