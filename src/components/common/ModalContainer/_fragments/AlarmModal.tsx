import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  ModalContent,
  ModalHeader,
  ModalProps,
  Text,
} from '@chakra-ui/react';

import alarmApi from '@apis/alarm/AlarmApi';
import { usePatchAlarmMutation } from '@apis/alarm/AlarmApi.mutation';
import { useGetAlarmLitQuery } from '@apis/alarm/AlarmApi.query';
import { AlarmListDataType } from '@apis/alarm/AlarmApi.type';
import useIntersectionObserver from '@apis/useIntersectionObserver';

import styled from '@emotion/styled';
import {
  ColoLineGray,
  ColorBlack,
  ColorGray700,
  ColorGray900,
  ColorRed50,
  ColorWhite,
} from '@utils/_Palette';

interface Props extends Omit<ModalProps, 'children'> {
  onClose: () => void;
}

function AlarmModal({ onClose, ...props }: Props) {
  const [list, setList] = useState<AlarmListDataType[]>([]);
  const [obj, setObj] = useState({ pageNo: 1, pageSize: 10 });

  const {
    data: alarmListData,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetAlarmLitQuery(obj, { totalCount: list.length });

  useEffect(() => {
    if (alarmListData !== undefined) {
      if (
        alarmListData?.pages[Number(alarmListData?.pages.length) - 1].data
          .alarms.length > 0
      ) {
        setList((list) => [
          ...list,
          ...alarmListData?.pages[Number(alarmListData?.pages.length) - 1].data
            .alarms,
        ]);
      }
    }
  }, [alarmListData]);

  const isFetchingFirstPage = isFetching && !isFetchingNextPage;
  const fetchNextPageTarget = useIntersectionObserver(() => {
    if (list.length > 0) {
      setObj({ ...obj, pageNo: obj.pageNo + 1 });
      fetchNextPage();
    }
  });

  //알림 읽음처리
  const onClickAlarm = (item: number) => {
    ClickAlarmMutate(item);
  };
  const { mutate: ClickAlarmMutate, isLoading: isLoading } =
    usePatchAlarmMutation({
      options: {
        onSuccess: (res) => {
          if (res.success) {
            console.log('알림 클릭 res', res);
          } else {
          }
          // setDetailData(res);
          console.log('Mutation res.', res);
          console.log('Mutation data.', res.data);
        },
      },
    });
  return (
    <Box
      w={'357px'}
      // maxH={'450px'}
      bgColor={ColorWhite}
      boxShadow={'3px 6px 20px #0000000D'}
      overflow={'hidden'}
      position={'absolute'}
      top={90}
      borderRadius={'12px'}
      zIndex={99999}
    >
      <Flex
        py={'15px'}
        px={'20px'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Text color={ColorBlack} fontWeight={700} fontSize={'16px'}>
          알림내역
        </Text>
        <Image
          src={'/images/Page/ico_modal_close.png'}
          width={20}
          height={20}
          alt="모달 close"
          onClick={onClose}
        />
      </Flex>
      <Flex
        flexDirection={'column'}
        overflowY={'auto'}
        h={'450px'}
        zIndex={999999}
      >
        {list && list.length > 0 ? (
          list.map((item, index) => {
            return (
              <Flex
                key={index}
                flexDirection={'column'}
                p={'20px'}
                borderTopWidth={1}
                borderTopColor={ColoLineGray}
                bgColor={item.level == 2 ? ColorWhite : ColorRed50}
                onClick={() => onClickAlarm(item.alarmId)}
              >
                <Text
                  fontSize={'12px'}
                  fontWeight={400}
                  color={ColorGray900}
                  mb={'6px'}
                >
                  주문번호 {item.alarmId}
                </Text>
                <Text
                  fontSize={'15px'}
                  fontWeight={600}
                  color={ColorBlack}
                  pb={'10px'}
                >
                  신규 주문이 들어왔습니다. 예약확정이 필요합니다
                </Text>
                <Text color={ColorGray700} fontWeight={300} fontSize={'12px'}>
                  2024-04-30 00:00
                </Text>
              </Flex>
            );
          })
        ) : (
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection={'column'}
            h={'100%'}
          >
            <Image
              width={80}
              height={80}
              src={'/images/Page/no_data.png'}
              alt="데이터 없음"
            />
            <Text
              color={ColorBlack}
              fontWeight={500}
              fontSize={'15px'}
              mt={'10px'}
            >
              알림이 없습니다.
            </Text>
          </Flex>
        )}

        {/* <Flex
          flexDirection={'column'}
          p={'20px'}
          borderTopWidth={1}
          borderTopColor={ColoLineGray}
        >
          <Text
            fontSize={'12px'}
            fontWeight={400}
            color={ColorGray900}
            mb={'6px'}
          >
            주문번호 1234566789
          </Text>
          <Text
            fontSize={'15px'}
            fontWeight={600}
            color={ColorBlack}
            pb={'10px'}
          >
            신규 주문이 들어왔습니다. 예약확정이 필요합니다
          </Text>
          <Text color={ColorGray700} fontWeight={300} fontSize={'12px'}>
            2024-04-30 00:00
          </Text>
        </Flex>
        <Flex
          flexDirection={'column'}
          p={'20px'}
          borderTopWidth={1}
          borderTopColor={ColoLineGray}
        >
          <Text
            fontSize={'12px'}
            fontWeight={400}
            color={ColorGray900}
            mb={'6px'}
          >
            주문번호 1234566789
          </Text>
          <Text
            fontSize={'15px'}
            fontWeight={600}
            color={ColorBlack}
            pb={'10px'}
          >
            신규 주문이 들어왔습니다. 예약확정이 필요합니다
          </Text>
          <Text color={ColorGray700} fontWeight={300} fontSize={'12px'}>
            2024-04-30 00:00
          </Text>
        </Flex>
        <Flex
          flexDirection={'column'}
          p={'20px'}
          borderTopWidth={1}
          borderTopColor={ColoLineGray}
        >
          <Text
            fontSize={'12px'}
            fontWeight={400}
            color={ColorGray900}
            mb={'6px'}
          >
            주문번호 1234566789
          </Text>
          <Text
            fontSize={'15px'}
            fontWeight={600}
            color={ColorBlack}
            pb={'10px'}
          >
            신규 주문이 들어왔습니다. 예약확정이 필요합니다
          </Text>
          <Text color={ColorGray700} fontWeight={300} fontSize={'12px'}>
            2024-04-30 00:00
          </Text>
        </Flex>
        <Flex
          flexDirection={'column'}
          p={'20px'}
          borderTopWidth={1}
          borderTopColor={ColoLineGray}
        >
          <Text
            fontSize={'12px'}
            fontWeight={400}
            color={ColorGray900}
            mb={'6px'}
          >
            주문번호 1234566789
          </Text>
          <Text
            fontSize={'15px'}
            fontWeight={600}
            color={ColorBlack}
            pb={'10px'}
          >
            신규 주문이 들어왔습니다. 예약확정이 필요합니다
          </Text>
          <Text color={ColorGray700} fontWeight={300} fontSize={'12px'}>
            2024-04-30 00:00
          </Text>
        </Flex>
        <Flex
          flexDirection={'column'}
          p={'20px'}
          borderTopWidth={1}
          borderTopColor={ColoLineGray}
        >
          <Text
            fontSize={'12px'}
            fontWeight={400}
            color={ColorGray900}
            mb={'6px'}
          >
            주문번호 1234566789
          </Text>
          <Text
            fontSize={'15px'}
            fontWeight={600}
            color={ColorBlack}
            pb={'10px'}
          >
            신규 주문이 들어왔습니다. 예약확정이 필요합니다
          </Text>
          <Text color={ColorGray700} fontWeight={300} fontSize={'12px'}>
            2024-04-30 00:00
          </Text>
        </Flex> */}
        {hasNextPage && <Box ref={fetchNextPageTarget} />}
      </Flex>
    </Box>
  );
}

const Content = styled(ModalContent)`
  &.chakra-modal__content {
    padding: 30px 0px;
    border-radius: 10px;
    .chakra-modal {
      &__header {
        padding: 0px 30px;
        text-align: center;
        /* color: #ff5942; */
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        letter-spacing: -0.02em;
      }

      &__footer {
        padding: 0;
        display: flex;
        background-color: '#292A2E';
        /* justify-content: space-between; */
        .button {
          cursor: pointer;

          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: '10px';
          color: #292a2e;
          border: 1px solid '#292A2E';
          font-family: 'Pretendard';
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 27px;
          letter-spacing: -0.02em;
        }
      }
    }
  }
`;
const Header = styled(ModalHeader)``;
export default AlarmModal;
