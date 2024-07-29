// public/firebase-messaging-sw.js
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

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload,
//   );
//   // Customize notification here
//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body,
//     icon: payload.data.icon || '/firebase-logo.png',
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
self.addEventListener('push', function (event) {
  if (event.data) {
    // 알림 메세지일 경우엔 event.data.json().notification;
    const data = event.data.json().data;
    const options = {
      body: data.body,
      data: {
        click_action:
          data.type == 'ITEM'
            ? `/updateGoods?itemcode=${data.tgId}`
            : data.type == 'ITEM'
              ? `/orderDetail?orderId=${data.tgId}`
              : `/cancelDetail?orderId=${data.tgId}`, // 이 필드는 밑의 클릭 이벤트 처리에 사용됨
      },
    };
    // alert();
    event.waitUntil(self.registration.showNotification(data.title, options));
  } else {
    console.log('This push event has no data.');
  }

  // //알림 후 5초 뒤,
  // setTimeout(function () {
  //     //얼람 메시지 닫기
  //     n.close();
  // }, 5000);

  // n.onclick = function () {
  //   parent.focus();
  //   window.focus(); //just in case, older browsers
  //   this.close();
  //   $(`/cancelDetail?orderId=${data.tgId}`).addClass("on");
  // };
});

// 클릭 이벤트 처리
// 알림을 클릭하면 사이트로 이동한다.
self.addEventListener('notificationclick', function (event) {
  // event.preventDefault();
  // 알림창 닫기
  event.notification.close();

  // 이동할 url
  // 아래의 event.notification.data는 위의 푸시 이벤트를 한 번 거쳐서 전달 받은 options.data에 해당한다.
  // api에 직접 전달한 데이터와 혼동 주의
  const urlToOpen = event.notification.data.click_action;

  console.log('urlToOpen,', urlToOpen);
  // 클라이언트에 해당 사이트가 열려있는지 체크
  const promiseChain = clients
    .matchAll({ type: 'window', includeUncontrolled: true })
    .then(function (clientList) {
      if (clientList.length > 0) {
        let client = clientList[0];
        client.focus();
        client.navigate(`https://commercepartnersweb.gate26.co.kr${urlToOpen}`);
      } else {
        client.navigate(`https://commercepartnersweb.gate26.co.kr${urlToOpen}`);
      }
    });
  // const promiseChain = clients
  //   .matchAll({
  //     type: 'window',
  //     includeUncontrolled: true,
  //   })
  //   .then(function (windowClients) {
  //     let matchingClient = null;

  //     for (let i = 0; i < windowClients.length; i++) {
  //       const windowClient = windowClients[i];
  //       if (windowClient.url.includes(urlToOpen)) {
  //         matchingClient = windowClient;
  //         break;
  //       }
  //     }

  //     // 열려있다면 focus, 아니면 새로 open
  //     if (matchingClient) {
  //       return matchingClient.focus();
  //     } else {
  //       return clients.openWindow(urlToOpen);
  //     }
  //   });

  event.waitUntil(promiseChain);
});

// Firebase App (the core Firebase SDK) is always required and must be listed first
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

// // Retrieve an instance of Firebase Messaging so that it can handle background messages.
// const messaging = firebase.messaging();

// Handle background messages
// messaging.onBackgroundMessage(function (payload) {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload,
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon || '/firebase-logo.png',
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
// self.addEventListener('push', function (event) {
//   if (event.data) {
//     // 알림 메세지일 경우엔 event.data.json().notification;
//     const data = event.data.json().data;
//     const options = {
//       body: data.body,
//       data: {
//         click_action: `/cancelDetail?orderId=${data.tgId}`,
//         // data.type == 'ITEM'
//         //   ? `/updateGoods?itemcode=${data.tgId}`
//         //   : data.type == 'ITEM'
//         //     ? `/orderDetail?orderId=${data.tgId}`
//         //     : `/cancelDetail?orderId=${data.tgId}`, // 이 필드는 밑의 클릭 이벤트 처리에 사용됨
//       },
//     };
//     // alert();
//     event.waitUntil(self.registration.showNotification(data.title, options));
//   } else {
//     console.log('This push event has no data.');
//   }
// });

// self.addEventListener('notificationclick', function (event) {
//   console.log('notification click');
//   const url = '/';
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });
// Handle notification click
// self.addEventListener('notificationclick', function (event) {
//   event.notification.close();
//   event.waitUntil(
//     clients
//       .matchAll({ type: 'window', includeUncontrolled: true })
//       .then(function (clientList) {
//         if (clientList.length > 0) {
//           let client = clientList[0];
//           client.focus();
//           client.navigate('https://commercepartnersweb.gate26.co.kr');
//         } else {
//           clients.openWindow('https://commercepartnersweb.gate26.co.kr');
//         }
//       }),
//   );
// });
