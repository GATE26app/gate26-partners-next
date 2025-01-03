import {
  ColorBackRed,
  ColorBlack,
  ColorRed,
  ColorRed50,
  ColorRedOpa,
  ColorWhite
} from '@/utils/_Palette';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import '@sendbird/uikit-react/dist/index.css';
import React, { useEffect, useState } from 'react';
// import { Channel, ChannelList, SendBirdProvider } from 'sendbird-uikit';
import { usePartnerZuInfo } from '@/_store/PartnerInfo';
import {
  CreateAdminMessage,
  CreateFileYouMessage,
  CreateUserMessage,
  CreateUserYouMessage
} from '@/apis/sendbird/chatUtils';
import sendBirdApi from '@/apis/sendbird/SendBirdApi';
import { useChatBackUpMessageMutation } from '@/apis/sendbird/SendBirdApi.mutation';
import { getImagePath } from '@/utils/format';
import {
  getSendBirdToken,
  getToken
} from '@/utils/localStorage/token';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
import { Message } from '@sendbird/uikit-react/GroupChannel/components/Message';
import { MessageInputWrapper } from '@sendbird/uikit-react/GroupChannel/components/MessageInputWrapper';
import { useGroupChannelContext } from '@sendbird/uikit-react/GroupChannel/context';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
import GroupChannelListHeader from '@sendbird/uikit-react/GroupChannelList/components/GroupChannelListHeader';
import SendbirdProvider, {
  useSendbirdStateContext,
} from '@sendbird/uikit-react/SendbirdProvider';
import kr from 'date-fns/locale/ko';
import { useQuery } from 'react-query';
import CarouselMessage from './CarouselMessage';
import CustomMessage from './CustomMessage';
import CustomReMessage from './CustomReMessage';
import './style.css';
const myColorSet = {
  '--sendbird-light-primary-500': ColorRedOpa,
  '--sendbird-light-primary-400': ColorRed50,
  '--sendbird-light-primary-300': ColorRed,
  '--sendbird-light-primary-200': ColorRed50,
  '--sendbird-light-primary-100': ColorBackRed,
};

const CustomConnectionHandler = () => {
  try {
    const store = useSendbirdStateContext();
    const sdk = store?.stores?.sdkStore?.sdk;
    if (sdk.currentUser) {
      sdk.registerFCMPushTokenForCurrentUser(getToken().fcm);
    }
  } catch (error) { }
  return null;
};

