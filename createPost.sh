#!/bin/bash

echo """Creating a new post named: $1"""

bash -c "bundle exec rake new_post['$1']"


echo """
Post file is created in:

source/_posts

"""
