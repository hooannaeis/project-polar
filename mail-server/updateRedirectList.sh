#!/bin/bash

# declare constants
EXPOSE_LIST_API='https://us-central1-project-polar-eda66.cloudfunctions.net/exposeRedirectList'

# pull redirects from api into local file
curl $EXPOSE_LIST_API -o /home/ubuntu/project-polar/mail-server/redirects_temp.json
echo redirects retrieved.

# check if files changed
cmp --silent /home/ubuntu/project-polar/mail-server/redirects.json /home/ubuntu/project-polar/mail-server/redirects_temp.json && FILES_CHANGED="FALSE" || FILES_CHANGED="TRUE"

# restart postfix service if necessary
if [ "$FILES_CHANGED" == "TRUE" ]; then
    echo Files changed: $FILES_CHANGED restarting postfix...
    sudo bash -c 'cat /home/ubuntu/project-polar/mail-server/redirects_temp.json > /home/ubuntu/project-polar/mail-server/redirects.json'
    #TODO: restart pm2 which runs the mail server api
else
    echo Files changed: $FILES_CHANGED  not restarting
fi
