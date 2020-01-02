importScripts("./firebase-app.js");
importScripts("./firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCrGumtbn2McvNXzZdhShhLaW0QsIFZxOk",
  authDomain: "nest-df0a7.firebaseapp.com",
  databaseURL: "https://nest-df0a7.firebaseio.com",
  projectId: "nest-df0a7",
  storageBucket: "nest-df0a7.appspot.com",
  messagingSenderId: "422026408390",
  appId: "1:422026408390:web:cf0e6a945e7f1ec0d602c7"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});

self.addEventListener('notificationclick', function(event) {
  // do what you want
  // ...
});
