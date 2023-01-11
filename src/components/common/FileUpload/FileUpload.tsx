import React, { useEffect, useRef, useState } from 'react';

import { Input } from '@chakra-ui/react';

import SmallButton from '../SmallButton';
import { FileInputArea, FileWrapper, IconArea } from './FileUpload.Style';

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

    if (onChange) onChange(file);
  };

  const fileUpload = () => {
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
          accept="image/png, image/jpeg"
        />
      </FileInputArea>

      <IconArea src="/icons/svg/file-close.svg" onClick={delFileButton} />
    </FileWrapper>
  );
};

export default FileUpload;
