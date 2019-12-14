cp CNAME public/CNAME
cp CNAME docs/CNAME
git add *
git commit -am "saving"
git pull --rebase origin master; git push origin master
