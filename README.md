# Code Challenge

## Set up
run the below to get started.

- yarn install
- cd ios
- pod install

## Running on Android
I added different env setup so to build android:
- yarn run androidDevDebug

## Running on iOS(Real Device)
if you dont have ios-deploy installed and you wish to install on a live device run the below command before you proceed.
- npm install -g ios-deploy
- yarn run ios

## Running on iOS(Emulator)
- yarn run ios

## Running Test

I added a test on the saga layer and this will execute by simply running:

- npm test

## Trouble shooting
# if you run into issues relating to Metro not running while trying to run iOS, simply run
- yarn start
- i

