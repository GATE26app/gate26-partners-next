export interface PaginationProps {
  currentPage: number;
  limit: number;
  total: number | any;
  pageRangeDisplayed?: number;
  onPageNumberClicked: (page: number) => void;
  onPreviousPageClicked: (page: number) => void;
  onNextPageClicked: (page: number) => void;
}
