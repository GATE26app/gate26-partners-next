import styled from '@emotion/styled';

export const CloseUpWrapper = styled.div`
  display: flex;
  column-gap: 5px;
  align-items: center;
`;
export const FileInputArea = styled.div`
  width: 100%;
  height: 100%;
  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;
export const IconArea = styled.img`
  cursor: pointer;
  align-self: flex-end;
`;
