import React, { useEffect, useRef, useState } from 'react';

import { Input } from '@chakra-ui/react';

import eventApi from '@apis/event/EventApi';

import IconButton from '@components/common/IconButton';

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
    alert('aaaaa');
    const formData = new FormData();
    formData.append('file', file);

    eventApi.postEventParticipantList(formData).then((response) => {
      console.log(`response ${response.success}`);
    });

    if (onChange) onChange(file);
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
    <FileWrapper>
      <SmallButton
        width="57px"
        text="파일선택"
        color="file"
        height="26px"
        label={`file-${id}`}
      />
      <FileInputArea>
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
        <input
          type="file"
          id={`file-${id}`}
          onChange={onFileInputChange}
          ref={file}
          accept=".xlsx"
        />
      </FileInputArea>
    </FileWrapper>
  );
};

export default FileUpload;
