import { Button, cl } from "@cogoport/components";
import { IcCCogoCoin, IcMArrowRight } from "@cogoport/icons-react";
import { isEmpty } from "@cogoport/utils";
import { useRouter } from "next/router";
import React from "react";

import styles1 from "../Points/styles.module.css";

import styles from "./styles.module.css";

function ListCards({ earnablesList = [] }) {
  const { push } = useRouter();
  const ticketSvg =
    "https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ticket.svg";
  return (
    <>
      {!isEmpty(earnablesList) && (
        <>
          <h3>How to Earn?</h3>
          <div className={cl`${styles.horizontal} ${styles.earn}`}>
            <div className={styles1.Line} />
          </div>
        </>
      )}
      <div className={styles.card}>
        {(earnablesList || []).map(
          ({ description = "", earnables = {}, redirect_url = "" }) =>
            description && (
              <div key={redirect_url} className={styles.content}>
                <div className={styles.heading}>
                  {description?.toUpperCase()}
                </div>
                <div className={styles.footer}>
                  <div className={styles.sub_card}>
                    <div className={styles.points}>
                      {earnables?.type === "points" && <IcCCogoCoin />}
                      <div className="value">{earnables?.value}</div>
                    </div>
                    <div className={styles.value}>
                      <img src={ticketSvg} alt="ticket icon" />
                    </div>
                  </div>
                  <div>
                    <Button
                      className="secondary sm button"
                      type="button"
                      onClick={() => {
                        push(`${redirect_url}`);
                      }}
                    >
                      Complete <IcMArrowRight />
                    </Button>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}

export default ListCards;
