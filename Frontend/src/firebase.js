import firebase from 'firebase';

export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyAPB2vOhwjoQUo55B372jrGPIJVsnfhFMc",
    authDomain: "fir-demo-application-fictive.firebaseapp.com",
    projectId: "fir-demo-application-fictive",
    storageBucket: "fir-demo-application-fictive.appspot.com",
    messagingSenderId: "285601646974",
    appId: "1:285601646974:web:2e4d9a6e493ff917d94b2f"
  });

  navigator.serviceWorker
    .register('/my-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });
}


export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken()
    console.log('token do usuário:', token);
    document.getElementById("user_device_token").value = token
    localStorage.setItem("user_device_token", token)
    return token;
  } catch (error) {
    console.error(error);
  }
}
