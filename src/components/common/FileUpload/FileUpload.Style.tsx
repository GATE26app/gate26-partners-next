import styled from '@emotion/styled';

export const FileWrapper = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;
export const FileInputArea = styled.div`
  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
  width: 100%;
`;
export const IconArea = styled.img`
  background-image: url('/public/icons/svg/file-close.svg');
  cursor: pointer;
`;
