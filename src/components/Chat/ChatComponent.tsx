import React, { useState } from 'react';

import SendbirdApp from '@sendbird/uikit-react/App';
import '@sendbird/uikit-react/dist/index.css';
import { Box, Flex, Text } from '@chakra-ui/react';
import {
  ColorBackRed,
  ColorBlack,
  ColorGray400,
  ColorGray700,
  ColorInputBorder,
  ColorRed,
  ColorRed50,
  ColorRedOpa,
  ColorWhite,
} from '@/utils/_Palette';
// import { Channel, ChannelList, SendBirdProvider } from 'sendbird-uikit';
import SendbirdProvider, {
  useSendbirdStateContext,
} from '@sendbird/uikit-react/SendbirdProvider';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
import {
  GroupChannelProvider,
  useGroupChannelContext,
} from '@sendbird/uikit-react/GroupChannel/context';
import { GroupChannelHeader } from '@sendbird/uikit-react/GroupChannel/components/GroupChannelHeader';
import { GroupChannelUI } from '@sendbird/uikit-react/GroupChannel/components/GroupChannelUI';
import { FileViewer } from '@sendbird/uikit-react/GroupChannel/components/FileViewer';
import { FrozenNotification } from '@sendbird/uikit-react/GroupChannel/components/FrozenNotification';
import { Message } from '@sendbird/uikit-react/GroupChannel/components/Message';
import {
  MessageInputWrapper,
  VoiceMessageInputWrapper,
} from '@sendbird/uikit-react/GroupChannel/components/MessageInputWrapper';
import { MessageList } from '@sendbird/uikit-react/GroupChannel/components/MessageList';
import { RemoveMessageModal } from '@sendbird/uikit-react/GroupChannel/components/RemoveMessageModal';
import { TypingIndicator } from '@sendbird/uikit-react/GroupChannel/components/TypingIndicator';
import { UnreadCount } from '@sendbird/uikit-react/GroupChannel/components/UnreadCount';
import { SuggestedMentionList } from '@sendbird/uikit-react/GroupChannel/components/SuggestedMentionList';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
import {
  GroupChannelListProvider,
  useGroupChannelListContext,
} from '@sendbird/uikit-react/GroupChannelList/context';
import { AddGroupChannel } from '@sendbird/uikit-react/GroupChannelList/components/AddGroupChannel';
import { GroupChannelListUI } from '@sendbird/uikit-react/GroupChannelList/components/GroupChannelListUI';
import { GroupChannelListHeader } from '@sendbird/uikit-react/GroupChannelList/components/GroupChannelListHeader';
import { GroupChannelListItem } from '@sendbird/uikit-react/GroupChannelList/components/GroupChannelListItem';
import { GroupChannelPreviewAction } from '@sendbird/uikit-react/GroupChannelList/components/GroupChannelPreviewAction';
import OpenChannel from '@sendbird/uikit-react/OpenChannel';
import kr from 'date-fns/locale/ko';
import CustomGroupChannelListHeader from './CustomGroupChannelListHeader';
import { usePartnerZuInfo } from '@/_store/PartnerInfo';
import { getImagePath, imgPath } from '@/utils/format';
import InputBox from '../common/Input';
import {
  getSendBirdToken,
  getToken,
  setToken,
} from '@/utils/localStorage/token';
import { useQuery } from 'react-query';
import sendBirdApi from '@/apis/sendbird/SendBirdApi';
import CustomMessage from './CustomMessage';
import CustomReMessage from './CustomReMessage';
const myColorSet = {
  '--sendbird-light-primary-500': ColorRedOpa,
  '--sendbird-light-primary-400': ColorRed50,
  '--sendbird-light-primary-300': ColorRed,
  '--sendbird-light-primary-200': ColorRed50,
  '--sendbird-light-primary-100': ColorBackRed,
};
const CustomMessageInput = () => {
  const { sendUserMessage } = useGroupChannelContext();

  const handleSendMessage = (event) => {
    if (event.key === 'Enter') {
      const message = event.target.value;
      if (message.trim()) {
        sendUserMessage({ message });
        event.target.value = '';
      }
    }
  };

  return (
    <div style={{ marginTop: '15px', marginLeft: '15px', marginRight: '15px' }}>
      {/* <InputBox onKeyDown={handleSendMessage} /> */}
      <input
        type="text"
        placeholder="채팅을 입력해주세요."
        style={{
          width: '100%',
          padding: '10px',
          borderColor: ColorInputBorder,
          borderWidth: 1,
          borderRadius: '10px',
          outline: 'none',
        }}
        onKeyDown={handleSendMessage}
      />
      {/* 파일 전송 버튼을 제거하거나 비활성화 */}
    </div>
  );
};
const CustomConnectionHandler = () => {
  try {
    const store = useSendbirdStateContext();
    const sdk = store?.stores?.sdkStore?.sdk;
    if (sdk.currentUser) {
      sdk.registerFCMPushTokenForCurrentUser(getToken().fcm);
    }
  } catch (error) {}
  return null;
};
function ChatComponent() {
  const { partnerInfo } = usePartnerZuInfo((state) => state);
  // const sb = SendbirdChat.init({
  //   appId: '',
  //   modules: [new OpenChannelModule()],
  // }) as SendbirdOpenChat;
  const [currentChannelUrl, setCurrentChannelUrl] = useState('');
  const [sendBirdImageState, setSendBirdImageState] = useState(false);
  const [ImageObj, setImageObj] = useState({
    ChannelUrl: '',
    imageId: '',
  });

  const handleSetCurrentChannel = (channel) => {
    if (channel?.url) {
      setCurrentChannelUrl(channel.url);
    }
  };

  return (
    <Box
      w={'80%'}
      h={'700px'}
      // maxH={'450px'}
      bgColor={ColorWhite}
      boxShadow={'3px 6px 20px #0000000D'}
      overflow={'hidden'}
      position={'absolute'}
      top={90}
      borderRadius={'12px'}
      zIndex={99999}
    >
      <SendbirdProvider
        appId={'78B8D84A-E617-493C-98CA-2D15F647923B'}
        userId={getSendBirdToken().user_id}
        accessToken={getSendBirdToken().sendBird}
        theme="light"
        dateLocale={kr}
        colorSet={myColorSet}
      >
        <CustomConnectionHandler />
        <Flex flexDirection={'row'} h={'100%'}>
          <GroupChannelList
            // enableTypingIndicator={false}
            renderHeader={(props) => (
              // <CustomGroupChannelListHeader />
              <GroupChannelListHeader
                renderMiddle={() => (
                  <Flex alignItems={'center'} gap={'10px'}>
                    <Box
                      borderRadius={'50px'}
                      overflow={'hidden'}
                      w={'32px'}
                      h={'32px'}
                    >
                      <img
                        style={{
                          width: '32px',
                          height: '32px',
                          objectFit: 'cover',
                        }}
                        src={
                          partnerInfo.images !== undefined &&
                          partnerInfo.images.length > 0
                            ? getImagePath(
                                partnerInfo.images[0].thumbnailImagePath,
                              )
                            : '/images/header/icon_header_user.png'
                        }
                        alt="이미지 업로드"
                      />
                    </Box>
                    {/* <Text>{props}</Text> */}
                    <Text color={ColorBlack} fontSize={'16px'} fontWeight={500}>
                      {partnerInfo.title}
                    </Text>
                  </Flex>
                )}
              />
            )}
            onChannelSelect={handleSetCurrentChannel}
            onChannelCreated={() => {
              // console.log('2222');
            }}
          />
          <GroupChannel
            channelUrl={currentChannelUrl}
            onBackClick={() => setCurrentChannelUrl('')}
            renderMessage={(props) => {
              // 이미지 컴포넌트
              const message = props.message;
              if (message.isFileMessage()) {
                return <CustomMessage {...props} onReact={() => {}} />;
              }
              if (message.isUserMessage() && message.parentMessageId > 0) {
                return <CustomReMessage {...props} onReact={() => {}} />;
              }
              return <Message {...props} />;
              // if (message.message.message == 'send File message') {
              //   console.log(
              //     'message.message.message ***',
              //     message.message.message,
              //   );
              //   ChangeMessage(message.message);
              // } else {
              //   // 기존 message
              //   return <Message {...message} />;
              // }
            }}
            // renderMessage={MessageComponent}
            renderMessageInput={() => <CustomMessageInput />}
          />
        </Flex>
      </SendbirdProvider>
    </Box>
  );
}

export default ChatComponent;
