import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
} from '@chakra-ui/react';

import Button from '@components/common/Button';
import DatePicker from '@components/common/DatePicker';
import ImageCloseUp from '@components/common/ImageCloseUp/ImageCloseUp';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';
import TextareaBox from '@components/common/Textarea';

import { ModalQuestionColumnType } from '../OneQuestionPage.data';
import { TableWrapper } from './AnswerModal.style';

interface ReqOneQuestionModal {
  type: string;
  title: string;
  content: string;
  thumbnail: string;
  email: string;
  answerTitle: string;
  answerContent: string;
}
interface OneQuestionProps extends Omit<ModalProps, 'children'> {
  type?: number;
  targetId?: number;
  onComplete?: () => void;
}
const QuestionModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: OneQuestionProps) => {
  const [request, setRequest] = useState<ReqOneQuestionModal>({
    type: '',
    title: '',
    content: '',
    thumbnail:
      'https://s3-alpha-sig.figma.com/img/c466/a46b/9659838dced1c10608c2819e8ce74474?Expires=1669593600&Signature=YviggbnRkPFqpjtY-e3RZikolmQU7VcDS1IEq3GUVED20C3qU~Nfmj3kDfFy11ZqpSQA4-gS5-POiMDqkW0ladIeIXMlQ1JE3CVsph6ZoOstlLf11bqVebOq3zxJLxVmhIpCMv-asgtwrZrqsXCI~zLgN7PmGbhBScucXixo0TmdOAgh02XDm1ugsEJKns5KZCfStPICJmS0IP3jeu3pigDJfCQtssRANGNF7a6T5mNpfZaoDNZoy7Q8dseTD--GkVBmAfGoT3BZoTf1peXmYO6QA1noqyoUK6b~tmKLfOfLFdyj1TziZy37KS1XMvJF7aoIn-ld-hEXbgoAoCd8xg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    email: '',
    answerTitle: '',
    answerContent: '',
  });
  const handleCreate = () => {
    if (onComplete) onComplete();
  };
  const handleChangeInput = (
    key: ModalQuestionColumnType,
    value: string | number,
  ) => {
    setRequest({ ...request, [key]: value });
  };
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'10px'}>
        <TableWrapper>
          <ModalRow
            title="문의 유형"
            color="gray.700"
            content={
              <Text color={'gray.700'} fontSize={'15px'}>
                항공/공항 정보
              </Text>
            }
          />
          <ModalRow
            title="문의 제목"
            color="gray.700"
            content={
              <Text color={'gray.700'} fontSize={'15px'}>
                Test
              </Text>
            }
          />
          <ModalRow
            title="문의 내용"
            color="gray.700"
            content={
              <Text color={'gray.700'} fontSize={'15px'}>
                Testtesttesttest
              </Text>
            }
          />
          <ModalRow
            title="이미지"
            height="80px"
            color="gray.700"
            content={
              <ImageCloseUp
                src={request.thumbnail}
                width={'80px'}
                height={'80px'}
              />
            }
          />
        </TableWrapper>

        <ModalRow
          title="이메일"
          content={
            <InputBox
              placeholder="gate26@asianaidt.com"
              defaultValue={request.email}
              onChange={(e) => handleChangeInput('email', e.target.value)}
            />
          }
        />
        <ModalRow
          title="답변 제목"
          content={
            <InputBox
              placeholder="답변 제목"
              defaultValue={request.answerTitle}
              onChange={(e) => handleChangeInput('answerTitle', e.target.value)}
            />
          }
        />
        <ModalRow
          title="답변 내용"
          height="120px"
          content={
            <TextareaBox
              placeholder="답변 내용"
              h={'120px'}
              defaultValue={request.answerContent}
              onChange={(e) =>
                handleChangeInput('answerContent', e.target.value)
              }
            />
          }
        />
      </Flex>
    );
  };

  useEffect(() => {
    console.log('선택한 row :', targetId);
  }, [targetId, type]);

  useEffect(() => {
    console.log('업데이트 : ', request);
  }, [request]);

  return (
    <Modal
      size={'md'}
      isCentered
      variant={'simple'}
      onClose={onClose}
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{type === 1 ? '답변확인' : '답변하기'}</ModalHeader>

        <ModalBody>{renderContent()}</ModalBody>
        <ModalFooter>
          {type === 0 ? (
            <>
              <Button
                type="square-grayscale"
                text="취소"
                size={'sm'}
                width={'120px'}
                onClick={onClose}
              />
              <Button
                type="square"
                text={'답변하기'}
                size={'sm'}
                width={'120px'}
                onClick={handleCreate}
              />
            </>
          ) : (
            <Button
              type="square-grayscale"
              text={'확인'}
              size={'sm'}
              width={'120px'}
              onClick={onClose}
            />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuestionModal;
