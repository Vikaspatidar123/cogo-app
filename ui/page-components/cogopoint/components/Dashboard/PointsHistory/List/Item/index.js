import { Tags, cl } from "@cogoport/components";
import { IcMUp, IcMDown } from "@cogoport/icons-react";
import { startCase, format } from "@cogoport/utils";
import React from "react";

import styles from "./styles.module.css";

function Item({ list = {}, config = [] }) {
  const filterText = (key, value = "") => {
    if (key === "event") {
      const eventType = list?.event_type?.replace("_", " ") || "";
      const val = value?.replace("_", " ") || "";
      return `${startCase(val)}${eventType && ` - ${startCase(eventType)}`}`;
    }
    if (key === "points") {
      return (
        <div className={styles.point}>
          <div className="value">{value} </div>
          {list?.transaction_type === "credit" ? (
            <IcMUp fill="rgb(103, 198, 118)" />
          ) : (
            <IcMDown fill="rgb(203, 100, 100)" />
          )}
        </div>
      );
    }
    if (key === "point_status") {
      return <div>{value?.toUpperCase()}</div>;
    }
    if (key === "transaction_type") {
      return (
        <div
          className={cl`${styles.BackGround} ${
            value === "credit" ? styles.credit : styles.debit
          }`}
        >
          <Tags
            items={[
              {
                children: value.toUpperCase(),
                color:
                  list?.transaction_type === "credit"
                    ? "rgb(212, 237, 216)"
                    : "rgb(244, 182, 182)",
              },
            ]}
          />
        </div>
      );
    }
    if (key === "created_at") {
      return format(value, "dd LLL yyyy , h:mm a");
    }
    return value;
  };

  return (
    <div className={styles.item_container}>
      {config.map((item) => (
        <div
          style={{
            width: `${item.width}`,
          }}
        >
          <div className={styles.icon}>
            {item.icon ? item.icon : null}
            {filterText(item.key, list?.[item.key])}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Item;
