import { useEffect, useState } from 'react';

import { group } from 'console';
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
  useToast,
} from '@chakra-ui/react';

import airlineCodeApi from '@apis/airline/AirlineCodeApi';

import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import RadioButton from '@components/common/CustomRadioButton/RadioButton';
import CustomSelect from '@components/common/CustomSelect';
import DatePicker from '@components/common/DatePicker';
import FileUpload from '@components/common/FileUpload/FileUpload';
import ImageCloseUp from '@components/common/ImageCloseUp/ImageCloseUp';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';
import TextareaBox from '@components/common/Textarea';

import { AirLineCol } from '../AirLineCode.data';

interface ReqAirportKey {
  id?: string;
  iata?: string;
  icao?: string;
  nameKr?: string;
  nameEng?: string;
  imageUrl?: string;
  pageUrl?: string;
  selfUrl?: string;
  dutyUrl?: string;
  repNum?: string;
  korYn?: boolean;
  answer?: boolean;
}
interface AirlineProps extends Omit<ModalProps, 'children'> {
  type?: string;
  targetId?: number;
  onComplete?: () => void;
}
const AirlineCodeModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: AirlineProps) => {
  const toast = useToast();

  const [request, setRequest] = useState<ReqAirportKey>({
    id: '',
    iata: '',
    icao: '',
    nameKr: '',
    nameEng: '',
    imageUrl: '',
    pageUrl: '',
    selfUrl: '',
    dutyUrl: '',
    repNum: '',
    korYn: false,
    answer: false,
  });

  const handleCreate = () => {
    if (onComplete) onComplete();
    if (type === 'create') {
      handleCreateCode();
    } else {
      handleModifyCode();
    }
  };

  const handleCreateCode = () => {
    const body = {
      airlineId: request.iata,
      airlineCode: request.icao,
      name: request.nameKr,
      englishName: request.nameEng,
      imageUrl: request.imageUrl,
      homepageUrl: request.pageUrl,
      selfCheckInUrl: request.selfUrl,
      dutyFreeShopUrl: request.dutyUrl,
      phoneNumber: request.repNum,
      domestic: request.korYn,
      useYn: request.answer,
    };

    airlineCodeApi.postAddAirlineCode(body).then((response) => {
      const { data, success } = response;
      if (success) {
        onClose();
        toast({
          description: '생성 완료',
        });
      } else {
        toast({
          status: 'error',
          description: '생성 실패',
        });
      }
    });
  };

  const handleModifyCode = () => {
    const body = {
      airlineCode: request.icao,
      name: request.nameKr,
      englishName: request.nameEng,
      imageUrl: request.imageUrl,
      homepageUrl: request.pageUrl,
      selfCheckInUrl: request.selfUrl,
      dutyFreeShopUrl: request.dutyUrl,
      phoneNumber: request.repNum,
      domestic: request.korYn,
      useYn: request.answer,
    };

    airlineCodeApi.putModifyAirlineCode(body, request.iata).then((response) => {
      const { data, success } = response;
      if (success) {
        onClose();
        toast({
          description: '수정 완료',
        });
      } else {
        toast({
          status: 'error',
          description: '수정 실패',
        });
      }
    });
  };

  const handleCodeType = (e: any) => {
    setCodeType(e);
  };

  const [codeType, setCodeType] = useState<boolean>(false);
  const handleChangeInput = (
    key: AirLineCol,
    value: string | number | boolean | dayjs.Dayjs,
  ) => {
    setRequest({ ...request, [key]: value });
  };
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'10px'}>
        <ModalRow
          title="항공사명 (국문)"
          content={
            <InputBox
              placeholder="항공사명 (국문)"
              defaultValue={request.nameKr}
              onChange={(e) => handleChangeInput('nameKr', e.target.value)}
            />
          }
        />

        <ModalRow
          title="항공사명 (영문)"
          content={
            <InputBox
              placeholder="항공사명 (영문)"
              defaultValue={request.nameEng}
              onChange={(e) => handleChangeInput('nameEng', e.target.value)}
            />
          }
        />
        {type === 'create' ? (
          <ModalRow
            title="IATA"
            content={
              <InputBox
                placeholder="IATA"
                defaultValue={request.iata}
                onChange={(e) => handleChangeInput('iata', e.target.value)}
              />
            }
          />
        ) : (
          <></>
        )}
        <ModalRow
          title="ICAO"
          content={
            <InputBox
              placeholder="ICAO"
              defaultValue={request.icao}
              onChange={(e) => handleChangeInput('icao', e.target.value)}
            />
          }
        />
        <ModalRow
          title="항공사 이미지 URL"
          content={
            <InputBox
              placeholder="항공사 이미지 URL"
              defaultValue={request.imageUrl}
              onChange={(e) => handleChangeInput('imageUrl', e.target.value)}
            />
          }
        />
        <ModalRow
          title="홈페이지 URL"
          content={
            <InputBox
              placeholder="홈페이지 URL"
              defaultValue={request.pageUrl}
              onChange={(e) => handleChangeInput('pageUrl', e.target.value)}
            />
          }
        />
        <ModalRow
          title="셀프체크인 URL"
          content={
            <InputBox
              placeholder="셀프체크인 URL"
              defaultValue={request.selfUrl}
              onChange={(e) => handleChangeInput('selfUrl', e.target.value)}
            />
          }
        />
        <ModalRow
          title="면세점 URL"
          content={
            <InputBox
              placeholder="면세점 URL"
              defaultValue={request.dutyUrl}
              onChange={(e) => handleChangeInput('dutyUrl', e.target.value)}
            />
          }
        />
        <ModalRow
          title="대표번호"
          content={
            <InputBox
              placeholder="대표번호"
              defaultValue={request.repNum}
              onChange={(e) => handleChangeInput('repNum', e.target.value)}
            />
          }
        />
        <ModalRow
          title="국내외여부"
          content={
            <RadioButton
              group
              groupLabel={['국내', '국외']}
              onClick={(e) =>
                e == 0
                  ? handleChangeInput('korYn', true)
                  : handleChangeInput('korYn', false)
              }
            />
          }
        />
        <ModalRow
          title="사용 여부"
          content={
            <CheckBox
              checked={request.answer}
              onClick={() => {
                setCodeType(!codeType);
                handleChangeInput('answer', codeType);
              }}
            >
              {'사용'}
            </CheckBox>
          }
        />
      </Flex>
    );
  };

  useEffect(() => {
    console.log('선택한 row :', targetId);
    if (targetId !== undefined) {
      airlineCodeApi
        .getAirlineCode(targetId)
        .then((response) => {
          const { message, data, success } = response;
          console.log(response);
          if (success) {
            setRequest({
              id: data?.airlineId,
              iata: data?.airlineId,
              icao: data?.airlineCode,
              nameKr: data?.name,
              nameEng: data?.englishName,
              imageUrl: data?.imageUrl,
              pageUrl: data?.homepageUrl,
              selfUrl: data?.selfCheckInUrl,
              dutyUrl: data?.dutyFreeShopUrl,
              repNum: data?.phoneNumber,
              korYn: data?.domestic,
              answer: data?.useYn,
            });
          } else {
            console.log('항공사 코드 불러오기 실패');
          }
        })
        .catch((err) => console.log('hihihiihi' + err));
    } else {
      setRequest({} as ReqAirportKey);
    }
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
        <ModalHeader>
          {type === 'create' ? '코드 추가' : '코드 수정'}
        </ModalHeader>

        <ModalBody>{renderContent()}</ModalBody>
        <ModalFooter>
          <Button
            type="square-grayscale"
            text="취소"
            size={'sm'}
            width={'120px'}
            onClick={onClose}
          />
          <Button
            type="square"
            text={type === 'create' ? '추가' : '수정 '}
            size={'sm'}
            width={'120px'}
            onClick={handleCreate}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AirlineCodeModal;
