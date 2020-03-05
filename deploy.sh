#!/usr/bin/env sh

# 终止一个错误
set -e

# 构建
# npm run build

# 进入生成的构建文件夹
# cd build

# 如果你是要部署到自定义域名
# echo 'www.example.com' > CNAME


git branch -a
# 新建并切换到 gh-pages 分支
git checkout -b gh-pages
# 显示有变更的文件
git status
# 删除 master 分支
git branch -d master

# 添加当前目录的所有文件到暂存区
git add .
# 提交暂存区到仓库区，并添加代码提交信息
git commit -m 'first commit'

# 添加远程仓库
git remote add origin git@github.com:Wangbaoqi/nateCase.git
# 把本地的 gh-pages 分支推送到 origin 服务器上
git push origin gh-pages


# 如果你想要部署到 https://<USERNAME>.github.io
# git push -f git@github.com:Wangbaoqi/nateCase.git master

# 如果你想要部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:Wangbaoqi/nateCase.git master:gh-pages

cd -