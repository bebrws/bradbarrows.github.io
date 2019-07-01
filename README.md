# Brads Blog - Using Octopress

## Octo Notes

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


```

Or run:

```
rake generate && rake preview&; open 'http://localhost:4000/'    

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