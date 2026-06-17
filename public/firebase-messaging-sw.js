importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey:            'AIzaSyAQ-svMaThJ7J0msRkZHtuJ3bPQfQTfFQA',
  authDomain:        'insideout-4cd8d-137e2.firebaseapp.com',
  projectId:         'insideout-4cd8d-137e2',
  storageBucket:     'insideout-4cd8d-137e2.firebasestorage.app',
  messagingSenderId: '320761412092',
  appId:             '1:320761412092:web:88f41a010eb8e056845a79',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// استقبال الإشعارات في الخلفية
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});