'use client';
import {
  ColorBlack,
  ColorGray100,
  ColorGray400,
  ColorGray50,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import React, { Suspense, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';
import { RequestPayResponse } from '../join/portone';
import {
  usePosFindPwtAuthCheckMutation,
  usePostFindPwAuthEmailCheckMutation,
  usePostFindPwAuthEmailMutation,
  usePostFindPwAuthKeyMutation,
} from '@/apis/join/JoinApi.mutation';
import FindPwComponent from '@/components/FIndPw/FindPwComponent';
function page() {
  return (
    <Suspense>
      <FindPwComponent />
    </Suspense>
  );
}

export default page;
