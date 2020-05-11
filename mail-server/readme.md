# project polar mail server
the postfix mail server needs to update its list of redirects regularly. to do so, we run a cronjob once a minute that retrieves the mails from firestore

## setup guide
- place the context of cronjobs.txt into the cronjob-scheduler
- ```crontab -e``` --> edit current cronjobs
- place content of ```cronjobs.txt``` into your crontab

## dependencies
- cp: ```sudo apt install cp``` --> used to parse json responses from ```curl```