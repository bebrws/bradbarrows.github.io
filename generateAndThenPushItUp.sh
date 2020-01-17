bundle exec rake generate
#bundle exec rake preview

cp CNAME public/CNAME
cp CNAME docs/CNAME
git add *
git commit -am "saving"
git pull --rebase origin master; git push origin master
