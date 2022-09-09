# Manage data with different storages - firestore, cloudinary, youtube, google drive.

## Youtube

- First we need access token. We can make it only in browser - run getNewToken.js file in terminal, it return url, that we must use in browser and get token. !!! If browser do not show token, cause of redirection problem - we can get it in developer console -> network -> query params -> token

- On youtube we can upload only 6 video per day.

## Google drive

- We must create folder and give access to it to our service account

## Build and publish

- commit and push changes
- run $ npm run build:lib
- run $ npm run release
