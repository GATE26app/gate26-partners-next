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
  // return new Promise(function (resolve, reject) {
  //   resolve();
  //   setTimeout(function () {
  //     self.registration.getNotifications().then((notifications) => {
  //       notifications.forEach((notification) => {
  //         notification.close();
  //       });
  //     });
  //   }, 0);
  // });
  // self.registration.hideNotification();
  // showNotification(payload);
  if (payload.notification) {
    return;
  } else {
    // showNotification(payload);
  }
});

// self.addEventListener('push', (e) => {
//   if (e.data) {
//     console.log('push e', e);
//     console.log('push e data', e.data);
//     const data = e.data.json().data;
//     console.log('###data', data);
//     // if (!pushThorttle) {
//     showNotification(data);
//     // }
//   } else {
//     console.log('This push event has no data.');
//   }
// });
// self.addEventListener('notificationclick', (e) => {
//   console.log('push e', e);
//   console.log('push e data', e.data);
//   if (e.data) {
//     const data = e.data.json().data;
//     console.log('###data', data);
//     // if (!pushThorttle) {
//     showNotification(data);
//     // }
//   } else {
//     console.log('This push event has no data.');
//   }
// });

const showNotification = (data) => {
  console.log('showNotification');

  console.log('showNotification data', data);
  console.log(
    'title',
    data.notification ? data.notification.title : data.data.title,
  );
  console.log(
    'body',
    data.data.sendbird ? data.data.message : data.notification.body,
  );
  const options = {
    title: data.notification ? data.notification.title : data.data.title,
    body: data.data.sendbird ? data.notification.message : data.data.body,
    icon: data.icon || '/firebase-logo.png',
    data: {
      click_action: getClickAction(data.data),
    },
  };
  self.registration.showNotification(
    data.notification ? data.notification.title : data.data.title,
    options,
  );
};

const getClickAction = (data) => {
  console.log('getClickAction data', data);
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
  console.log('[푸시 알림 클릭]event', event);
  event.notification.close();
  const urlToOpen = event.notification.data.click_action;

  console.log('urlToOpen', urlToOpen);
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
