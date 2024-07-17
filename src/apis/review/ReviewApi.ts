import { AxiosInstance } from 'axios';

import instance from '@/apis/_axios/instance';

import { getToken } from '@/utils/localStorage/token';
import {
  ReviewCommentReqType,
  ReviewDetailDtoType,
  ReviewListDtoType,
  ReviewListParamsType,
} from './ReviewApi.type';

export class ReviewApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }
  //리뷰리스트
  getReviewList = async (
    request: ReviewListParamsType,
  ): Promise<ReviewListDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'GET',
      url: `/partner/reviews?pageNo=${request.pageNo + 1}&pageSize=${
        request.pageSize
      }${
        request.searchKeyword != ''
          ? '&searchType=' +
            request.searchType +
            '&searchKeyword=' +
            request.searchKeyword
          : ''
      }${request.reply != '' ? '&reply=' + request.reply : ''}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //리뷰상세
  getReviewDetail = async (reviewId: string): Promise<ReviewDetailDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'GET',
      url: `/partner/reviews/${reviewId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //리뷰 댓글 작성
  putReviewComment = async (
    req: ReviewCommentReqType,
  ): Promise<ReviewDetailDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'PUT',
      url: `/partner/reviews/${req.reviewId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.data,
    });
    return data;
  };

  //리뷰 댓글 삭제
  deleteReviewComment = async (
    reviewId: string,
  ): Promise<ReviewDetailDtoType> => {
    //type : code 또는 parentCode

    const { data } = await this.axios({
      method: 'DELETE',
      url: `/partner/reviews/${reviewId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
}

const reviewApi = new ReviewApi();

export default reviewApi;
