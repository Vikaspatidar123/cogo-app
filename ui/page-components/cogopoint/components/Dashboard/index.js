import React from "react";

import Points from "./Main/Points";
import PointsHistory from "./PointsHistory";
import styles from "./styles.module.css";

function CogoPoints() {
  return (
    <div className={styles.container}>
      <Points />
      <PointsHistory />
    </div>
  );
}

export default CogoPoints;
