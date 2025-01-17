'use client';

import { useSearchParams } from 'next/navigation'; // `next/navigation`에서 제공하는 훅
import { useEffect, useState } from 'react';

const LogDetail = () => {
  const searchParams = useSearchParams();
  const cakelog_id = searchParams.get('cakelog_id'); // 쿼리 파라미터에서 cakelog_id 추출

  const [log, setLog] = useState(null);

  useEffect(() => {
    if (cakelog_id) {
      // cakelog_id가 존재하면 데이터를 가져옵니다.
      const fetchLogDetail = async () => {
        const response = await fetch(`/api/logs/${cakelog_id}`);
        const data = await response.json();
        setLog(data);
      };

      fetchLogDetail();
    }
  }, [cakelog_id]);

  if (!log) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h1>로그 상세</h1>
      {/* 여기서 log 데이터를 사용하여 렌더링 */}
    </div>
  );
};

export default LogDetail;
