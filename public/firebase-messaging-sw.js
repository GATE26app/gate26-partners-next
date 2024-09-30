// // public/firebase-messaging-sw.js
// importScripts(
//   'https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js',
// );
// importScripts(
//   'https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js',
// );
// const firebaseConfig = {
//   apiKey: 'AIzaSyDLN1qbVnvyBxf9TBM4QypXO7UTSw-UhhI',
//   authDomain: 'gate26-939fc.firebaseapp.com',
//   databaseURL: 'https://gate26-939fc-default-rtdb.firebaseio.com',
//   projectId: 'gate26-939fc',
//   storageBucket: 'gate26-939fc.appspot.com',
//   messagingSenderId: '575249285810',
//   appId: '1:575249285810:web:4568d313b0574c07a83fab',
//   measurementId: 'G-CEBPHDX6Z5',
//   // measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
// };

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();
// let pushThortlle;
// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload,
//   );
//   // Customize notification here
//   // const notificationTitle = payload.data.title;
//   // const notificationOptions = {
//   //   body: payload.data.body,
//   //   icon: payload.data.icon || '/firebase-logo.png',
//   // };
//   pushFuc(payload, data);
//   // self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener('push', function (event) {
//   if (event.data) {
//     // 알림 메세지일 경우엔 event.data.json().notification;
//     const data = event.data.json().data;

//     pushFuc(event, data);
//     // alert();
//   } else {
//     console.log('This push event has no data.');
//   }
// });

// const pushFuc = (event, data) => {
//   console.log('pushFuc');
//   if (pushThortlle) return;
//   pushThortlle = true;
//   setTimeout(() => {
//     const options = {
//       body: data.body,
//       data: {
//         click_action:
//           data.type == 'ITEM'
//             ? `/updateGoods?itemcode=${data.tgId}`
//             : data.type == 'ITEM'
//               ? `/orderDetail?orderId=${data.tgId}`
//               : `/cancelDetail?orderId=${data.tgId}`, // 이 필드는 밑의 클릭 이벤트 처리에 사용됨
//       },
//     };
//     event.waitUntil(self.registration.showNotification(data.title, options));
//     pushThortlle = false;
//   }, 1000);
// };
// // 클릭 이벤트 처리
// // 알림을 클릭하면 사이트로 이동한다.
// self.addEventListener('notificationclick', function (event) {
//   // event.preventDefault();
//   // 알림창 닫기
//   event.notification.close();

//   // 이동할 url
//   // 아래의 event.notification.data는 위의 푸시 이벤트를 한 번 거쳐서 전달 받은 options.data에 해당한다.
//   // api에 직접 전달한 데이터와 혼동 주의
//   // const urlToOpen =
//   //   'http://localhost:3001' + event.notification.data.click_action;
//   const urlToOpen = event.notification.data.click_action;

//   // // 클라이언트에 해당 사이트가 열려있는지 체크
//   const promiseChain = clients
//     .matchAll({
//       type: 'window',
//       includeUncontrolled: true,
//     })
//     .then(function (windowClients) {
//       let matchingClient = null;
//       for (let i = 0; i < windowClients.length; i++) {
//         const windowClient = windowClients[i];
//         if (windowClient.url.includes(urlToOpen)) {
//           matchingClient = windowClient;
//           break;
//         }
//       }
//       // 열려있다면 focus, 아니면 새로 open
//       if (matchingClient) {
//         return matchingClient.focus();
//       } else {
//         return clients.openWindow(urlToOpen);
//       }
//     });

//   event.waitUntil(promiseChain);
// });

importScripts(
  'https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js',
);

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

const messaging = firebase.messaging();

// self.registration.hideNotification();
messaging.onBackgroundMessage((payload) => {
  console.log('background', payload);
  showNotification(payload.data);
});

self.addEventListener('push', (e) => {
  if (e.data) {
    const data = e.data.json().data;
    console.log('###data', data);
    // if (!pushThorttle) {
    showNotification(data);
    // }
  } else {
    console.log('This push event has no data.');
  }
});

const showNotification = (data) => {
  console.log('showNotification');

  console.log('data', data);
  const options = {
    body: data.body,
    icon: data.icon || '/firebase-logo.png',
    data: {
      click_action: getClickAction(data),
    },
  };
  self.registration.showNotification(data.title, options);
};

const getClickAction = (data) => {
  console.log('data', data);
  if (data.sendbird !== undefined) {
    console.log('JSON.parse(data.sendbird)', JSON.parse(data.sendbird));
    console.log('channel_url', JSON.parse(data.sendbird).channel?.channel_url);
  }
  switch (data.type) {
    case 'ITEM':
      return `/updateGoods?itemcode=${data.tgId}`;
    case 'ORDER':
      return `/orderDetail?orderId=${data.tgId}`;
    case 'CANCEL':
      return `/cancelDetail?orderId=${data.tgId}`;
    default:
      return data.sendbird !== undefined
        ? `/?sendBird=true&sendbirdUrl=${JSON.parse(data.sendbird).channel?.channel_url}`
        : '/';
  }
};

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data.click_action;

  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.includes(urlToOpen)) {
          return windowClient.focus();
        }
      }
      return clients.openWindow(urlToOpen);
    });

  event.waitUntil(promiseChain);
});
