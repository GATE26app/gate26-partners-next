import React, { useState } from 'react';

import RoundImage from '../RoundImage';
import { CloseUpWrapper, IconArea } from './ImageCloseUp.style';
import ImageCloseUpModal from './_fragments/imageCloseUpModal';

interface CloseUpProps {
  src: string;
  width?: string;
  height?: string;
}
interface ModalProps {
  isOpen: boolean;
}
const ImageCloseUp = ({ src, width, height }: CloseUpProps) => {
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });
  const handleCloseModal = () => setModal({ isOpen: false });
  return (
    <>
      <CloseUpWrapper>
        <RoundImage src={src} width={width} height={height} />
        <IconArea
          src="/icons/svg/close-up-icon.svg"
          onClick={() => setModal({ isOpen: true })}
        />
      </CloseUpWrapper>
      <ImageCloseUpModal
        isOpen={modal.isOpen}
        onClose={handleCloseModal}
        src={src}
      />
    </>
  );
};

export default ImageCloseUp;
