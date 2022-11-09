import { useDispatch } from 'react-redux';

import { Button } from '@chakra-ui/react';

import { customModalSliceAction } from '@features/customModal/customModalSlice';
import useAppStore from '@features/useAppStore';

import AdminLayout from '@components/common/@Layout/AdminLayout';
import withAdminLayout from '@components/common/@Layout/AdminLayout';
import AlertModal from '@components/common/ModalContainer';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';
import { useGlobalModalHandlerContext } from 'contexts/modal/useGlobalModalHandler.context';

function Test({ Component, pageProps }: any) {
  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();
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
      <Button h="140px" w="100%" colorScheme="blue" onClick={handleClick}>
        모달 테스트
      </Button>
    </div>
  );
}

export default withAdminLayout(Test);
