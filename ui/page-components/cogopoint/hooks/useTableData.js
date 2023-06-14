import { Toast } from "@cogoport/components";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useRequest } from "@/packages/request";

function useTableData({ activeTab }) {
  const { profile } = useSelector((state) => state);
  const { cogopoint_id } = profile || {};
  const [page, setPage] = useState(1);
  const [globalFilters, setGlobalFilters] = useState({});
  const [sortFilter, setSortFilter] = useState({
    sort_by: "created_at",
    sort_type: "desc",
  });

  const [{ loading, data: dataList }, uplod] = useRequest(
    {
      url: "/list_cogopoint_ledgers",
      method: "get",
    },
    { manual: true }
  );

  const handlePageChange = (val) => {
    setPage(val);
  };

  const updateOrgSearchHistory = useCallback(async () => {
    try {
      await uplod({
        params: {
          filters: {
            cogopoint_user_id: cogopoint_id,
            transaction_type: globalFilters?.transaction_type,
            status: activeTab?.toLowerCase(),
          },
          ...sortFilter,
          page,
        },
      });
    } catch (err) {
      Toast.error(err?.message);
    }
  }, [
    activeTab,
    cogopoint_id,
    globalFilters?.transaction_type,
    page,
    sortFilter,
    uplod,
  ]);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  useEffect(() => {
    if (cogopoint_id) {
      updateOrgSearchHistory();
    }
  }, [updateOrgSearchHistory, cogopoint_id]);

  return {
    loading,
    updateOrgSearchHistory,
    dataList,
    handlePageChange,
    setSortFilter,
    sortFilter,
    setGlobalFilters,
    globalFilters,
  };
}
export default useTableData;