function ChatComponent() {
  const [stringSet] = useState({
    MESSAGE_INPUT__PLACE_HOLDER__SUGGESTED_REPLIES: '위에서 선택해주세요',
    MESSAGE_INPUT__PLACE_HOLDER__MESSAGE_FORM: '메시지 양식을 작성해주세요.',
    MESSAGE_INPUT__PLACE_HOLDER__FROZEN:
      '이 채널에서는 채팅을 사용할 수 없습니다',
    MESSAGE_INPUT__PLACE_HOLDER__MUTED: '당신은 음소거되었습니다',
    MESSAGE_INPUT__PLACE_HOLDER__MUTED_SHORT: '당신은 음소거됨',
    MESSAGE_INPUT__QUOTE_REPLY__PLACE_HOLDER: '메시지에 답장',
    // 공통 UI
    BUTTON__SUBMIT: '제출',
    BUTTON__CANCEL: '취소',
    BUTTON__DELETE: '삭제',
    BUTTON__SAVE: '저장',
    BUTTON__CREATE: '생성',
    BUTTON__INVITE: '초대',
    BUTTON__OK: '확인',
    BADGE__OVER: '+',
    NO_TITLE: '제목 없음',
    NO_NAME: '(이름 없음)',
    NO_MEMBERS: '(멤버 없음)',
    LABEL__OPERATOR: '운영자',
    // 컨텍스트 메뉴
    MESSAGE_MENU__COPY: '복사',
    MESSAGE_MENU__REPLY: '답장',
    MESSAGE_MENU__THREAD: '스레드에서 답장',
    MESSAGE_MENU__OPEN_IN_CHANNEL: '채널에서 열기',
    MESSAGE_MENU__EDIT: '편집',
    MESSAGE_MENU__RESEND: '재전송',
    MESSAGE_MENU__DELETE: '삭제',
    MESSAGE_MENU__SAVE: '저장',
    //  * FIXME: legacy 복원, 오픈 채널 메시지 리팩토링 후 제거 *
    CONTEXT_MENU_DROPDOWN__COPY: '복사',
    CONTEXT_MENU_DROPDOWN__EDIT: '편집',
    CONTEXT_MENU_DROPDOWN__RESEND: '재전송',
    CONTEXT_MENU_DROPDOWN__DELETE: '삭제',
    CONTEXT_MENU_DROPDOWN__SAVE: '저장',
    // 기능 - 메시지 검색
    SEARCH: '검색',
    SEARCH_IN_CHANNEL: '채널에서 검색',
    SEARCH_IN: '검색 위치',
    SEARCHING: '메시지를 검색 중...',
    NO_SEARCHED_MESSAGE: '결과를 찾을 수 없습니다.',
    // 기능 - 메시지 답장
    QUOTE_MESSAGE_INPUT__REPLY_TO: '답장하기',
    QUOTE_MESSAGE_INPUT__FILE_TYPE_IMAGE: '사진',
    QUOTE_MESSAGE_INPUT__FILE_TYPE_GIF: 'GIF',
    QUOTE_MESSAGE_INPUT__FILE_TYPE__VIDEO: '비디오',
    QUOTED_MESSAGE__REPLIED_TO: '에 답장했습니다',
    QUOTED_MESSAGE__CURRENT_USER: '당신',
    QUOTED_MESSAGE__UNAVAILABLE: '메시지를 사용할 수 없습니다',
    // 기능 - 스레드
    THREAD__HEADER_TITLE: '스레드',
    CHANNEL__THREAD_REPLY: '답장',
    CHANNEL__THREAD_REPLIES: '답글',
    CHANNEL__THREAD_OVER_MAX: '99+',
    THREAD__THREAD_REPLY: '답장',
    THREAD__THREAD_REPLIES: '답글',
    THREAD__INPUT__REPLY_TO_THREAD: '스레드에 답장',
    THREAD__INPUT__REPLY_IN_THREAD: '스레드에서 답장',
    // 기능 - 멘션
    MENTION_NAME__NO_NAME: '(이름 없음)',
    MENTION_COUNT__OVER_LIMIT: '한 번에 최대 %d번 멘션할 수 있습니다.',
    UI__FILE_VIEWER__UNSUPPORT: '지원되지 않는 메시지',
    // 기능 - 음성 메시지
    VOICE_RECORDING_PERMISSION_DENIED: `음성 녹음이 불가능합니다.
      장치 시스템 설정에서 음성 녹음이 허용되지 않았습니다.`,
    VOICE_MESSAGE: '음성 메시지',
    // 채널 미리보기 마지막 메시지 파일 유형 표시 문자열
    CHANNEL_PREVIEW_LAST_MESSAGE_FILE_TYPE_GIF: 'GIF',
    CHANNEL_PREVIEW_LAST_MESSAGE_FILE_TYPE_PHOTO: '사진',
    CHANNEL_PREVIEW_LAST_MESSAGE_FILE_TYPE_VIDEO: '비디오',
    CHANNEL_PREVIEW_LAST_MESSAGE_FILE_TYPE_AUDIO: '오디오',
    CHANNEL_PREVIEW_LAST_MESSAGE_FILE_TYPE_VOICE_MESSAGE: '음성 메시지',
    CHANNEL_PREVIEW_LAST_MESSAGE_FILE_TYPE_GENERAL: '파일',
    CHANNEL_PREVIEW_LAST_MESSAGE_TEMPLATE_MESSAGE: '메시지',
    // 날짜 형식
    DATE_FORMAT__MESSAGE_LIST__NOTIFICATION__UNREAD_SINCE: "p '에서' MMM dd",
    DATE_FORMAT__MESSAGE_LIST__DATE_SEPARATOR: 'MMMM dd, yyyy',
    DATE_FORMAT__THREAD_LIST__DATE_SEPARATOR: 'MMM dd, yyyy',
    // 파일 업로드
    FILE_UPLOAD_NOTIFICATION__COUNT_LIMIT:
      '최대 %d개의 파일을 첨부할 수 있습니다.',
    FILE_UPLOAD_NOTIFICATION__SIZE_LIMIT: '파일당 최대 크기는 %d MB입니다.',
    // 피드백 버튼 텍스트
    FEEDBACK_LIKE: '좋아요',
    FEEDBACK_DISLIKE: '싫어요',
    // 모바일 피드백 옵션 메뉴 항목
    EDIT_COMMENT: '댓글 편집',
    REMOVE_FEEDBACK: '피드백 제거',
    // 피드백 모달 제목
    FEEDBACK_MODAL_TITLE: '추가 피드백 제공 (선택 사항)',
    FEEDBACK_CONTENT_PLACEHOLDER: '댓글 남기기',
    BUTTON__REMOVE_FEEDBACK: '피드백 제거',
    // 피드백 실패 모달 제목
    FEEDBACK_FAILED_SUBMIT: '제출할 수 없습니다. 다시 시도해주세요.',
    FEEDBACK_FAILED_SAVE: '저장할 수 없습니다. 다시 시도해주세요.',
    FEEDBACK_FAILED_DELETE: '삭제할 수 없습니다. 다시 시도해주세요.',
    // 양식 제출 실패 오류 메시지
    FORM_ITEM_REQUIRED: '이 필드는 필수입니다',
    FORM_ITEM_INVALID: '값을 확인해주세요',
    FORM_ITEM_OPTIONAL_EMPTY: '응답 없음',
    // 그룹 채널 - 대화
    MESSAGE_STATUS__YESTERDAY: '어제',
    CHANNEL__MESSAGE_LIST__NOTIFICATION__NEW_MESSAGE: '이후 새로운 메시지',
    /** @deprecated `DATE_FORMAT__MESSAGE_LIST__NOTIFICATION__UNREAD_SINCE`를 사용하세요. */
    CHANNEL__MESSAGE_LIST__NOTIFICATION__ON: '에서',
    // 채널 목록
    CHANNEL_PREVIEW_MOBILE_LEAVE: '채널 나가기',
    // 그룹 채널 - 설정
    CHANNEL_SETTING__HEADER__TITLE: '채널 정보',
    CHANNEL_SETTING__PROFILE__EDIT: '편집',
    CHANNEL_SETTING__MEMBERS__TITLE: '멤버',
    CHANNEL_SETTING__MEMBERS__SEE_ALL_MEMBERS: '모든 멤버',
    CHANNEL_SETTING__MEMBERS__INVITE_MEMBER: '사용자 초대',
    CHANNEL_SETTING__MEMBERS__YOU: ' (당신)',
    CHANNEL_SETTING__MEMBERS__SELECT_TITLE: '멤버 선택',
    CHANNEL_SETTING__MEMBERS__OPERATOR: '운영자',
    CHANNEL_SETTING__LEAVE_CHANNEL__TITLE: '채널 나가기',
    CHANNEL_SETTING__OPERATORS__TITLE: '운영자',
    CHANNEL_SETTING__OPERATORS__TITLE_ALL: '모든 운영자',
    CHANNEL_SETTING__OPERATORS__TITLE_ADD: '운영자 추가',
    CHANNEL_SETTING__OPERATORS__ADD_BUTTON: '추가',
    CHANNEL_SETTING__MUTED_MEMBERS__TITLE: '음소거된 멤버',
    CHANNEL_SETTING__MUTED_MEMBERS__TITLE_ALL: '모든 음소거된 멤버',
    CHANNEL_SETTING__NO_UNMUTED: '음소거된 멤버가 없습니다',
    CHANNEL_SETTING__BANNED_MEMBERS__TITLE: '차단된 사용자',
    CHANNEL_SETTING__FREEZE_CHANNEL: '채널 동결',
    CHANNEL_SETTING__MODERATION__REGISTER_AS_OPERATOR: '운영자로 등록',
    CHANNEL_SETTING__MODERATION__UNREGISTER_OPERATOR: '운영자 해제',
    CHANNEL_SETTING__MODERATION__MUTE: '음소거',
    CHANNEL_SETTING__MODERATION__UNMUTE: '음소거 해제',
    CHANNEL_SETTING__MODERATION__BAN: '차단',
    CHANNEL_SETTING__MODERATION__UNBAN: '차단 해제',
    CHANNEL_SETTING__MODERATION__EMPTY_BAN: '차단된 멤버가 없습니다',
    CHANNEL_SETTING__MODERATION__ALL_BAN: '모든 차단된 멤버',
    // 오픈 채널 - 대화
    OPEN_CHANNEL_CONVERSATION__TITLE_PARTICIPANTS: '참여자',
    OPEN_CHANNEL_CONVERSATION__SELECT_PARTICIPANTS: '참여자 선택',
    // 오픈 채널 목록
    OPEN_CHANNEL_LIST__TITLE: '채널',
    CREATE_OPEN_CHANNEL_LIST__TITLE: '새 채널 프로필',
    CREATE_OPEN_CHANNEL_LIST__SUBTITLE__IMG_SECTION: '채널 이미지',
    CREATE_OPEN_CHANNEL_LIST__SUBTITLE__IMG_UPLOAD: '업로드',
    CREATE_OPEN_CHANNEL_LIST__SUBTITLE__TEXT_SECTION: '채널 이름',
    CREATE_OPEN_CHANNEL_LIST__SUBTITLE__TEXT_PLACE_HOLDER: '채널 이름 입력',
    CREATE_OPEN_CHANNEL_LIST__SUBMIT: '생성',
    // 오픈 채널 - 설정
    OPEN_CHANNEL_SETTINGS__OPERATOR_TITLE: '채널 정보',
    OPEN_CHANNEL_SETTINGS__OPERATOR_URL: 'URL',
    OPEN_CHANNEL_SETTINGS__PARTICIPANTS_ACCORDION_TITLE: '참여자',
    OPEN_CHANNEL_SETTINGS__DELETE_CHANNEL_PANEL: '채널 삭제',
    OPEN_CHANNEL_SETTINGS__DELETE_CHANNEL_TITLE: '채널을 삭제하시겠습니까?',
    OPEN_CHANNEL_SETTINGS__DELETE_CHANNEL_CONTEXT:
      '삭제하면 이 채널은 복원할 수 없습니다.',
    OPEN_CHANNEL_SETTINGS__DELETE_CHANNEL_SUBMIT: '삭제',
    OPEN_CHANNEL_SETTINGS__OPERATORS_TITLE: '운영자',
    OPEN_CHANNEL_SETTINGS__OPERATORS__TITLE_ADD: '운영자 추가',
    OPEN_CHANNEL_SETTINGS__OPERATORS__TITLE_ALL: '모든 운영자',
    OPEN_CHANNEL_SETTINGS__MUTED_MEMBERS__TITLE: '음소거된 참여자',
    OPEN_CHANNEL_SETTINGS__MUTED_MEMBERS__TITLE_ALL: '모든 음소거된 참여자',
    OPEN_CHANNEL_SETTINGS__MUTED_MEMBERS__NO_ONE: '음소거된 참여자가 없습니다',
    OPEN_CHANNEL_SETTINGS__BANNED_MEMBERS__TITLE: '차단된 사용자',
    OPEN_CHANNEL_SETTINGS__BANNED_MEMBERS__TITLE_ALL: '모든 차단된 사용자',
    OPEN_CHANNEL_SETTINGS__BANNED_MEMBERS__NO_ONE: '차단된 사용자가 없습니다',
    OPEN_CHANNEL_SETTINGS__MEMBERS__YOU: ' (당신)',
    OPEN_CHANNEL_SETTINGS__MEMBERS__OPERATOR: '운영자',
    OPEN_CHANNEL_SETTINGS__PARTICIPANTS_TITLE: '참여자',
    OPEN_CHANNEL_SETTINGS__EMPTY_LIST: '참여자가 없습니다',
    OPEN_CHANNEL_SETTINGS__SEE_ALL: '모든 참여자 보기',
    OPEN_CHANNEL_SETTINGS__ALL_PARTICIPANTS_TITLE: '모든 참여자',
    OPEN_CHANNEL_SETTINGS__NO_TITLE: '(제목 없음)',
    OPEN_CHANNEL_SETTING__MODERATION__REGISTER_AS_OPERATOR: '운영자로 등록',
    OPEN_CHANNEL_SETTING__MODERATION__UNREGISTER_OPERATOR: '운영자 해제',
    OPEN_CHANNEL_SETTING__MODERATION__MUTE: '음소거',
    OPEN_CHANNEL_SETTING__MODERATION__UNMUTE: '음소거 해제',
    OPEN_CHANNEL_SETTING__MODERATION__BAN: '차단',
    OPEN_CHANNEL_SETTING__MODERATION__UNBAN: '차단 해제',
    // 채널 - 공통
    TRYING_TO_CONNECT: '연결 중…',
    TYPING_INDICATOR__IS_TYPING: '타이핑 중...',
    TYPING_INDICATOR__AND: '및',
    TYPING_INDICATOR__ARE_TYPING: '타이핑 중...',
    TYPING_INDICATOR__MULTIPLE_TYPING: '여러 사람이 타이핑 중...',
    CHANNEL_FROZEN: '채널이 동결되었습니다',
    PLACE_HOLDER__NO_CHANNEL: '채널이 없습니다',
    PLACE_HOLDER__WRONG: '문제가 발생했습니다',
    PLACE_HOLDER__RETRY_TO_CONNECT: '재시도',
    PLACE_HOLDER__NO_MESSAGES: '메시지가 없습니다',
    TOOLTIP__AND_YOU: ', 당신도',
    TOOLTIP__YOU: '당신',
    TOOLTIP__UNKNOWN_USER: '(이름 없음)',
    UNKNOWN__UNKNOWN_MESSAGE_TYPE: '(알 수 없는 메시지 유형)',
    UNKNOWN__CANNOT_READ_MESSAGE: '이 메시지를 읽을 수 없습니다.',
    UNKNOWN__TEMPLATE_ERROR: '(템플릿 오류)',
    FORM_VERSION_ERROR: '이 버전에서는 양식 타입 메시지를 사용할 수 없습니다.',
    UNKNOWN__CANNOT_READ_TEMPLATE: '이 템플릿을 읽을 수 없습니다.',
    MESSAGE_EDITED: '(편집됨)',
    // 채널 - 모달
    MODAL__DELETE_MESSAGE__TITLE: '이 메시지를 삭제하시겠습니까?',
    MODAL__CHANNEL_INFORMATION__TITLE: '채널 정보 편집',
    MODAL__CHANNEL_INFORMATION__CHANNEL_IMAGE: '채널 이미지',
    MODAL__CHANNEL_INFORMATION__UPLOAD: '업로드',
    MODAL__CHANNEL_INFORMATION__CHANNEL_NAME: '채널 이름',
    MODAL__CHANNEL_INFORMATION__INPUT__PLACE_HOLDER: '이름 입력',
    MODAL__INVITE_MEMBER__TITLE: '멤버 초대',
    MODAL__INVITE_MEMBER__SELECTED: '선택됨',
    MODAL__CHOOSE_CHANNEL_TYPE__TITLE: '새 채널',
    MODAL__CHOOSE_CHANNEL_TYPE__GROUP: '그룹',
    MODAL__CHOOSE_CHANNEL_TYPE__SUPER_GROUP: '슈퍼 그룹',
    MODAL__CHOOSE_CHANNEL_TYPE__BROADCAST: '방송',
    MODAL__CREATE_CHANNEL__TITLE: '새 채널',
    MODAL__CREATE_CHANNEL__GROUP: '그룹',
    MODAL__CREATE_CHANNEL__SUPER: '슈퍼 그룹',
    MODAL__CREATE_CHANNEL__BROADCAST: '방송',
    MODAL__CREATE_CHANNEL__SELECTED: '선택됨',
    MODAL__LEAVE_CHANNEL__TITLE: '이 채널을 나가시겠습니까?',
    MODAL__LEAVE_CHANNEL__FOOTER: '나가기',
    MODAL__VOICE_MESSAGE_INPUT_DISABLED__TITLE_MUTED:
      '당신은 운영자에 의해 음소거되었습니다.',
    MODAL__VOICE_MESSAGE_INPUT_DISABLED__TITLE_FROZEN: '채널이 동결되었습니다.',
    // 사용자 프로필
    USER_PROFILE__MESSAGE: '메시지',
    USER_PROFILE__USER_ID: '사용자 ID',
    EDIT_PROFILE__TITLE: '내 프로필',
    EDIT_PROFILE__IMAGE_LABEL: '프로필 이미지',
    EDIT_PROFILE__IMAGE_UPLOAD: '업로드',
    EDIT_PROFILE__NICKNAME_LABEL: '닉네임',
    EDIT_PROFILE__NICKNAME_PLACEHOLDER: '닉네임 입력',
    EDIT_PROFILE__USERID_LABEL: '사용자 ID',
    EDIT_PROFILE__THEME_LABEL: '어두운 테마',
    // 메시지 입력
    MESSAGE_INPUT__PLACE_HOLDER: '메시지 입력',
    MESSAGE_INPUT__PLACE_HOLDER__DISABLED:
      '이 채널에서는 채팅을 사용할 수 없습니다',
  });
  const toast = useToast();
  const { partnerInfo } = usePartnerZuInfo((state) => state);
  const [currentChannelUrl, setCurrentChannelUrl] = useState('');
  const [prevHeigth, setPrevHeigth] = useState(0);
  // scroll
  const [hasPrev, setHasPrev] = useState(false); // sendbird 측의 과거 데이터 조회 가능 여부
  const [done, setDone] = useState<boolean>(false); // 내부서버 측의 과거 데이터 조회 가능 여부
  const [scrollContainer, setScrollContainer] = useState<any>(); // scroll Container
  const [scrollValue, setScrollValue] = useState(0); // scrollTop
  const [sendBirdTokenState, setSendBirdTokenState] = useState(false);
  const [msId, setMsId] = useState('');
  const [lastListLength, setLastListLength] = useState(0);
  const [firstState, setFirstState] = useState(true);
  const [list, setList] = useState([]);

  const [menu, setMenu] = useState(false);

  const [first, setFirst] = useState(false);

  // context
  const [_context, setContext] = useState<any>();

  const handleSetCurrentChannel = (channel) => {
    setFirst(true); // 첫 화면에서 상태 변경
    if (channel?.url && first) {
      setCurrentChannelUrl(channel.url);
    }
  };

  /*
    한글은 조합형 문자이기 때문에, 키를 입력할 때 초성, 중성, 종성이 결합하는 과정에서 여러 번의 입력 이벤트가 발생합니다.
    keydown → compositionstart → 여러 번의 keydown 및 compositionupdate → compositionend → input 이벤트 순으로 동작합니다.

    해결법: compositionstart, compositionupdate, compositionend 이벤트를 사용하여 조합 상태를 감지할 수 있습니다. 조합 중인 상태에서는 keydown 이벤트를 무시하면 됩니다.
  */
  let isComposing = false; // 한글 조합 상태를 추적

  const handleKeyDown = (keyEvent: KeyboardEvent) => {
    // 조합 중인 경우 이벤트 무시
    if (isComposing) {
      return;
    }

    if (keyEvent.code === 'Enter' && !keyEvent.shiftKey) {
      // messageInputRef에 내용이 있는 경우 메시지 전송
      if (_context.messageInputRef.current.innerHTML !== '') {
        _context.sendUserMessage({ message: _context.messageInputRef.current.innerText });
        setTimeout(() => {
          _context.messageInputRef.current.innerHTML = '';
        }, 10);
      }
    }
  };

  const handleCompositionStart = () => {
    isComposing = true; // 한글 조합 시작
  };

  const handleCompositionEnd = () => {
    isComposing = false; // 한글 조합 종료
  };

  useEffect(() => {
    setFirst(false);
  }, []);

  //토큰 재발급
  const { data: SendBirdTokenData, error } = useQuery(
    ['GET_GOODSDETAIL'],
    () => sendBirdApi.getSendBirdToken(),
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: !!sendBirdTokenState,
    },
  );
  useEffect(() => {
    // body 스크롤 안되게 막기
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  // 백업 데이터 추가
  const add_list = async (list: any) => {
    // 특정 클래스를 가진 요소 선택
    const container = document.querySelector(
      '.sendbird-conversation__messages-padding',
    );
    if (container) {
      if (container) {
        // 추가할 요소의 배열
        if (list?.length > 0) {
          const firstElement = document.querySelector(
            '.sendbird-msg--scroll-ref',
          );
          const messageId = firstElement.getAttribute('data-sb-message-id');
          if (list?.length === 1 && list[0].message_id == Number(messageId)) {
            setDone(true);
          } else {
            let newElement: any = [];
            list.forEach(async (res, index) => {
              if (res.message_id != messageId) {
                if (res.type === 'MESG') {
                  // 일반 메세지
                  if (getSendBirdToken().user_id == res.user.user_id) {
                    var tag = await CreateUserMessage(
                      res,
                      list[index + 1] ? Number(list[index + 1].created_at) : 0,
                      list[index - 1] ? Number(list[index - 1].created_at) : 0,
                      list[index - 1] ? list[index - 1].user?.user_id : '',
                      list[index + 1] ? list[index + 1].user?.user_id : '',
                      currentChannelUrl,
                    );
                  } else {
                    var tag = await CreateUserYouMessage(
                      res,
                      list[index + 1] ? Number(list[index + 1].created_at) : 0,
                      list[index - 1] ? Number(list[index - 1].created_at) : 0,
                      list[index - 1] ? list[index - 1].user?.user_id : '',
                      list[index + 1] ? list[index + 1].user?.user_id : '',
                      currentChannelUrl,
                    );
                  }
                  if (tag) {
                    container.insertAdjacentHTML('afterbegin', tag);
                  }
                } else if (res.type === 'FILE') {
                  // 파일 메세지
                  const tag = await CreateFileYouMessage(
                    res,
                    list[index + 1] ? Number(list[index + 1].created_at) : 0,
                    list[index - 1] ? Number(list[index - 1].created_at) : 0,
                    list[index - 1] ? list[index - 1].user?.user_id : '',
                    list[index + 1] ? list[index + 1].user?.user_id : '',
                    currentChannelUrl,
                  );
                  if (tag) {
                    newElement.push(tag);
                    container.insertAdjacentHTML('afterbegin', tag);
                  }
                } else {
                  const tag = await CreateAdminMessage(res);
                  if (tag) {
                    newElement.push(tag);
                    container.insertAdjacentHTML('afterbegin', tag);
                  }
                }
              } else {
                // if(index == list.length - 2){
                //   console.log(newElement);
                //   container.insertAdjacentHTML('afterbegin', newElement);
                // }
              }
            });
          }
        }
      }
    }
  };

  const { mutate: GetHistory, isLoading: hLoading } =
    useChatBackUpMessageMutation({
      options: {
        onSuccess: async (res) => {
          if (res.success == true) {
            setLastListLength(res.data.messages.length);
            add_list(res.data.messages);
            setList([...list, res.data.messages]);
          } else {
            toast({
              position: 'top',
              duration: 2000,
              render: () => (
                <Box
                  style={{ borderRadius: 8 }}
                  p={3}
                  color="white"
                  bg="#ff6955"
                >
                  {'히스토리 데이터를 불러올 수 없습니다.'}
                </Box>
              ),
            });
          }
        },
        onError: (req) => {
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {'히스토리 데이터를 불러올 수 없습니다.'}
              </Box>
            ),
          });
        },
      },
    });

  const handleScroll = React.useCallback(() => {
    const scrollContainer = document.querySelector(
      '.sendbird-conversation__messages-padding',
    );
    if (scrollContainer) {
      setScrollValue(scrollContainer.scrollTop);

      // 스크롤 값이 100 미만일 때
      if (scrollContainer.scrollTop <= 60) {
        // console.log('이전 페이지가 존재함 ', hasPrev);
        // console.log('scroll heigt', scrollContainer.scrollHeight);

        setPrevHeigth(scrollContainer.scrollHeight);
        // 이전 페이지가 없을 때
        if (hasPrev === false) {
          // 가장 첫번째 element message_id
          const firstElement = document.querySelector(
            '.sendbird-msg--scroll-ref',
          );
          const messageId = firstElement?.getAttribute('data-sb-message-id');
          const createdAt = firstElement?.getAttribute('data-sb-created-at');
          console.log('messageId', messageId);

          console.log('msId', msId);
          // if (messageId !== msId) {

          // }
          // 내부 서버 가져올 데이터가 존재할 때
          // console.log(done, hLoading);
          if (done === false && hLoading === false) {
            if (messageId !== msId && firstState) {
              setMsId(messageId);
              GetHistory({
                // messageId: '7598494855',
                messageId: String(messageId),
                prevLimit: 50,
                nextLimit: 0,
                channelUrl: currentChannelUrl,
                ts: Date.now(),
              });
              setFirstState(false);
              scrollContainer.scrollTop =
                scrollContainer.scrollHeight - prevHeigth;
            } else if (lastListLength >= 50 && !firstState) {
              setMsId(messageId);
              GetHistory({
                // messageId: '7598494855',
                messageId: String(messageId),
                prevLimit: 50,
                nextLimit: 0,
                channelUrl: currentChannelUrl,
                ts: Date.now(),
              });
              setFirstState(false);
              scrollContainer.scrollTop =
                scrollContainer.scrollHeight - prevHeigth;
            }
          }
        }
      }
    }
  }, [hasPrev, done, hLoading]);
  useEffect(() => {
    const sc = document.querySelector(
      '.sendbird-conversation__messages-padding',
    );
    try {
      if (sc) {
        // 스크롤 이벤트 리스너 등록
        sc.addEventListener('scroll', handleScroll);
      }
    } catch (error) { }
    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      if (sc) {
        sc.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollContainer, hasPrev, done, hLoading]);

  const CustomMessageInput = () => {
    const { sendUserMessage, hasNext } = useGroupChannelContext();

    const context = useGroupChannelContext();
    if (context) {
      const isPrev = context.hasPrevious();
      setHasPrev(isPrev);
      if (context?.scrollRef?.current?.scrollTop === 60) {
        setHasPrev(isPrev);
      }
    }
    if (!_context) {
      setContext(useGroupChannelContext());
    }

    const sc = document.querySelector(
      '.sendbird-conversation__messages-padding',
    );
    setScrollContainer(sc);
    // console.log('hasNext', hasNext);

    return <></>;
  };
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [queryParmas, setQueryParams] = useState<any>({
    customTypesFilter: ['', 'private'],
    includeEmpty: true,
  });

  return (
    <Box
      w={'80%'}
      h={'700px'}
      // maxH={'700px'}
      // minH={'calc(100vh - 150px)'}
      // maxH={'450px'}
      bgColor={ColorWhite}
      boxShadow={'3px 6px 20px #0000000D'}
      overflow={'hidden'}
      position={'absolute'}
      top={90}
      borderRadius={'12px'}
      zIndex={99999}
    >
      {isClient && (
        <SendbirdProvider
          breakpoint={true}
          appId={'78B8D84A-E617-493C-98CA-2D15F647923B'}
          userId={getSendBirdToken().user_id}
          accessToken={getSendBirdToken().sendBird}
          theme="light"
          dateLocale={kr}
          colorSet={myColorSet}
          stringSet={stringSet}
        >
          <CustomConnectionHandler />
          <Flex flexDirection={'row'} h={'100%'} alignItems={'stretch'}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          >
            <GroupChannelList
              channelListQueryParams={queryParmas}
              renderHeader={(props) => (
                <GroupChannelListHeader
                  renderMiddle={() => (
                    <Flex alignItems={'center'} gap={'10px'}>
                      <Box
                        borderRadius={'50px'}
                        overflow={'hidden'}
                        w={'32px'}
                        h={'32px'}
                      >
                        <img
                          style={{
                            width: '32px',
                            height: '32px',
                            objectFit: 'cover',
                          }}
                          src={
                            partnerInfo.images !== undefined &&
                              partnerInfo.images.length > 0
                              ? getImagePath(
                                partnerInfo.images[0].thumbnailImagePath,
                              )
                              : '/images/header/icon_header_user.png'
                          }
                          alt="이미지 업로드"
                        />
                      </Box>

                      <Text
                        color={ColorBlack}
                        fontSize={'16px'}
                        fontWeight={500}
                      >
                        {partnerInfo.title}
                      </Text>
                    </Flex>
                  )}
                />
              )}
              onChannelSelect={(channel) => {
                console.log('채널 선택 이벤트 발생:', channel?.url);
                // 채널을 클릭한 경우에만 실행
                handleSetCurrentChannel(channel);
              }}
              onChannelCreated={() => {
                // console.log('2222');
              }}
            />

            <GroupChannel
              // ref={scrollRef}
              // scr
              channelUrl={currentChannelUrl}
              onBackClick={() => setCurrentChannelUrl('')}
              renderMessage={(props) => {
                const message = props.message;
                // console.log('message', message);
                if (message.isFileMessage()) {
                  return <CustomMessage {...props} onReact={() => { }} />;
                }
                if (message.isUserMessage() && message.parentMessageId > 0) {
                  return <CustomReMessage {...props} onReact={() => { }} />;
                }
                if (message.customType == 'carousel') {
                  return <CarouselMessage {...props} />;
                }
                return <Message {...props} />;
              }}
              renderMessageInput={() => (
                <MessageInputWrapper
                  renderFileUploadIcon={() => <CustomMessageInput />}
                ></MessageInputWrapper>
              )}
            />
          </Flex>
        </SendbirdProvider>
      )}
    </Box>
  );
}

export default ChatComponent;
