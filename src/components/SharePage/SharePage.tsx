import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { Box, useToast } from '@chakra-ui/react';

function SharePage() {
  const router = useRouter();

  const visiteTm = new Date().getTime();

  const toast = useToast();
  const Check = () => {
    const userAgent = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
    // const { device } = userAgent(request);

    if (userAgent.includes('android')) {
      location.replace(
        `intent://GATE26.app.open?link=` +
          router.pathname +
          `#Intent;scheme=GATE26;package=com.asianaidt.gate;end`,
      );
    } else if (userAgent.includes('iphone') || userAgent.match('.*iPad.*')) {
      // setTimeout(function () {
      //   if (new Date().getTime() - visiteTm < 3000) {
      //     location.replace('https://itunes.apple.com/app/gate26/id1578609089');
      //   }
      // }, 1000);
      setTimeout(function () {
        location.replace(`gate26://gate26.app.open?`);
      }, 0);
    } else {
      toast({
        position: 'top',
        duration: 10000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {userAgent}
          </Box>
        ),
      });
      // location.replace('https://gate26.co.kr/');
    }
  };

  useEffect(() => {
    Check();
  }, []);

  return <></>;
}

export default SharePage;
