import { useRouter } from 'next/router';
import React, { useState } from 'react';

import {
  CategoryResProps,
  GoodsAttributeListProps,
  GoodsBasicProps,
  GoodsItemProps,
  GoodsListItemImageProps,
  GoodsPoliciesListProps,
  GoodsSchedulesListProps,
  LocationResProps,
  OptionItemProps,
  optionInputsProps,
} from '@apis/goods/GoodsApi.type';

import BookingCheckComponent from '@components/Goods/_fragments/BookingCheckComponent';
import CancleComponent from '@components/Goods/_fragments/CancleComponent';
import CatagoryComponent from '@components/Goods/_fragments/CatagoryComponent';
import CountryComponent from '@components/Goods/_fragments/CountryComponent';
import DetailComponent from '@components/Goods/_fragments/DetailComponent';
import DivisionComponent from '@components/Goods/_fragments/DivisionComponent';
import EditorDetailComponent from '@components/Goods/_fragments/EditorDetailComponent';
import GoodNameComponent from '@components/Goods/_fragments/GoodNameComponent';
import ImageComponent from '@components/Goods/_fragments/ImageComponent';
import InfoComponent from '@components/Goods/_fragments/InfoComponent';
import OptionComponent from '@components/Goods/_fragments/Option/OptionComponent';
import PlanComponent from '@components/Goods/_fragments/PlanComponent';
import PriceComponent from '@components/Goods/_fragments/PriceComponent';

interface CategoryListProps {
  categoryId: number;
}
interface LocationListProps {
  locationId: number;
}

interface Props {
  CateGetList: CategoryResProps[];
  setCateGetList: React.Dispatch<React.SetStateAction<CategoryResProps[]>>;
  BasicInfo: GoodsBasicProps;
  setBasicInfo: React.Dispatch<React.SetStateAction<GoodsBasicProps>>;
  imageList: GoodsListItemImageProps[];
  setImageList: React.Dispatch<React.SetStateAction<GoodsListItemImageProps[]>>;
  categoryList: CategoryListProps[];
  setCategoryList: React.Dispatch<React.SetStateAction<CategoryListProps[]>>;
  locationList: LocationListProps[];
  setLocationList: React.Dispatch<React.SetStateAction<LocationListProps[]>>;
  attributeList: GoodsAttributeListProps[];
  setAttributeList: React.Dispatch<
    React.SetStateAction<GoodsAttributeListProps[]>
  >;
  planList: GoodsSchedulesListProps[];
  setPlanList: React.Dispatch<React.SetStateAction<GoodsSchedulesListProps[]>>;
  policyList: GoodsPoliciesListProps[];
  setPolicyList: React.Dispatch<React.SetStateAction<GoodsPoliciesListProps[]>>;
  locationGetList: LocationResProps[];
  setLocationGetList: React.Dispatch<React.SetStateAction<LocationResProps[]>>;
  // goodsItemList: GoodsItemProps[];
  // setGoodsItemList: React.Dispatch<React.SetStateAction<GoodsItemProps[]>>;
  optionList: OptionItemProps[];
  setOptionList: React.Dispatch<React.SetStateAction<OptionItemProps[]>>;
  optionInputList: optionInputsProps[];
  setOptionInputList: React.Dispatch<React.SetStateAction<optionInputsProps[]>>;
}
function GoodsModify({
  categoryList,
  setCategoryList,
  BasicInfo,
  setBasicInfo,
  imageList,
  setImageList,
  attributeList,
  setAttributeList,
  planList,
  setPlanList,
  CateGetList,
  setCateGetList,
  locationList,
  setLocationList,
  policyList,
  setPolicyList,
  locationGetList,
  setLocationGetList,
  optionList,
  setOptionList,
  optionInputList,
  setOptionInputList,
}: // locationGetList,
// setLocationGetList,
// goodsItemList,
// setGoodsItemList,
Props) {
  const router = useRouter();
  // const [categoryList, setCategoryList] = useState<CategoryListProps[]>([]);
  // const [locationList, setLocationList] = useState<LocationListProps[]>([]);
  return (
    <>
      <CatagoryComponent
        list={categoryList}
        setList={setCategoryList}
        // list={categoryList}
        // setList={setCategoryList}
        getList={CateGetList}
        setGetList={setCateGetList}
      />
      {(BasicInfo.type == 3 || BasicInfo.type == 2) && (
        <CountryComponent
          list={locationList}
          setList={setLocationList}
          // list={locationList}
          // setList={setLocationList}
          getList={locationGetList}
          setGetList={setLocationGetList}
        />
      )}

      <GoodNameComponent list={BasicInfo} setList={setBasicInfo} />
      <PriceComponent list={BasicInfo} setList={setBasicInfo} />
      <ImageComponent list={imageList} setList={setImageList} />
      {BasicInfo.type == 3 && (
        <DivisionComponent list={attributeList} setList={setAttributeList} />
      )}
      <InfoComponent list={BasicInfo} setList={setBasicInfo} />
      <DetailComponent list={BasicInfo} setList={setBasicInfo} />
      {BasicInfo.type == 3 && (
        <>
          <PlanComponent list={planList} setList={setPlanList} />
          <BookingCheckComponent list={BasicInfo} setList={setBasicInfo} />
          <CancleComponent list={policyList} setList={setPolicyList} />
        </>
      )}

      <EditorDetailComponent list={BasicInfo} setList={setBasicInfo} />
      <OptionComponent
        list={BasicInfo}
        setList={setBasicInfo}
        optionList={optionList}
        setOptionList={setOptionList}
        optionInputList={optionInputList}
        setOptionInputList={setOptionInputList}
      />
    </>
  );
}

export default GoodsModify;