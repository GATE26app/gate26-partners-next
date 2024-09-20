// contexts/SendBirdContext.tsx
// import {
//   checkChannelExists,
//   clearUserSession,
//   connectToSendBird,
//   loadUserSession,
//   saveUserSession,
// } from '@apis/sendbird/chatUtils';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import SendBird from 'sendbird';

interface SendBirdContextType {
  sendbird: SendBird.SendBirdInstance | null;
  connect: (userId: string, accessToken?: string) => Promise<void>;
  disconnect: () => void;
  isChannelExists: (channelId: string) => Promise<boolean>;
  isConnected: boolean; // 추가된 상태
}

const SendBirdContext = createContext<SendBirdContextType>({
  sendbird: null,
  connect: async () => {},
  disconnect: () => {},
  isChannelExists: async () => false,
  isConnected: false, // 초기값 설정
});

export const SendBirdProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sendbird, setSendbird] = useState<SendBird.SendBirdInstance | null>(
    null,
  );
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connect = async (userId: string, accessToken?: string) => {
    if (sendbird) {
      try {
        await new Promise((resolve, reject) => {
          sendbird.connect(userId, accessToken, (user, error) => {
            if (error) {
              console.error('SendBird connect error:', error);
              reject(error);
            } else {
              console.log('Connected to SendBird');
              setIsConnected(true);
              saveUserSession(userId, accessToken);
              resolve(user);
            }
          });
        });
      } catch (error) {
        console.error('Failed to connect:', error);
        setIsConnected(false);
      }
    }
  };

  // SendBird 클라이언트 연결 해제 함수
  const disconnect = () => {
    if (sendbird) {
      sendbird.disconnect(() => {
        console.log('Disconnected from SendBird');
        setIsConnected(false);
        clearUserSession();
      });
    }
  };

  // 채널 존재 여부 확인 함수
  const isChannelExists = async (channelId: string): Promise<boolean> => {
    if (sendbird && isConnected) {
      return new Promise((resolve, reject) => {
        sendbird.GroupChannel.getChannel(channelId, (channel, error) => {
          if (error) {
            console.error('SendBird getChannel error:', error);
            if (error.code === 1402) {
              resolve(false); // 채널이 존재하지 않음
            } else {
              reject(new Error('채널 정보를 가져오는 중 오류가 발생했습니다.'));
            }
          } else {
            resolve(channel !== null);
          }
        });
      });
    }
    return false;
  };

  useEffect(() => {
    const sb = new SendBird({ appId: '78B8D84A-E617-493C-98CA-2D15F647923B' });
    setSendbird(sb);

    const { userId, accessToken } = loadUserSession();
    if (userId) {
      connect(userId, accessToken).catch((error) => {
        console.error('Failed to reconnect:', error);
      });
    }

    return () => {
      if (sb) {
        sb.disconnect(() => {
          console.log('Disconnected from SendBird');
        });
      }
    };
  }, []);

  return (
    <SendBirdContext.Provider
      value={{ sendbird, connect, disconnect, isChannelExists, isConnected }}
    >
      {children}
    </SendBirdContext.Provider>
  );
};

export const useSendBird = () => useContext(SendBirdContext);
