import moment from 'moment';
import React from 'react';
import Icon, { IconTypes, IconColors } from '@sendbird/uikit-react/ui/Icon';
import Image from 'next/image';
import EmojiReactions from '@sendbird/uikit-react/ui/EmojiReactions';
import { Message } from '@sendbird/uikit-react/GroupChannel/components/Message';
import { Box, useToast } from '@chakra-ui/react';
import lodash from 'lodash';
import { useGetImage } from '@/apis/sendbird/SendBirdApi.mutation';

const CustomMessage = (props) => {
  const { message } = props;
  const [load, setLoad] = React.useState(false);
  const [image, setImage] = React.useState({
    plainUrl: '',
    fileUrl: '',
  });
  const [msg, setMsg] = React.useState<any>();
  const toast = useToast();

  const { mutate: GetImage } = useGetImage({
    options: {
      onSuccess: (res) => {
        // console.log('res', res);
        if (res.success == true) {
          setLoad(true);
          let d = lodash.cloneDeep(message);
          // d.url= res.data.presignedUrl;
          d.fileUrl = res.data.presignedUrl;
          d.plainUrl = res.data.presignedUrl;
          d.type = 'image/png';
          d.name = 'onboarding_1.png';
          setMsg(d);
          setImage({
            plainUrl: res.data.presignedUrl,
            fileUrl: res.data.presignedUrl,
          });
        } else {
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {'이미지 조회에 실패했습니다.'}
              </Box>
            ),
          });
        }
      },
      onError: (req) => {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'이미지 조회에 실패했습니다.'}
            </Box>
          ),
        });
      },
    },
  });

  React.useEffect(() => {
    if (load === false) {
      if (message?.data != '') {
        let data: any;
        data = JSON.parse(message.data);
        GetImage({
          ChannelUrl: data.channelUrl,
          imageId: data.imageId,
        });
      }
    }
  }, [load]);
  React.useEffect(() => {
    if (message?.data != '') {
      let data: any;
      data = JSON.parse(message.data);
      let d = lodash.cloneDeep(message);
      // d.url= res.data.presignedUrl;
      d.fileUrl = image.fileUrl;
      d.plainUrl = image.plainUrl;
      d.type = 'image/png';
      d.name = 'onboarding_1.png';
      setMsg(d);
    }
  }, [message]);

  return (
    <>
      {msg && (
        <Message
          {...props}
          message={msg}
          toggleReaction={(d) => {
            console.log(d);
          }}
        />
      )}
    </>
  );
};

export default CustomMessage;
