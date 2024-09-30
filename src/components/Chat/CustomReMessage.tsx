import moment from 'moment';
import React from 'react';
import Icon, { IconTypes, IconColors } from '@sendbird/uikit-react/ui/Icon';
import Image from 'next/image';
import EmojiReactions from '@sendbird/uikit-react/ui/EmojiReactions';
import { Message } from '@sendbird/uikit-react/GroupChannel/components/Message';
import { Box, useToast } from '@chakra-ui/react';
import lodash from 'lodash';
import { useGetImage } from '@/apis/sendbird/SendBirdApi.mutation';

type imageType = {
  plainUrl: string;
  fileUrl: string;
};
const CustomReMessage = (props) => {
  const { message } = props;
  const [load, setLoad] = React.useState(false);
  const [image, setImage] = React.useState<imageType>({
    plainUrl: '',
    fileUrl: '',
  });
  const [msg, setMsg] = React.useState<any>();
  const toast = useToast();
  // console.log('Custom Re Message PROPS :: ', props);

  const { mutate: GetImage } = useGetImage({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          setLoad(true);
          let d = lodash.cloneDeep(message);
          d.parentMessage.fileUrl = res.data.presignedUrl;
          d.parentMessage.plainUrl = res.data.presignedUrl;
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
      if (
        message.parentMessage?.data != '' &&
        message.parentMessage?.data != undefined
      ) {
        let data: any;
        data = JSON.parse(message.parentMessage?.data);
        // GetImage({
        //   channelURL: data.channelUrl,
        //   image: data.imageId,
        // });
        let d = lodash.cloneDeep(message);
        d.parentMessage.plainUrl = image.plainUrl;
        setMsg(d);
      }
    }
  }, [load]);

  React.useEffect(() => {
    if (
      message.parentMessage?.data != '' &&
      message.parentMessage?.data != undefined
    ) {
      let data: any;
      data = JSON.parse(message.parentMessage.data);
      let d = lodash.cloneDeep(message);
      d.parentMessage.plainUrl = image.plainUrl;

      GetImage({
        ChannelUrl: data.channelUrl,
        imageId: data.imageId,
      });
    } else {
      if (image.plainUrl != '') {
        let d = lodash.cloneDeep(message);
        (d.parentMessage.plainUrl = image?.plainUrl), setMsg(d);
      } else {
        setMsg(message);
      }
    }
  }, [message]);

  return <>{msg && <Message {...props} message={msg} />}</>;
};

export default CustomReMessage;
