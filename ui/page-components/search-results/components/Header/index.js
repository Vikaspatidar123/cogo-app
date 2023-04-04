import React from "react";

import Filter from "./Filter";
import Sort from "./Sort";

function Header({
  search_type = "",
  setSort = () => {},
  sortBy = "",
  setFilters,
  state = {},
}) {
  return (
    <div style={{ display: "flex" }}>
      {search_type === "fcl_freight" && (
        <Filter setFilters={setFilters} state={state} />
      )}
      <Sort search_type={search_type} setSort={setSort} sortBy={sortBy} />
    </div>
  );
}

export default Header;
