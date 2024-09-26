// lib/chatUtils.ts
import { getSendBirdToken, getUserId } from '@/utils/localStorage/token';
import axios from 'axios';
import moment from 'moment';
import SendBird from 'sendbird';
import sendBirdApi from './SendBirdApi';

export const initializeSendBird = (
  appId: string,
): SendBird.SendBirdInstance => {
  return new SendBird({ appId: appId });
};
// 연결
export const connectToSendBird = (
  sendbird: SendBird.SendBirdInstance,
  userId: string,
  accessToken?: string,
): Promise<SendBird.User | null> => {
  return new Promise((resolve, reject) => {
    sendbird.connect(userId, accessToken, (user, error) => {
      if (error) {
        console.error('SendBird connect error:', error);
        reject(error);
      } else {
        console.log('Connected to SendBird');
        resolve(user);
      }
    });
  });
};

//link to base64
export async function fetchImageAsBase64(imageUrl: string): Promise<string> {
  const response = await fetch(
    `/api/file?imageUrl=${encodeURIComponent(imageUrl)}`,
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.base64;
}

// 채팅방 생성
export const createChannel = (
  sendbird: SendBird.SendBirdInstance,
  userIds: string[],
  channelName: string,
  channelUrl: string,
  callback: (
    channel: SendBird.GroupChannel | null,
    error: Error | null,
  ) => void,
) => {
  const params = new sendbird.GroupChannelParams();
  params.addUserIds(userIds);
  params.name = channelName;
  params.channelUrl = channelUrl;
  params.isDistinct = true;
  params.customType = 'private';

  sendbird.GroupChannel.createChannel(params, (channel, error) => {
    if (error) {
      console.error('Create channel error:', error);
      callback(null, error);
    } else {
      callback(channel, null);
    }
  });
};

// 채팅방 조회 확인
export const checkChannelExists = async (
  sendbird: SendBird.SendBirdInstance,
  channelId: string,
): Promise<boolean> => {
  try {
    const channel = await new Promise<SendBird.GroupChannel | null>(
      (resolve, reject) => {
        sendbird.connect;
      },
    );

    return channel !== null;
  } catch (error) {
    console.error('Error checking channel existence:', error);
    return false; // 에러가 발생했을 경우 채널이 존재하지 않는 것으로 처리
  }
};

export const saveUserSession = (userId: string, accessToken?: string) => {
  localStorage.setItem('sendbirdUserId', userId);
  if (accessToken) {
    localStorage.setItem('sendbirdAccessToken', accessToken);
  }
};

export const loadUserSession = (): {
  userId: string | null;
  accessToken: string | null;
} => {
  const userId = localStorage.getItem('sendbirdUserId');
  const accessToken = localStorage.getItem('sendbirdAccessToken');
  return { userId, accessToken };
};

export const clearUserSession = () => {
  localStorage.removeItem('sendbirdUserId');
  localStorage.removeItem('sendbirdAccessToken');
};
export const EmojiImage = (emoji: string) => {
  if (emoji == 'sendbird_emoji_sweat_smile') {
    return 'https://static.sendbird.com/icons/emoji_sweat_smile.png';
  } else if (emoji == 'sendbird_emoji_thumbsdown') {
    return 'https://static.sendbird.com/icons/emoji_thumbsdown.png';
  } else if (emoji == 'sendbird_emoji_heart_eyes') {
    return 'https://static.sendbird.com/icons/emoji_heart_eyes.png';
  } else if (emoji == 'sendbird_emoji_laughing') {
    return 'https://static.sendbird.com/icons/emoji_laughing.png';
  } else if (emoji == 'sendbird_emoji_sob') {
    return 'https://static.sendbird.com/icons/emoji_sob.png';
  } else if (emoji == 'sendbird_emoji_rage') {
    return 'https://static.sendbird.com/icons/emoji_rage.png';
  } else if (emoji == 'sendbird_emoji_thumbsup') {
    return 'https://static.sendbird.com/icons/emoji_thumbsup.png';
  }
};
// 시간 비교
export const shouldShowTime = (
  date,
  nextDate,
  lastDate,
  user_id: string,
  next_user_id: string,
) => {
  var year = date.getFullYear().toString().slice(-2);
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  var hour = ('0' + date.getHours()).slice(-2);
  var minute = ('0' + date.getMinutes()).slice(-2);
  var nextYear = nextDate.getFullYear().toString().slice(-2);
  var nextMonth = ('0' + (nextDate.getMonth() + 1)).slice(-2);
  var nextDay = ('0' + nextDate.getDate()).slice(-2);
  var nextHour = ('0' + nextDate.getHours()).slice(-2);
  var nextMinute = ('0' + nextDate.getMinutes()).slice(-2);

  // console.log('nextDate', nextDate);
  // if (!lastDate) return true; // 마지막 메시지라면 시간 표시
  // if (type !== item.type) return true; // 마지막 메시지라면 시간 표시
  const isDifferentUser = user_id !== next_user_id;
  const isDifferentMinute =
    `${year}.${month}.${day} ${hour}:${minute}` !==
    `${nextYear}.${nextMonth}.${nextDay} ${nextHour}:${nextMinute}`;

  if (!isDifferentUser && !isDifferentMinute) {
    return false;
  } else {
    return true;
  }
};
// 닉네임을 보여줄지 결정하는 함수
const shouldShowUserName = (date, lastDate, user_id, next_user_id) => {
  var year = date.getFullYear().toString().slice(-2);
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  var hour = ('0' + date.getHours()).slice(-2);
  var minute = ('0' + date.getMinutes()).slice(-2);
  var lastYear = lastDate.getFullYear().toString().slice(-2);
  var lastMonth = ('0' + (lastDate.getMonth() + 1)).slice(-2);
  var lastDay = ('0' + lastDate.getDate()).slice(-2);
  var lastHour = ('0' + lastDate.getHours()).slice(-2);
  var lastMinute = ('0' + lastDate.getMinutes()).slice(-2);

  if (!lastDate) return true; // 첫 번째 메시지이면 닉네임 표시
  const isDifferentUser = user_id !== next_user_id;
  const isDifferentMinute =
    `${year}.${month}.${day} ${hour}:${minute}` !==
    `${lastYear}.${lastMonth}.${lastDay} ${lastHour}:${lastMinute}`;
  // return isDifferentUser || isDifferentMinute;
  if (isDifferentUser) {
    return true;
  } else if (isDifferentMinute) {
    return true;
  } else {
    return false;
  }
};
export const CreateUserYouMessage = (
  item: any,
  before: number,
  next: number,
  nextUser: string,
  lastUser: string,
) => {
  let change_date = false;
  let change_time = false;
  if (before != 0) {
    let cdate = moment(Number(item.created_at)).format('YYYY-MM-DD');
    let eTime = moment(Number(item.created_at)).format('YYYY-MM-DD HH:mm');
    let bdate = moment(before).format('YYYY-MM-DD');
    let bTime = moment(before).format('YYYY-MM-DD HH:mm');
    if (cdate != bdate) {
      change_date = true;
    }
    if (eTime != bTime) {
      change_time = true;
    } else {
      change_time = false;
    }
  }
  var date = new Date(item.created_at);
  var hour = ('0' + date.getHours()).slice(-2);
  var minute = ('0' + date.getMinutes()).slice(-2);
  var tag = `<div class="sendbird-msg-hoc sendbird-msg--scroll-ref" data-testid="sendbird-message-view"
    data-sb-message-id="${item.message_id}" data-sb-created-at="${item.created_at}" style="margin-bottom: 2px;">`;

  // separator
  if (change_date) {
    tag += `<div class=" sendbird-separator">`;
    tag += `<div class="sendbird-separator__left sendbird-color--onbackground-4--background-color"></div>`;
    tag += `<div class="sendbird-separator__text"><span
        class="sendbird-label sendbird-label--caption-2 sendbird-label--color-onbackground-2">${moment(
          Number(item.created_at),
        ).format('YYYY-MM-DD')}`;
    tag += `</span></div>`;
    tag += `<div class="sendbird-separator__right sendbird-color--onbackground-4--background-color"></div>`;
    tag += `</div>`;
  }

  // me
  tag += `<div class="sendbird-message-hoc__message-content sendbird-message-content incoming ">`;
  //profile
  tag += `<div class="sendbird-message-content__left use-reactions incoming" data-testid="sendbird-message-content__left">`;

  if (
    shouldShowTime(
      new Date(item.created_at),
      new Date(next),
      new Date(before),
      item.user.user_id,
      nextUser,
    )
  ) {
    tag += `<div class="sendbird-context-menu" style="display: inline;">`;
    tag += `<div class="sendbird-message-content__left__avatar sendbird-avatar" role="button" tabindex="0"
    style="height: 28px; width: 28px; z-index: 0; bottom: 2px;">`;
    tag += `<div class="sendbird-avatar-img sendbird-image-renderer"
    style="width: 100%; min-width: calc(28px); max-width: 400px; height: calc(28px);">`;
    tag += `<div class="sendbird-image-renderer__image"
  style="width: 100%; min-width: calc(28px); max-width: 400px; height: calc(28px); position: absolute; background-repeat: no-repeat; background-position: center center; background-size: cover; background-image: url(&quot;${item.user.profile_url}&quot;);">
</div>

<img class="sendbird-image-renderer__hidden-image-loader"
  src="${item.user.profile_url}"
  alt="">`;
    tag += `</div></div></div>`;
  }
  tag += `</div>`;
  //profile -- end

  // msg
  tag += `<div class="sendbird-message-content__middle" data-testid="sendbird-message-content__middle">`;
  if (
    shouldShowUserName(
      new Date(item.created_at),
      new Date(before),
      item.user.user_id,
      lastUser,
    )
  ) {
    tag += `<span
    class="sendbird-message-content__middle__sender-name sendbird-label sendbird-label--caption-2 sendbird-label--color-onbackground-2">${item.user.nickname}</span>`;
  }

  tag += `<div class="sendbird-message-content__middle__body-container">`;

  // 말풍선
  tag += `<span
  class="sendbird-label sendbird-label--body-1 sendbird-label--color-onbackground-1">`;
  tag += ` <div
    class="sendbird-message-content__middle__message-item-body sendbird-text-message-item-body incoming ${
      item.reactions.length > 0 ? 'reactions' : ''
    }">${item.message}</div>`;
  tag += `</span>`;

  // 이모지
  tag += `<div class="sendbird-theme--light sendbird-message-content-reactions">
    `;
  if (item.reactions.length > 0) {
    tag += `<div class="sendbird-emoji-reactions incoming">`;
    if (item.reactions.length > 0) {
      item.reactions.map((item) => {
        tag += `
      <div class="sendbird-emoji-reactions__reaction-badge sendbird-tooltip-wrapper">
        <div class="sendbird-tooltip-wrapper__children">
          <div>
            <div class=" sendbird-reaction-badge" role="button" tabindex="0">
              <div class="sendbird-reaction-badge__inner">
                <div class="sendbird-reaction-badge__inner__icon">
                  <div class=" sendbird-image-renderer" style="width: 100%; min-width: calc(20px); max-width: 400px; height: calc(20px);">
                    <div class="sendbird-image-renderer__image" style="width: 100%; min-width: calc(20px); max-width: 400px; height: calc(20px); position: absolute; border-radius: 50%; background-repeat: no-repeat; background-position: center center; background-size: cover; background-image: url(&quot;${EmojiImage(
                      item.key,
                    )}&quot;);">
                    </div>
                    <img class="sendbird-image-renderer__hidden-image-loader" src=${
                      item.key
                    } alt="">
                  </div>
                </div>
                <span class="sendbird-reaction-badge__inner__count sendbird-label sendbird-label--caption-3 sendbird-label--color-onbackground-1">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>`;
      });
    }
    tag += `</div>`;
  }

  if (
    shouldShowTime(
      new Date(item.created_at),
      new Date(next),
      new Date(before),
      item.user.user_id,
      nextUser,
    )
  ) {
    tag += `<span
    class="sendbird-message-content__middle__body-container__created-at right sendbird-label sendbird-label--caption-3 sendbird-label--color-onbackground-2">${hour}:${minute}</span>`;
  }

  tag += `</div></div>`;

  tag += `</div>`;

  return tag;
};

export const CreateUserMessage = (
  item: any,
  before: number,
  next: number,
  nextUser: string,
  lastUser: string,
) => {
  let change_data = false;
  let change_time = false;
  if (before != 0) {
    let cdate = moment(Number(item.created_at)).format('YYYY-MM-DD');
    let eTime = moment(Number(item.created_at)).format('YYYY-MM-DD HH:mm');
    let bdate = moment(before).format('YYYY-MM-DD');
    let bTime = moment(before).format('YYYY-MM-DD HH:mm');

    if (cdate != bdate) {
      change_data = true;
    }
    if (eTime != bTime) {
      change_time = true;
    }
  }
  var date = new Date(item.created_at);
  var lastdate = new Date(before);
  var hour = ('0' + date.getHours()).slice(-2);
  var lasthour = ('0' + lastdate.getHours()).slice(-2);
  var minute = ('0' + date.getMinutes()).slice(-2);
  var lastminute = ('0' + lastdate.getMinutes()).slice(-2);
  var tag = `<div class="sendbird-msg-hoc sendbird-msg--scroll-ref" data-testid="sendbird-message-view"
    data-sb-message-id="${item.message_id}" data-sb-created-at="${item.created_at}" style="margin-bottom: 2px;">`;

  // separator
  if (change_data) {
    tag += `<div class=" sendbird-separator">`;
    tag += `<div class="sendbird-separator__left sendbird-color--onbackground-4--background-color"></div>`;
    tag += `<div class="sendbird-separator__text"><span
        class="sendbird-label sendbird-label--caption-2 sendbird-label--color-onbackground-2">${moment(
          Number(item.created_at),
        ).format('YYYY-MM-DD')}`;
    tag += `</span></div>`;
    tag += `<div class="sendbird-separator__right sendbird-color--onbackground-4--background-color"></div>`;
    tag += `</div>`;
  }

  // me
  tag += `<div class="sendbird-message-hoc__message-content sendbird-message-content ${
    getSendBirdToken().user_id == item.user.userId ? 'ingoing' : 'outgoing'
  } ">`;
  tag += `<div class="sendbird-message-content__left use-reactions ${
    getSendBirdToken().user_id == item.user.userId ? 'ingoing' : 'outgoing'
  }" data-testid="sendbird-message-content__left">
    </div>`;

  // msg
  tag += `<div class="sendbird-message-content__middle" data-testid="sendbird-message-content__middle">`;
  tag += `<div class="sendbird-message-content__middle__body-container">`;

  // view status
  tag += `<div class="sendbird-message-content__middle__body-container__created-at left">`;
  tag += `<div class="sendbird-message-content__middle__body-container__created-at__component-container">`;
  tag += `<div class=" sendbird-message-status">`;

  if (
    shouldShowTime(
      new Date(item.created_at),
      new Date(next),
      new Date(before),
      item.user.user_id,
      nextUser,
    )
  ) {
    tag += `<div class="sendbird-message-status__icon sendbird-message-status--sent sendbird-icon sendbird-icon-done-all sendbird-icon-color--read"
    data-testid="sendbird-message-status-icon" role="button" tabindex="0"
    style="width: 16px; min-width: 16px; height: 16px; min-height: 16px;"><svg
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <path fill="#000" fill-rule="evenodd"
            d="M5.886 31.448 19.219 44.78a2.667 2.667 0 0 1-3.771 3.771L2.114 35.22a2.667 2.667 0 0 1 3.772-3.771zm52.228-16a2.666 2.666 0 1 1 3.772 3.771L32.552 48.552a2.665 2.665 0 0 1-3.771 0L15.448 35.22a2.665 2.665 0 0 1 0-3.771 2.665 2.665 0 0 1 3.771 0l11.448 11.447zm-9.562 0a2.665 2.665 0 0 1 0 3.771L32.556 35.215a2.665 2.665 0 0 1-3.771 0 2.664 2.664 0 0 1 0-3.77L44.78 15.447a2.665 2.665 0 0 1 3.771 0z"
            class="icon-done-all_svg__fill"></path>
    </svg></div>`;
    tag += `<span
      class="sendbird-message-status__text sendbird-label sendbird-label--caption-3 sendbird-label--color-onbackground-2"
      data-testid="sendbird-message-status-text">${hour}:${minute}</span>`;
  }

  tag += `</div></div></div>`;

  // 말풍선
  tag += `<span class="sendbird-label sendbird-label--body-1 sendbird-label--color-oncontent-1">`;
  tag += ` <div
    class="sendbird-message-content__middle__message-item-body sendbird-text-message-item-body outgoing ${
      item.reactions.length > 0 ? 'reactions' : ''
    }">${item.message}</div>`;
  tag += `</span>`;

  // 이모지
  tag += `<div class="sendbird-message-content-reactions primary">
    `;
  if (item.reactions.length > 0) {
    tag += `<div class="sendbird-emoji-reactions outgoing">`;
    if (item.reactions.length > 0) {
      item.reactions.map((item) => {
        tag += `
      <div class="sendbird-emoji-reactions__reaction-badge sendbird-tooltip-wrapper">
        <div class="sendbird-tooltip-wrapper__children">
          <div>
            <div class=" sendbird-reaction-badge" role="button" tabindex="0">
              <div class="sendbird-reaction-badge__inner">
                <div class="sendbird-reaction-badge__inner__icon">
                  <div class=" sendbird-image-renderer" style="width: 100%; min-width: calc(20px); max-width: 400px; height: calc(20px);">
                    <div class="sendbird-image-renderer__image" style="width: 100%; min-width: calc(20px); max-width: 400px; height: calc(20px); position: absolute; border-radius: 50%; background-repeat: no-repeat; background-position: center center; background-size:                                                                                                                     cover; background-image: url(&quot;${EmojiImage(
                      item.key,
                    )}&quot;);">
                    </div>
                    <img class="sendbird-image-renderer__hidden-image-loader" src=${
                      item.key
                    } alt="">
                  </div>
                </div>
                <span class="sendbird-reaction-badge__inner__count sendbird-label sendbird-label--caption-3 sendbird-label--color-onbackground-1">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>`;
      });
    }
    tag += `</div>`;
  }
  tag += `</div></div>`;

  tag += `</div>`;

  return tag;
};

export const CreateFileMessage = async (
  item: any,
  before: number,
  url: string,
) => {
  var image;
  var date = new Date(item.created_at);
  var hour = ('0' + date.getHours()).slice(-2);
  var minute = ('0' + date.getMinutes()).slice(-2);
  let isMe = false;
  let isReaction = false;
  if (item.user) {
    if (item.user.user_id == getSendBirdToken().user_id) {
      isMe = true;
    }
  }
  if (item.reactions?.length > 0) {
    isReaction = true;
  }
  var tag: string = '';
  if (item.file && item.file?.data != '') {
    const data = JSON.parse(item.file.data);
    // console.log('data', data);
    const thumbnail = await sendBirdApi.getSendBirdImage({
      ChannelUrl: url,
      imageId: data.thumbnailId,
    });

    const image = await sendBirdApi.getSendBirdImage({
      ChannelUrl: url,
      imageId: data.imageId,
    });

    let change_time = false;
    if (before != 0) {
      let ctime = moment(Number(item.created_at)).format('YYYY-MM-DD');
      let btime = moment(before).format('YYYY-MM-DD');
      if (ctime != btime) {
        change_time = true;
      }
    }

    tag = `<div class="sendbird-msg-hoc sendbird-msg--scroll-ref" data-testid="sendbird-message-view"
        data-sb-message-id="${item.message_id}" data-sb-created-at="${item.created_at}" style="margin-bottom: 2px;">`;

    // separator
    if (change_time) {
      tag += `<div class=" sendbird-separator">`;
      tag += `<div class="sendbird-separator__left sendbird-color--onbackground-4--background-color"></div>`;
      tag += `<div class="sendbird-separator__text"><span
            class="sendbird-label sendbird-label--caption-2 sendbird-label--color-onbackground-2">${moment(
              Number(item.created_at),
            ).format('YYYY-MM-DD')}`;
      tag += `</span></div>`;
      tag += `<div class="sendbird-separator__right sendbird-color--onbackground-4--background-color"></div>`;
      tag += `</div>`;
    }

    // me
    tag += `<div class="sendbird-message-hoc__message-content sendbird-message-content ${
      getSendBirdToken().user_id == item.user.userId ? 'ingoing' : 'outgoing'
    } ">`;
    tag += `<div class="sendbird-message-content__left use-reactions ${
      getSendBirdToken().user_id == item.user.userId ? 'ingoing' : 'outgoing'
    }" data-testid="sendbird-message-content__left">
        </div>`;

    // msg
    tag += `<div class="sendbird-message-content__middle" data-testid="sendbird-message-content__middle">`;
    tag += `<div class="sendbird-message-content__middle__body-container">`;

    // view status
    tag += `<div class="sendbird-message-content__middle__body-container__created-at left">`;
    tag += `<div class="sendbird-message-content__middle__body-container__created-at__component-container">`;
    tag += `<div class=" sendbird-message-status">`;
    tag += `<div class="sendbird-message-status__icon sendbird-message-status--sent sendbird-icon sendbird-icon-done-all sendbird-icon-color--read"
        data-testid="sendbird-message-status-icon" role="button" tabindex="0"
        style="width: 16px; min-width: 16px; height: 16px; min-height: 16px;"><svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <path fill="#000" fill-rule="evenodd"
                d="M5.886 31.448 19.219 44.78a2.667 2.667 0 0 1-3.771 3.771L2.114 35.22a2.667 2.667 0 0 1 3.772-3.771zm52.228-16a2.666 2.666 0 1 1 3.772 3.771L32.552 48.552a2.665 2.665 0 0 1-3.771 0L15.448 35.22a2.665 2.665 0 0 1 0-3.771 2.665 2.665 0 0 1 3.771 0l11.448 11.447zm-9.562 0a2.665 2.665 0 0 1 0 3.771L32.556 35.215a2.665 2.665 0 0 1-3.771 0 2.664 2.664 0 0 1 0-3.77L44.78 15.447a2.665 2.665 0 0 1 3.771 0z"
                class="icon-done-all_svg__fill"></path>
        </svg></div>`;
    tag += `<span
        class="sendbird-message-status__text sendbird-label sendbird-label--caption-3 sendbird-label--color-onbackground-2"
        data-testid="sendbird-message-status-text">${hour}:${minute}</span>`;
    tag += `</div></div></div>`;

    // 이미지
    tag += `<div
        class="sendbird-message-content__middle__message-item-body sendbird-thumbnail-message-item-body outgoing  reactions">`;
    tag += `<div class="sendbird-thumbnail-message-item-body__thumbnail sendbird-image-renderer"
        style="width: 100%; min-width: min(400px, 100%); max-width: 400px; height: calc(270px);">`;
    tag += `<div class="sendbird-image-renderer__image"
        style="width: 100%; min-width: min(400px, 100%); max-width: 400px; height: calc(270px); position: absolute; background-repeat: no-repeat; background-position: center center; background-size: cover; background-image: url(&quot;${thumbnail.data.presignedUrl}&quot;);" onClick={this.handleClick}>
    </div><img class="sendbird-image-renderer__hidden-image-loader"
        src="${image.data.presignedUrl}"
        alt="image/png">`;
    tag += `</div>`;
    tag += ` <div class="sendbird-thumbnail-message-item-body__image-cover custom_sendbird" data-image="${image.data.presignedUrl}"></div>`;
    tag += `</div>`;

    // 이모지
    tag += `<div class="sendbird-message-content-reactions">
  `;
    if (item.reactions.length > 0) {
      tag += `<div class="sendbird-emoji-reactions outgoing">`;
      if (item.reactions.length > 0) {
        item.reactions.map((item) => {
          tag += `
      <div class="sendbird-emoji-reactions__reaction-badge sendbird-tooltip-wrapper">
        <div class="sendbird-tooltip-wrapper__children">
          <div>
            <div class=" sendbird-reaction-badge" role="button" tabindex="0">
              <div class="sendbird-reaction-badge__inner">
                <div class="sendbird-reaction-badge__inner__icon">
                  <div class=" sendbird-image-renderer" style="width: 100%; min-width: calc(20px); max-width: 400px; height: calc(20px);">
                    <div class="sendbird-image-renderer__image" style="width: 100%; min-width: calc(20px); max-width: 400px; height: calc(20px); position: absolute; border-radius: 50%; background-repeat: no-repeat; background-position: center center; background-size:                                                                                                                     cover; background-image: url(&quot;${EmojiImage(
                      item.key,
                    )}&quot;);">
                    </div>
                    <img class="sendbird-image-renderer__hidden-image-loader" src=${
                      item.key
                    } alt="">
                  </div>
                </div>
                <span class="sendbird-reaction-badge__inner__count sendbird-label sendbird-label--caption-3 sendbird-label--color-onbackground-1">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>`;
        });
      }
      tag += `</div>`;
    }
    tag += `</div>`;

    tag += `</div></div></div>`;

    tag += `</div>`;

    // console.log('dhooooooo', tag);
    return tag;
  }
};

export const CreateFileYouMessage = async (
  item: any,
  before: number,
  next: number,
  nextUser: string,
  lastUser: string,
  url: string,
) => {
  var image;
  var date = new Date(item.created_at);
  var hour = ('0' + date.getHours()).slice(-2);
  var minute = ('0' + date.getMinutes()).slice(-2);
  let isMe = false;
  let isReaction = false;
  if (item.user) {
    if (item.user.user_id == getSendBirdToken().user_id) {
      isMe = true;
    }
  }
  if (item.reactions?.length > 0) {
    isReaction = true;
  }
  var tag: string = '';
  if (item.file && item.file?.data != '') {
    const data = JSON.parse(item.file.data);
    // console.log('data', data);
    const thumbnail = await sendBirdApi.getSendBirdImage({
      ChannelUrl: url,
      imageId: data.thumbnailId,
    });

    const image = await sendBirdApi.getSendBirdImage({
      ChannelUrl: url,
      imageId: data.imageId,
    });

    let change_time = false;
    if (before != 0) {
      let ctime = moment(Number(item.created_at)).format('YYYY-MM-DD');
      let btime = moment(before).format('YYYY-MM-DD');
      if (ctime != btime) {
        change_time = true;
      }
    }

    tag = `<div class="sendbird-msg-hoc sendbird-msg--scroll-ref" data-testid="sendbird-message-view"
        data-sb-message-id="${item.message_id}" data-sb-created-at="${item.created_at}" style="margin-bottom: 2px;">`;

    // separator
    if (change_time) {
      tag += `<div class=" sendbird-separator">`;
      tag += `<div class="sendbird-separator__left sendbird-color--onbackground-4--background-color"></div>`;
      tag += `<div class="sendbird-separator__text"><span
            class="sendbird-label sendbird-label--caption-2 sendbird-label--color-onbackground-2">${moment(
              Number(item.created_at),
            ).format('YYYY-MM-DD')}`;
      tag += `</span></div>`;
      tag += `<div class="sendbird-separator__right sendbird-color--onbackground-4--background-color"></div>`;
      tag += `</div>`;
    }

    // me
    tag += `<div class="sendbird-message-hoc__message-content sendbird-message-content incoming ">`;

    //profile
    tag += `<div class="sendbird-message-content__left ${
      item.reactions.length > 0 ? 'use-reactions' : ''
    } incoming" data-testid="sendbird-message-content__left">`;
    if (
      shouldShowTime(
        new Date(item.created_at),
        new Date(next),
        new Date(before),
        item.user.user_id,
        nextUser,
      )
    ) {
      tag += `<div class="sendbird-context-menu" style="display: inline;">`;
      tag += `<div class="sendbird-message-content__left__avatar sendbird-avatar" role="button" tabindex="0"
    style="height: 28px; width: 28px; z-index: 0; bottom: 2px;">`;
      tag += `<div class="sendbird-avatar-img sendbird-image-renderer"
    style="width: 100%; min-width: calc(28px); max-width: 400px; height: calc(28px);">`;
      tag += `<div class="sendbird-image-renderer__image"
    style="width: 100%; min-width: calc(28px); max-width: 400px; height: calc(28px); position: absolute; background-repeat: no-repeat; background-position: center center; background-size: cover; background-image: url(&quot;${item.user.profile_url}&quot;);">
    </div>
    <img class="sendbird-image-renderer__hidden-image-loader"
    src="${item.user.profile_url}"
    alt="">`;
      tag += `</div></div></div>`;
    }
    tag += `</div>`;
    //profile -- end

    // msg
    tag += `<div class="sendbird-message-content__middle" data-testid="sendbird-message-content__middle">`;
    tag += `<div class="sendbird-message-content__middle__body-container">`;

    // view status
    tag += `<div class="sendbird-message-content__middle__body-container__created-at left">`;
    tag += `<div class="sendbird-message-content__middle__body-container__created-at__component-container">`;
    tag += `<div class=" sendbird-message-status">`;
    // tag += `<div class="sendbird-message-status__icon sendbird-message-status--sent sendbird-icon sendbird-icon-done-all sendbird-icon-color--read"
    //     data-testid="sendbird-message-status-icon" role="button" tabindex="0"
    //     style="width: 16px; min-width: 16px; height: 16px; min-height: 16px;"><svg
    //         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    //         <path fill="#000" fill-rule="evenodd"
    //             d="M5.886 31.448 19.219 44.78a2.667 2.667 0 0 1-3.771 3.771L2.114 35.22a2.667 2.667 0 0 1 3.772-3.771zm52.228-16a2.666 2.666 0 1 1 3.772 3.771L32.552 48.552a2.665 2.665 0 0 1-3.771 0L15.448 35.22a2.665 2.665 0 0 1 0-3.771 2.665 2.665 0 0 1 3.771 0l11.448 11.447zm-9.562 0a2.665 2.665 0 0 1 0 3.771L32.556 35.215a2.665 2.665 0 0 1-3.771 0 2.664 2.664 0 0 1 0-3.77L44.78 15.447a2.665 2.665 0 0 1 3.771 0z"
    //             class="icon-done-all_svg__fill"></path>
    //     </svg></div>`;

    if (
      shouldShowTime(
        new Date(item.created_at),
        new Date(next),
        new Date(before),
        item.user.user_id,
        nextUser,
      )
    ) {
      tag += `<span
        class="sendbird-message-status__text sendbird-label sendbird-label--caption-3 sendbird-label--color-onbackground-2"
        data-testid="sendbird-message-status-text">${hour}:${minute}</span>`;
    }
    tag += `</div></div></div>`;

    // 이미지
    tag += `<div
        class="sendbird-message-content__middle__message-item-body sendbird-thumbnail-message-item-body incoming  ${
          item.reactions.length > 0 ? 'reactions' : ''
        }">`;
    tag += `<div class="sendbird-thumbnail-message-item-body__thumbnail sendbird-image-renderer"
        style="width: 100%; min-width: min(400px, 100%); max-width: 400px; height: calc(270px);">`;
    tag += `<div class="sendbird-image-renderer__image"
        style="width: 100%; min-width: min(400px, 100%); max-width: 400px; height: calc(270px); position: absolute; background-repeat: no-repeat; background-position: center center; background-size: cover; background-image: url(&quot;${thumbnail.data.presignedUrl}&quot;);" onClick={this.handleClick}>
    </div><img class="sendbird-image-renderer__hidden-image-loader"
        src="${image.data.presignedUrl}"
        alt="image/png">`;
    tag += `</div>`;
    tag += ` <div class="sendbird-thumbnail-message-item-body__image-cover custom_sendbird" data-image="${image.data.presignedUrl}"></div>`;
    tag += `</div>`;

    // 이모지
    if (item.reactions.length > 0) {
      tag += `<div class="sendbird-message-content-reactions">
  `;
      tag += `<div class="sendbird-emoji-reactions incoming">`;
      if (item.reactions.length > 0) {
        item.reactions.map((item) => {
          tag += `
      <div class="sendbird-emoji-reactions__reaction-badge sendbird-tooltip-wrapper">
        <div class="sendbird-tooltip-wrapper__children">
          <div>
            <div class=" sendbird-reaction-badge" role="button" tabindex="0">
              <div class="sendbird-reaction-badge__inner">
                <div class="sendbird-reaction-badge__inner__icon">
                  <div class=" sendbird-image-renderer" style="width: 100%; min-width: calc(20px); max-width: 400px; height: calc(20px);">
                    <div class="sendbird-image-renderer__image" style="width: 100%; min-width: calc(20px); max-width: 400px; height: calc(20px); position: absolute; border-radius: 50%; background-repeat: no-repeat; background-position: center center; background-size:                                                             cover; background-image: url(&quot;${EmojiImage(
                      item.key,
                    )}&quot;);">
                    </div>
                    <img class="sendbird-image-renderer__hidden-image-loader" src=${
                      item.key
                    } alt="">
                  </div>
                </div>
                <span class="sendbird-reaction-badge__inner__count sendbird-label sendbird-label--caption-3 sendbird-label--color-onbackground-1">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>`;
        });
      }
      tag += `</div>`;
      tag += `</div>`;
    }

    tag += `</div></div></div>`;

    tag += `</div>`;

    // console.log('dhooooooo', tag);
    return tag;
  }
};

export const CreateAdminMessage = async (item: any) => {
  var tag = `<div class="sendbird-msg-hoc sendbird-msg--scroll-ref" data-testid="sendbird-message-view"
  data-sb-message-id="${item.message_id}" data-sb-created-at="${item.created_at}" style="margin-bottom: 2px;">`;
  tag += `<div class=" sendbird-admin-message"><span
  class="sendbird-admin-message__text sendbird-label sendbird-label--caption-2 sendbird-label--color-onbackground-2">${item.message}</span>
</div>`;
  tag += `</div>`;

  return tag;
};
