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
  useToast,
} from '@chakra-ui/react';

import managementCodeApi from '@apis/commoncode/ManagementCodeApi';

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

import { MenageCol } from '../ManagementCode.data';

interface ReqManageKey {
  codeId: number;
  code: string;
  codeValue: string;
  info: string;
  parentCode: string;
}
interface StampProps extends Omit<ModalProps, 'children'> {
  type?: string;
  targetId?: number;
  onComplete?: () => void;
}

const RadioGroups = [
  {
    value: '0',
    label: '상위코드',
  },
  {
    value: '1',
    label: '하위코드',
  },
];

const StampModal = ({
  type,
  targetId,
  onClose,
  onComplete,
  ...props
}: StampProps) => {
  const toast = useToast();
  const defaultRequest = {
    codeId: 0,
    code: '',
    codeValue: '',
    info: '',
    parentCode: '',
  }
  const [request, setRequest] = useState<ReqManageKey>(defaultRequest);
  const [radioType, setRadioType] = useState<string>('0');
  const [parentType, setParentType] = useState<{ value: string | number; label: string }[]>([
    { value: '', label: '' },
  ]);
  const [code, setCode] = useState<any[]>();

  const makeItem = (data: any[]) => {
    const items: { value: string | number; label: string }[] = [];
    data.map((i) => {
      const item = { value: '', label: '' };
      item.value = i.codeId.toString() !== undefined ? i.codeId.toString() : '';
      item.label =
        i.codeName.toString() !== undefined ? i.codeName.toString() : '';

      items.push(item);
    });
    setParentType(items);
  };

  const onCloses = () => {
    onClose();
    setRequest(defaultRequest);
    handleCodeType('0');
  };

  const handleCreate = () => {
    if (onComplete) onComplete();
    if (type === 'create') {
      handleCreateCode(radioType);
    } else {
      handleModifyCode();
    }
  };
  const pCodeName = parentType.find(
    (iter) => request.parentCode == iter.value)?.label as string
  const handleCreateCode = (state: string) => {
    
    if (state === '0') {
      const reqBody = {
        codeName: request.code,
        codeValue: request.codeValue,
        descText: request.info,
      };
      managementCodeApi.postCommonCode(reqBody).then((response) => {
        const { data, success } = response;
        if (success) {
          onCloses();
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
    } else {
      const reqBody = {
        codeName: request.code,
        codeValue: request.codeValue,
        descText: request.info,
        parentCodeName: pCodeName,
      };
      managementCodeApi.postCommonCode(reqBody).then((response) => {
        const { data, success } = response;
        if (success) {
          onCloses();
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
    }
  };

  const handleModifyCode = () => {
    const reqBody = {
      codeId: request.codeId,
      codeName: request.code,
      descText: request.info,
      codeValue: request.codeValue,
      parentCodeName: request.parentCode,
    };

    managementCodeApi
      .putCommonCode(reqBody, request.codeId)
      .then((response) => {
        const { data, success } = response;
        if (success) {
          onCloses();
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
    setRadioType(e);
  };
  const handleChangeInput = (
    key: MenageCol,
    value: string | number | dayjs.Dayjs,
  ) => {
    console.log(`value: ${value}`);
    setRequest({ ...request, [key]: value });
  };
  const renderContent = () => {
    return (
      <Flex direction={'column'} rowGap={'10px'}>
        <ModalRow
          title="코드 구분"
          content={
            <RadioButton
              group
              groupItems={RadioGroups}
              onClick={handleCodeType}
              value={radioType}
            />
          }
        />
        {radioType === '0' ? null : (
          <ModalRow
            title="상위 코드"
            content={
              <CustomSelect
                width={'100px'}
                placeholder={'상위 코드'}
                items={parentType}
                defaultValue={3}
                onChange={(value) => {
                  handleChangeInput(
                    'parentCode',
                    value as number
                  );
                }}
              />
            }
          />
        )}

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
          title="코드값"
          content={
            <InputBox
              placeholder="코드값 (선택)"
              defaultValue={request.codeValue}
              onChange={(e) => handleChangeInput('codeValue', e.target.value)}
            />
          }
        />
        <ModalRow
          title="설명"
          content={
            <InputBox
              placeholder="설명 (선택)"
              defaultValue={request.info}
              onChange={(e) => handleChangeInput('info', e.target.value)}
            />
          }
        />
        {/* <ModalRow title="사용 여부" content={<CheckBox>{'사용'}</CheckBox>} /> */}
      </Flex>
    );
  };
  
  useEffect(() => {
    setRadioType('0');
    managementCodeApi.getParentCommonCode().then((response) => {
      const { success, data } = response;
      if (success) {
        setCode(data);
        if (data !== undefined) {
          makeItem(data);
        }
      }
    });
  }, []);

  useEffect(() => {
    console.log('선택한 row :', targetId, type);
    if (targetId !== undefined && type==='modify') {
      console.log("radio:", radioType);
      getOneCommonCodeInfo(targetId)
    }
  }, [targetId, type]);

  const getOneCommonCodeInfo=(targetId : number) => {
    managementCodeApi.getOneCommonCode(targetId).then((response) => {
      const { data, success} = response;
      if(success) {
        if(data?.codeId){
          request.codeId = data?.codeId
        }
        if(data?.codeName) {
          request.code= data?.codeName
        }
        if(data?.codeValue) {
          request.codeValue= data?.codeValue
        }
        if(data?.codeName) {
          request.info= data?.descText
        }
        if(data?.parentCodeName) {
          request.parentCode= data?.parentCodeName
        }
      }
    })
    console.log("req:", request);
  } 
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
            onClick={onCloses}
          />
          <Button
            type="square"
            text={type === 'create' ? '추가' : '수정'}
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
