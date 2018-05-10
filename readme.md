# Quitr

Mobile application that uses loss aversion to help users quit smoking.

![recording](http://g.recordit.co/R8U6P7C5p7.gif)

## Goal

This is a pet project mostly oriented at learning several libs and tools
while building a mobile app.

## How it works

It's been demonstrated that the feeling of losing something is much more
powerful and lasting than the sense of earning something (loss aversion).
It's for this reason that setting on fire a 10 dollars bill for each
cigarette that you smoke is so much more motivating than "giving yourself"
a reward if you do not smoke. For this to actually work, you have to
literally "lose" the good (ie: USD10), and that's how this app can help.
Set yourself a goal, and log every cigarette you have. Once you exceed
your daily quota, the app will start charging you for absolutely nothing
in return (thus losing your money).

## The code

The code is separated into two folders:

- api: it's a lambda function mainly targeted at hiding the stripe (payment
gateway) secret key. with this lambda you can achieve two things; adding a
card (via token, we never see the user's credit card info) and charging.
- app: react native mobile app (mostly tested in iOS). Notice that the RN
version is rather old (0.40.0).

## The mobile app

The mobile app has been built using [react-native-components-viewer](https://github.com/machadogj/react-native-components-viewer)
to test how the app looks in different screen sizes. Look for the documentation
for how to run it.

In order to choose whether to run the components viewer or the actual app, you
need to modify the `index.ios.js` file.

Run the mobile app like a regular React Native app.

## Credits
Design by [@responsivekev](https://twitter.com/responsivekev)
