import React, { useRef, useState } from 'react';

import { Input } from '@chakra-ui/react';

import SmallButton from '../SmallButton';
import { FileInputArea, FileWrapper, IconArea } from './FileUpload.Style';

const FileUpload = () => {
  const file = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>();
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    setFileName(files.name);
    console.log(files.name);
  };

  const fileUpload = () => {
    const file = document.getElementById('file');
    file?.click();
  };
  const delFileButton = () => {
    if (file.current) {
      file.current.value = '';
      setFileName('');
    }
  };
  return (
    <FileWrapper>
      <SmallButton
        width="57px"
        text="파일선택"
        color="file"
        height="26px"
        label={'file'}
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
        />
        <input type="file" id="file" onChange={onFileInputChange} ref={file} />
      </FileInputArea>

      <IconArea src="icons/svg/file-close.svg" onClick={delFileButton} />
    </FileWrapper>
  );
};

export default FileUpload;
