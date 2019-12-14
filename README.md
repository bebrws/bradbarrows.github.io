# Brads Blog - Using Octopress

# Octo Notes

### Create a new post
get into bash then run the command:
```
bash
bundle exec rake new_post["SPPlus"]
```

### Install notes:
I installed this theme:
https://github.com/rastersize/BlogTheme


Then I ran
```
rake install\[BlogTheme\]
```

Then whenever I want to update I run:

```
rake generate
rake preview

bundle exec rake generate
bundle exec rake preview


```

Or run:

```
rake generate && rake preview&; open 'http://127.0.0.1:4000/'

```



## Configuration
Configuration for the site is in:
```
bradbarrows.github.io/_config.yml
```


## CSS And SCSS
To edit the CSS don't edit file in the .theme folder.
For example, modify this file:

```bradbarrows.github.io/sass/base/_layout.scss```


## Deploy
From
http://octopress.org/docs/deploying/github/

```
rake setup_github_pages

# Pass in
# git@github.com:bradebarrows/bradbarrows.github.io.git

rake deploy
```

To get github pages to work I said to use the masgter branch and use the docs folder

Then I edited
```/bradbarrows.github.io/_config.yml```

and set
```destination: docs```



And also set
```deploy_dir      = "docs"   # deploy directory (for Github pages deployment)```

in the file
```bradbarrows.github.io/Rakefile```



Since my setup is all bad using one branch I have to:

rake generate; rake deploy; git pull --rebase origin master; git push origin master