#!/bin/bash

# declare constants
EXPOSE_LIST_API='https://us-central1-project-polar-eda66.cloudfunctions.net/exposeRedirectList'

# pull redirects from api into local file
curl $EXPOSE_LIST_API -o redirects.txt
echo redirects retrieved.

# parse  redirect list into new file
cat redirects.txt | jq -r 'to_entries[] | "\(.value.receiveMail) \(.value.destinationMail)"' >  /home/ubuntu/virtual_temp
echo redirects parse.

# check if files changed
cmp --silent /etc/postfix/virtual /home/ubuntu/virtual_temp && FILES_CHANGED="FALSE" || FILES_CHANGED="TRUE"

# restart postfix service if necessary
if [ "$FILES_CHANGED" == "TRUE" ]; then
    echo Files changed: $FILES_CHANGED restarting postfix...
    sudo bash -c 'cat /home/ubuntu/virtual_temp > /etc/postfix/virtual'
    sudo postmap /etc/postfix/virtual
    sudo service postfix reload
else
    echo Files changed: $FILES_CHANGED  not restarting
fi
