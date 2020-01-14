importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js");

try{
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
  clients.openWindow('https://nestadmin.herokuapp.com/');
  // let url = 'https://nestadmin.herokuapp.com/';
  //   event.notification.close(); // Android needs explicit close.
  //   event.waitUntil(
  //       clients.matchAll({type: 'window'}).then( windowClients => {
  //           // Check if there is already a window/tab open with the target URL
  //           for (var i = 0; i < windowClients.length; i++) {
  //               var client = windowClients[i];
  //               // If so, just focus it.
  //               if (client.url === url && 'focus' in client) {
  //                   return client.focus();
  //               }
  //           }
  //           // If not, then open the target URL in a new window/tab.
  //           if (clients.openWindow) {
  //               return clients.openWindow(url);
  //           }
  //       })
  //   );
});
}catch(ex){
  console.log('FCM ERROR: ', ex);
}