// public/firebase-messaging-sw.js
importScripts(
  'https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js',
);
// importScripts('https://www.gstatic.com/firebasejs/<v9+>/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/<v9+>/firebase-messaging-compat.js');
const firebaseConfig = {
  apiKey: 'AIzaSyDLN1qbVnvyBxf9TBM4QypXO7UTSw-UhhI',
  authDomain: 'gate26-939fc.firebaseapp.com',
  databaseURL: 'https://gate26-939fc-default-rtdb.firebaseio.com',
  projectId: 'gate26-939fc',
  storageBucket: 'gate26-939fc.appspot.com',
  messagingSenderId: '575249285810',
  appId: '1:575249285810:web:4568d313b0574c07a83fab',
  measurementId: 'G-CEBPHDX6Z5',
  // measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// const isSupported = firebase.messaging.isSupported();
// if (isSupported) {
//   const messaging = firebase.messaging();
//   messaging.onBackgroundMessage(({ notification: { title, body, image } }) => {
//     self.registration.showNotification(title, {
//       body,
//       icon: image || '/assets/icons/icon-72x72.png',
//     });
//   });
// }
const messaging = firebase.messaging();

// messaging.onBackgroundMessage(messaging, (payload) => {
//   const options = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };
//   return self.registration.showNotification(
//     payload.notification.title,
//     options,
//   );
// });
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
self.addEventListener('push', function (event) {
  if (event.data) {
    // 알림 메세지일 경우엔 event.data.json().notification;
    const data = event.data.json().data;
    const options = {
      body: data.body,
      icon: data.image,
      image: data.image,
      data: {
        click_action: data.click_action, // 이 필드는 밑의 클릭 이벤트 처리에 사용됨
      },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  } else {
    console.log('This push event has no data.');
  }
});

// 클릭 이벤트 처리
// 알림을 클릭하면 사이트로 이동한다.
self.addEventListener('notificationclick', function (event) {
  event.preventDefault();
  // 알림창 닫기
  event.notification.close();

  // 이동할 url
  // 아래의 event.notification.data는 위의 푸시 이벤트를 한 번 거쳐서 전달 받은 options.data에 해당한다.
  // api에 직접 전달한 데이터와 혼동 주의
  const urlToOpen = event.notification.data.click_action;

  // 클라이언트에 해당 사이트가 열려있는지 체크
  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then(function (windowClients) {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.includes(urlToOpen)) {
          matchingClient = windowClient;
          break;
        }
      }

      // 열려있다면 focus, 아니면 새로 open
      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});
