#!/bin/bash
cd /tmp
rm -rf bower_component
git clone $4 bower_component
cd bower_component
git checkout $5
git checkout -b $5

shopt -s extglob dotglob
rm -rf !(.git|.|..)
cp -r $2/$3/!(.git|.|..) .
if [ -a .gitignore ];then
  grep -vE "^(dist/?|/.*.js)$" .gitignore > .gitignore.new
  mv -f .gitignore.new .gitignore
fi

git add --all .
git commit -m"bower version $1"
git tag $1 -a -m"bower version $1"
git push origin $5 --follow-tags
