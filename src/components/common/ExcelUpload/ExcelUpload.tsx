import React, { useEffect, useRef, useState } from 'react';

import { Flex, Input } from '@chakra-ui/react';

import eventApi from '@apis/event/EventApi';

import SmallButton from '../SmallButton';
import { FileInputArea, FileWrapper, IconArea } from './ExcelUpload.Style';

interface FileProps {
  onClick?: () => void;
  fileValue?: string;
  onChange?: (file: File | null) => void;
  onDelete?: () => void;
}

const FileUpload = ({ onClick, fileValue, onChange, onDelete }: FileProps) => {
  const file = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>(fileValue ? fileValue : '');
  const id = (Math.random() * 7).toString(7);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const file = (target.files as FileList)[0];
    setFileName(file?.name);
    const formData = new FormData();
    formData.append('file', file);

    eventApi.postEventParticipantList(formData).then((response) => {
      console.log(`response ${response.success}`);

      if (response.success) {
        alert('엑셀 업로드 완료!');
        if (onChange) onChange(file);
      } else {
        alert('업로드에 실패하였습니다. 잠시 후 다시 시도해주세요');
      }
    });
  };

  const fileUpload = () => {
    alert('touch!! ddd');
    const file = document.getElementById('file');
    file?.click();
    if (onClick) {
      onClick();
    }
  };

  const delFileButton = () => {
    if (file.current) {
      file.current.value = '';
      setFileName('');
      if (onChange) onChange(null);
      if (onDelete) onDelete();
    }
  };

  useEffect(() => {
    setFileName(fileValue ? fileValue : '');
  }, [fileValue]);

  return (
    <FileWrapper
      style={{ "height":"100%"}}
    >
      {/* <FileInputArea
      > */}
        <input
          style={{"display":"none"}}
          type="file"
          id={`file-${id}`}
          onChange={onFileInputChange}
          ref={file}
          accept=".xlsx"
        />
         
        <Input
          placeholder="선택된 파일 없음"
          isInvalid={true}
          variant="Unstyled"
          readOnly
          value={fileName}
          onClick={fileUpload}
          fontSize="12px"
          lineHeight="18px"
          letterSpacing="-0.02em"
          w="100%"
          h="100%"
          padding={0}
          defaultValue={fileName}
        />
        <SmallButton
          width="120px"
          height='100%'
          color={"blue"}
          text="파일선택"
          onClick={() => onFileInputChange}
          label={`file-${id}`}
        />
      {/* </FileInputArea> */}
    </FileWrapper>
  );
};

export default FileUpload;
