/*
Give the service worker access to Firebase Messaging.
Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
*/
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

/*
Initialize the Firebase app in the service worker by passing in the messagingSenderId.
* New configuration for app@pulseservice.com
*/
firebase.initializeApp({
    apiKey: "AIzaSyAPB2vOhwjoQUo55B372jrGPIJVsnfhFMc",
    authDomain: "fir-demo-application-fictive.firebaseapp.com",
    projectId: "fir-demo-application-fictive",
    storageBucket: "fir-demo-application-fictive.appspot.com",
    messagingSenderId: "285601646974",
    appId: "1:285601646974:web:2e4d9a6e493ff917d94b2f"
});

/*
Retrieve an instance of Firebase Messaging so that it can handle background messages.
*/
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
// messaging.onBackgroundMessage(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});