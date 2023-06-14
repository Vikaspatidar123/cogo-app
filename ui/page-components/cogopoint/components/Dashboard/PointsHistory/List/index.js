import { Pagination, Placeholder } from "@cogoport/components";
import { isEmpty } from "@cogoport/utils";
import React from "react";

import Item from "./Item";
import MobileView from "./MobileView";
import RowData from "./RowData";
import styles from "./styles.module.css";

function List({
  dataList = {},
  config = [],
  handlePageChange = () => {},
  setSortFilter = () => {},
  sortFilter = {},
  loading = false,
}) {
  const rowData = dataList?.list || [];
  const getList = () =>
    (rowData || []).map((item) => {
      if (loading) {
        return (
          <div>
            {new Array(10).fill(1).map(() => (
              <div className={styles.skeleton_wrapper}>
                {new Array(config?.length).fill(1).map(() => (
                  <Placeholder width="280px" margin="5px" />
                ))}
              </div>
            ))}
          </div>
        );
      }
      return (
        <>
          <div className={styles.desktop} key={item.name}>
            <Item list={item} config={config} />
          </div>
          <div className={styles.mobile}>
            <MobileView item={item} config={config} />
          </div>
        </>
      );
    });
  return (
    <div>
      {rowData.length > 0 && (
        <div className={styles.pagination_container}>
          <Pagination
            style={{ justifyContent: "flex-end" }}
            type="compact"
            pageSize={5}
            totalItems={dataList?.total_count}
            currentPage={dataList?.page}
            onPageChange={(val) => handlePageChange(val)}
          />
        </div>
      )}
      <div className={styles.sub_page}>
        {isEmpty(rowData) ? (
          <div className={styles.container}>
            <img
              src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg"
              alt=""
              height="200"
            />
          </div>
        ) : (
          <>
            <RowData
              config={config}
              setSortFilter={setSortFilter}
              sortFilter={sortFilter}
            />
            <div>{getList()}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default List;
