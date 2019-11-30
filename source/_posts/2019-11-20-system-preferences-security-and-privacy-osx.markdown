---
layout: post
title: "OSX - Manually configuring System Preferences Security And Privacy settings"
date: 2019-07-01 03:40:47 -0700
comments: true
categories:
---

I have a laptop which I wanted to be able to check the status of remotely.

For remote access on OSX I use Jump Desktop. On Catalina I ran into an issue where after installing Jump Desktop Connect I was not able to add Jump Desktop Connect to my Security And Privacy settings to enable the Screen Recording permission.

I was able to manually do this after some grepping.

I was able to figure out that a sqlite DB exists that contains all the OSX Catalina Security and Privacy settings.

This DB can be opened with:
```
  sudo sqlite3 /Library/Application\ Support/com.apple.TCC/TCC.db
```
The table of interest is called acccess.

To get some information on this table run:
```
  PRAGMA table_info(access);
  .schema access
```
You will see it has the followign columns:
```
  0|service|TEXT|1||1
  1|client|TEXT|1||2
  2|client_type|INTEGER|1||3
  3|allowed|INTEGER|1||0
  4|prompt_count|INTEGER|1||0
  5|csreq|BLOB|0||0
  6|policy_id|INTEGER|0||0
  7|indirect_object_identifier_type|INTEGER|0||0
  8|indirect_object_identifier|TEXT|0||4
  9|indirect_object_code_identity|BLOB|0||0
  10|flags|INTEGER|0||0
  11|last_modified|INTEGER|1|CAST(strftime('%s','now') AS INTEGER)|0
```


I then found a row for a service that had the permissions I wanted for Jump Desktop Connect
```
  kTCCServiceScreenCapture|com.apple.screensharing.agent|0|0|1||||UNUSED||0|1573525900
```
And then a row for Jump Desktop Connect itself:
```
  kTCCServiceAccessibility|com.p5sys.jump.connect|0|1|1|??|||UNUSED||0|1572360434
```
Now I have the client string I need and an example row. I duplicated the screensharing service row but switched out the Jump Desktop Connect client string and ran the following in the sqlite3 client:
```
  INSERT INTO access (service,client,client_type,allowed,prompt_count,csreq,policy_id,indirect_object_identifier_type,indirect_object_identifier,indirect_object_code_identity,flags,last_modified) VALUES (
  'kTCCServiceScreenCapture','com.p5sys.jump.connect',0,0,1,NULL,NULL,NULL,'UNUSED',NULL,0,1573525900);
```
Then I was able to open System Preferences Security and Privacy settins and enable the Screen Recording permission on the application. It finally was showing the list. I probably could also just run

```
  INSERT INTO access (service,client,client_type,allowed,prompt_count,csreq,policy_id,indirect_object_identifier_type,indirect_object_identifier,indirect_object_code_identity,flags,last_modified) VALUES (
  'kTCCServiceScreenCapture','com.p5sys.jump.connect',0,1,1,NULL,NULL,NULL,'UNUSED',NULL,0,1573525900);
```
To automatically enable this setting but I did not test this.