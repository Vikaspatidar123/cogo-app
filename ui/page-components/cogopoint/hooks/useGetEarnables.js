import { useCallback, useEffect } from "react";

import { useRequest } from "@/packages/request";
import { useSelector } from "@/packages/store";

const useGetEarnables = () => {
  const { profile } = useSelector((state) => state);
  const { cogopoint_id } = profile || {};
  const [{ loading, data }, trigger] = useRequest(
    {
      url: "/list_cogopoint_earnables",
      method: "get",
    },
    { manual: true }
  );
  const fetchEarnables = useCallback(() => {
    try {
      trigger({
        params: {
          platform: "app",
          cogopoint_user_id: cogopoint_id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, [cogopoint_id, trigger]);

  useEffect(() => {
    if (cogopoint_id) fetchEarnables();
  }, [cogopoint_id, fetchEarnables]);

  return { earnablesList: loading ? [] : data, earnablesLoading: loading };
};

export default useGetEarnables;
