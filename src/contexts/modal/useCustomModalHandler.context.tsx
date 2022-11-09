import { useDispatch } from 'react-redux';

import constate from 'constate';

import { customModalSliceAction } from '@features/customModal/customModalSlice';

import useOpenModalByQueryParams from 'hooks/useOpenModalByQueryParams';

function useCustomModalHandler() {
  const dispatch = useDispatch();
  const { closeModal, openModal } = useOpenModalByQueryParams({
    'custom-modal': (isOpen: boolean) =>
      dispatch(customModalSliceAction.setIsOpenModal(isOpen)),
  });
  function closeCustomModal() {
    closeModal('custom-modal');
  }
  function openCustomModal() {
    openModal(['custom-modal']);
  }
  return { closeCustomModal, openCustomModal };
}

export const [CustomModalHandlerProvider, useCustomModalHandlerContext] =
  constate(useCustomModalHandler);

export function withCustomModalHandlerContext<T extends Function>(
  Component: T,
) {
  return function WrappedComponent(props: Parameter<T>) {
    return (
      <CustomModalHandlerProvider>
        <Component {...(typeof props === 'object' ? props : {})} />
      </CustomModalHandlerProvider>
    );
  };
}
