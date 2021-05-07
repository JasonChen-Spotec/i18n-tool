import React from 'react';
import PaginationTotalNode from '@/shared/components/PaginationTotalNode';

const getPaginationProps = (pageInfo = {}, large, small) => ({
  current: pageInfo.pageNum,
  pageSize: pageInfo.pageSize || 10,
  showTotal: total => large && <PaginationTotalNode total={total} />,
  total: pageInfo.total,
  showSizeChanger: !small
});

export default getPaginationProps;
