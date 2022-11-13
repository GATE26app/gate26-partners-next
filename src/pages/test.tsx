import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from '@chakra-ui/react';

import { customModalSliceAction } from '@features/customModal/customModalSlice';
import useAppStore from '@features/useAppStore';

import Button from '@components/Button';
import IconButton from '@components/IconButton';
import withAdminLayout from '@components/common/@Layout/AdminLayout';
import Pagination from '@components/common/Pagination';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

function Test({ Component, pageProps }: any) {
  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();
  const [currentPage, setCurretPage] = useState<number>(0);
  const handleClick = () => {
    dispatch(
      customModalSliceAction.setMessage({
        message: '아이디, 비밀번호, 이름, 이메일은\n필수 입력 항목입니다.',
        type: 'confirm',
        okButtonName: '로그아웃',
        cbOk: () => {
          console.log('asdasdasdsdasdas');
        },
      }),
    );
    openCustomModal();
  };
  return (
    <div style={{ width: '100%' }}>
      <Flex flexDirection="column" rowGap={'10px'}>
        <Button
          width="120px"
          height="50px"
          size="sm"
          onClick={handleClick}
          text="모달 테스트"
        />
        <Flex columnGap={'10px'} alignItems="center">
          <Button width="69px" height="50px" size="md" text="로그인" />
          <Button width="61px" height="40px" size="sm" text="로그인" />
        </Flex>
        <Flex columnGap={'10px'} alignItems="center">
          <Button
            width="69px"
            height="50px"
            size="md"
            type="square-outline"
            text="로그인"
          />
          <Button
            width="61px"
            height="40px"
            size="sm"
            type="square-outline"
            text="로그인"
          />
        </Flex>
        <Flex columnGap={'10px'} alignItems="center">
          <Button
            width="69px"
            height="50px"
            size="md"
            type="square-grayscale"
            text="로그인"
          />
          <Button
            width="61px"
            height="40px"
            size="sm"
            type="square-grayscale"
            text="로그인"
          />
        </Flex>
        <Flex columnGap={'10px'} alignItems="center">
          <Button
            width="69px"
            height="50px"
            size="md"
            type="round"
            text="로그인"
          />
          <Button
            width="61px"
            height="40px"
            size="sm"
            type="round"
            text="로그인"
          />
        </Flex>
        <Flex columnGap={'10px'} alignItems="center">
          <Button
            width="69px"
            height="50px"
            size="md"
            type="round-outline"
            text="로그인"
          />
          <Button
            width="61px"
            height="40px"
            size="sm"
            type="round-outline"
            text="로그인"
          />
        </Flex>
      </Flex>

      <Flex flexDirection="column" rowGap={'10px'}>
        <Flex columnGap={'10px'} alignItems="center">
          <IconButton
            type="download"
            width="110px"
            height="50px"
            size="md"
            text="내보내기"
          />
          <IconButton
            type="download"
            width="94px"
            height="40px"
            size="sm"
            text="내보내기"
          />
        </Flex>
        <Flex columnGap={'10px'} alignItems="center">
          <IconButton
            type="add"
            width="110px"
            height="50px"
            size="md"
            text="메뉴추가"
          />
          <IconButton
            type="add"
            width="94px"
            height="40px"
            size="sm"
            text="메뉴추가"
          />
        </Flex>
        <Flex alignItems="center" columnGap={'10px'}>
          <Pagination
            currentPage={currentPage}
            limit={2}
            total={10}
            onNextPageClicked={(page: number) => setCurretPage(page)}
            onPreviousPageClicked={(page: number) => setCurretPage(page)}
            onPageNumberClicked={(page: number) => setCurretPage(page)}
          />
        </Flex>
      </Flex>
    </div>
  );
}

export default withAdminLayout(Test);
