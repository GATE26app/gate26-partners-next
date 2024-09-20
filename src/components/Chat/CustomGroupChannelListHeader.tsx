import React from 'react';
import { GroupChannelListHeader } from '@sendbird/uikit-react/GroupChannelList/components/GroupChannelListHeader';
import { Text } from '@chakra-ui/react';

const removeUserId = (content) => {
  return React.Children.map(content, (child) => {
    if (React.isValidElement(child) && child.props.user_id) {
      return null; // user_id가 있는 요소를 제거합니다.
    }
    return child;
  });
};

const CustomGroupChannelListHeader = (props) => {
  const defaultRenderMiddle = GroupChannelListHeader.defalutProps.renderMiddle;

  const customRenderMiddle = (props) => {
    const middleContent = defaultRenderMiddle(props);
    return removeUserId(middleContent);
  };

  return (
    <GroupChannelListHeader {...props} renderMiddle={customRenderMiddle} />
  );
};

export default CustomGroupChannelListHeader;
