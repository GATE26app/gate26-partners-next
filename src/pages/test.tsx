import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Flex,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  AccordionIcon,
  Box,
  useTheme
} from '@chakra-ui/react';

import { customModalSliceAction } from '@features/customModal/customModalSlice';
import useAppStore from '@features/useAppStore';

import withAdminLayout from '@components/common/@Layout/AdminLayout';
import Button from '@components/common/Button';
import IconButton from '@components/common/IconButton';
import Pagination from '@components/common/Pagination';
import ColorSection from '@components/common/TokDocsDevTool/_fragments/TokDocsModal/_fragments/AppStyleViewerSection/_fragments/ColorSection';
import TextStyleSection from '@components/common/TokDocsDevTool/_fragments/TokDocsModal/_fragments/AppStyleViewerSection/_fragments/TextStyleSection';

import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface AccodianProps {
  title: string,
  Pannel: JSX.Element
}

function AccoianWrap({ title, Pannel }: AccodianProps) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex='1' textAlign='left'>
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel style={{ backgroundColor: "#efefef" }} pb={4}>
        {Pannel}
      </AccordionPanel>
    </AccordionItem>
  )
}

function Test({ Component, pageProps }: any) {
  const dispatch = useDispatch();
  const { openCustomModal } = useCustomModalHandlerContext();

  const theme = useTheme();
  const {
    colors,
    textStyles,
  } = theme;

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
      <Flex>
        <Accordion style={{ width: "100%" }} defaultIndex={[0]} allowMultiple>
          <AccoianWrap
            title='Button'
            Pannel={
              <Flex rowGap={'10px'} flexDirection="column">
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
            }
          />
          <AccoianWrap
            title='Icon Button'
            Pannel={
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
              </Flex>
            }
          />
          <AccoianWrap
            title='Modal'
            Pannel={
              <Flex alignItems="center" columnGap={'10px'}>
                <Button
                  width="120px"
                  height="50px"
                  size="sm"
                  onClick={handleClick}
                  text="모달 테스트"
                />
              </Flex>
            }
          />
          <AccoianWrap
            title='Pagination'
            Pannel={
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
            }
          />
          <AccoianWrap
            title='Colors'
            Pannel={
              <ColorSection colors={colors} />
            }
          />
          <AccoianWrap
            title='Typography'
            Pannel={
              <TextStyleSection textStyles={textStyles} />
            }
          />
        </Accordion>
      </Flex>

    </div>
  );
}

export default withAdminLayout(Test);
