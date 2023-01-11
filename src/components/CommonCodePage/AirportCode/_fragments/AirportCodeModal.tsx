import { SetStateAction, useEffect, useState } from 'react';

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

import commonApi from '@apis/common/CommonApi';
import { RoungeInfo } from '@apis/common/CommonApi.type';

import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import CustomSelect from '@components/common/CustomSelect';
import DatePicker from '@components/common/DatePicker';
import FileUpload from '@components/common/FileUpload/FileUpload';
import ImageCloseUp from '@components/common/ImageCloseUp/ImageCloseUp';
import InputBox from '@components/common/Input';
import ModalRow from '@components/common/ModalRow';
import TextareaBox from '@components/common/Textarea';

import { AirPortCol } from '../AirportCode.data';

interface ReqAirportKey {
  name: string;
  code: string;
  loungeId: string;
  answer: string;
}
interface StampProps extends Omit<ModalProps, 'children'> {
  type?: string;
  targetId?: number;
  onComplete?: () => void;
}
const StampModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: StampProps) => {
  const [request, setRequest] = useState<ReqAirportKey>({
    name: '',
    code: '',
    loungeId: '',
    answer: '',
  });
  type itemType = {
    value: string | number;
    label: string;
  };
  const [codeType, setCodeType] = useState<boolean>(false);
  const [item, setItem] = useState<itemType[]>([{ value: '', label: '' }]);
  const handleCreate = () => {
    if (onComplete) {
      if (type === 'modify') {
        putAirportCode();
        onComplete();
      } else {
        addAirportCode();
        onComplete();
      }
    }
  };
  const handleCodeType = (e: any) => {
    setCodeType(e);
  };

  const [rouge, setRounge] = useState<RoungeInfo[]>();

  // 라운지
  useEffect(() => {
    commonApi.getRoungeList().then((response) => {
      const { data, count, success } = response;
      if (success) {
        setRounge(data);
        if (data !== undefined) {
          makeItem(data);
        }
      }
    });
  }, []);

  const makeItem = (data: RoungeInfo[]) => {
    const items: { value: string | number; label: string }[] = [];
    data.map((i) => {
      const item = { value: '', label: '' };
      item.value =
        i.loungeId.toString() !== undefined ? i.loungeId.toString() : '';
      item.label = i.name.toString() !== undefined ? i.name.toString() : '';

      items.push(item);
    });

    setItem(items);

    console.log(items);
  };

  // 공항 코드 추가하기
  const addAirportCode = () => {
    const body = {
      code: request.code,
      name: request.name,
      useYn: codeType,
      loungeId: request.loungeId,
    };

    console.log(`loungeId >>> ${body.loungeId}`);
    commonApi.postAirport(body).then((response) => {
      const { data, success } = response;

      console.log(`data>> ${data}`);
      onCloses();
    });
  };

  // 공항 코드 수정하기
  const putAirportCode = () => {
    const body = {
      name: request.name,
      useYn: codeType,
      loungeId: request.loungeId,
    };

    console.log(`loungeId >>> ${body.loungeId}`);
    commonApi.putAlineCode(body, request.code).then((response) => {
      const { data, success } = response;

      console.log(`data>> ${data}`);

      onCloses();
    });
  };

  const onCloses = () => {
    onClose();
    setRequest({ name: '', code: '', loungeId: '', answer: '' });
  };
  const handleChangeInput = (
    key: AirPortCol,
    value: string | number | dayjs.Dayjs,
  ) => {
    setRequest({ ...request, [key]: value });
  };
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'10px'}>
        <ModalRow
          title="공항명 (국문)"
          content={
            <InputBox
              placeholder="공항명(국문)"
              defaultValue={request.name}
              onChange={(e) => handleChangeInput('name', e.target.value)}
            />
          }
        />

        <ModalRow
          title="코드"
          content={
            <InputBox
              placeholder="코드"
              defaultValue={request.code}
              onChange={(e) => handleChangeInput('code', e.target.value)}
            />
          }
        />
        <ModalRow
          title="라운지"
          content={
            <CustomSelect
              placeholder={'라운지 선택'}
              items={item}
              defaultValue={request.loungeId}
              onChange={(value) => {
                console.log('v: ', value as string);
                handleChangeInput('loungeId', value as string);
              }}
            />
          }
        />

        <ModalRow
          title="사용 여부"
          content={
            <CheckBox checked={codeType} onClick={() => setCodeType(!codeType)}>
              {'사용'}
            </CheckBox>
          }
        />
      </Flex>
    );
  };

  useEffect(() => {
    console.log('선택한 row :', targetId, type);
    if (type === 'modify') {
      console.log('수정');
      getAirportInfo(targetId);
    }
  }, [targetId, type]);

  useEffect(() => {
    console.log('업데이트 : ', request);
  }, [request]);

  const getAirportInfo = (targetId: any) => {
    commonApi
      .getAirportInfo(targetId)
      .then((response) => {
        const { data, count, success } = response;
        if (success) {
          if (data?.code !== undefined) {
            request.code = data?.code;
          }
          if (data?.name !== undefined) {
            request.name = data?.name;
          }
          if (data?.loungeId !== undefined) {
            request.loungeId = data?.loungeId;
          }
          // if (data?.useYn !== undefined) {
          //   request.useYn = data?.useYn;
          // }
        }
      })
      .catch((err) => console.log(err));
  };
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
          {type === 'create' ? '공항 코드 추가' : '공항 코드 수정'}
        </ModalHeader>

        <ModalBody>{renderContent()}</ModalBody>
        <ModalFooter>
          <Button
            type="square-grayscale"
            text="취소"
            size={'sm'}
            width={'120px'}
            onClick={onCloses}
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

export default StampModal;
