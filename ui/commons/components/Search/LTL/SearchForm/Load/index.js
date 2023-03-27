import { Popover } from "@cogoport/components";
import React, { useState, forwardRef, useEffect } from "react";

import AddCargo from "./AddCargo";
import ShowCargoInfo from "./ShowCargoInfo";
import styles from "./styles.module.css";

function Load(props, ref) {
  const { searchData = {}, error } = props;
  const { detail = {} } = searchData || {};
  const { service_details = {} } = detail || {};

  const [showPopover, setShowPopover] = useState(false);

  const [loadData, setLoadData] = useState(() => ({
    sub_active_tab: "per_package",

    per_package_details: {
      packages: [
        {
          packing_type: "pallet",
          packages_count: 1,
          package_weight: 1,
          dimensions: {
            length: 1,
            width: 1,
            height: 1,
          },
          handling_type: "stackable",
        },
      ],
    },
  }));

  const { packages, volume } =
    (Object.values(service_details) || [])?.[0] || {};

  useEffect(() => {
    if (Object.keys(detail).length > 0) {
      if (detail?.load_selection_type === "cargo_gross") {
        const grossPrefill = (packages || []).map((package_data) => ({
          ...package_data,
          volume,
        }))[0];

        setLoadData({
          gross_details: grossPrefill,
          sub_active_tab: "gross",
        });
      } else if (detail?.load_selection_type === "cargo_per_package") {
        setLoadData({
          per_package_details: packages,
          sub_active_tab: "per_package",
        });
      }
    }
  }, [searchData]);

  const content = () => (
    <div className={styles.main}>
      <AddCargo
        setLoadData={setLoadData}
        setShowPopover={setShowPopover}
        ref={ref}
        loadData={loadData}
      />
    </div>
  );

  const renderPopoverContent = () => (
    <ShowCargoInfo
      loadData={loadData}
      setShowPopover={setShowPopover}
      showPopover={showPopover}
    />
  );

  return (
    <div className={styles.container}>
      <div className={styles.label}>Load</div>

      <Popover
        animation="shift-away"
        render={content()}
        onClickOutside={() => setShowPopover(false)}
        interactive
        visible={showPopover}
        placement="bottom"
      >
        <div>
          {renderPopoverContent()}
          {error ? (
            <div className={styles.error_msg}>Loads are required</div>
          ) : null}
        </div>
      </Popover>
    </div>
  );
}

export default forwardRef(Load);
