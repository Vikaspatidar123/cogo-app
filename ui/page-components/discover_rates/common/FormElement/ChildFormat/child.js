import { IcMDelete } from "@cogoport/icons-react";
import React from "react";

import Item from "../Item";

import styles from "./styles.module.css";

function Child({
  controls,
  control,
  register,
  field,
  index,
  name,
  remove,
  error,
  showElements = {},
  showLastDivider,
  showDivider,
  deletePosition,
  formValues,
  disabled = false,
  showDeleteAlways = false,
  noDeleteButtonTill = 1,
}) {
  const formValueIndex = formValues?.[index] || {};
  const renderDelete = () => (
    <IcMDelete
      onClick={() => remove(index, 1)}
      style={{
        display: "flex",
        marginLeft: "auto",
        marginBottom: "10px",
        width: "1.5em",
        height: "1.5em",
        cursor: "pointer",
      }}
    />
  );
  return (
    <div className={`form-fieldArray-${name}-${index}`} key={field.id}>
      <div className={styles.row}>
        {(deletePosition === "front" && renderDelete()) || null}
        {controls.map((controlItem) => {
          const { span = 6, watch = true } = controlItem;
          const show =
            !(controlItem.name in showElements) ||
            showElements[controlItem.name];
          const extraProps = {};
          if (controlItem.options) {
            if (Array.isArray(controlItem.options)) {
              extraProps.options = controlItem.options;
            } else {
              extraProps.options = controlItem.options[index];
            }
          }

          if (Array.isArray(controlItem.itemsDisabled)) {
            const newControlItem = controlItem;
            newControlItem.disabled = controlItem.itemsDisabled[index];
          }

          if (watch) {
            return show ? (
              <div className={styles.col} style={{ padding: "0px 6px" }}>
                <Item
                  {...controlItem}
                  {...extraProps}
                  key={`${name}.${index}.${controlItem.name}`}
                  itemKey={`${name}.${index}.${controlItem.name}`}
                  control={control}
                  name={`${name}.${index}.${controlItem.name}`}
                  value={field[controlItem.name]}
                  error={error?.[controlItem.name]}
                  formValue={formValueIndex[controlItem.name]}
                  disabled={controlItem.disabled || disabled}
                />
              </div>
            ) : null;
          }

          {
            return show ? (
              <div className={styles.col} style={{ padding: "0px 6px" }}>
                <Item
                  {...controlItem}
                  {...extraProps}
                  key={`${name}.${index}.${controlItem.name}`}
                  {...register(`${name}.${index}.${controlItem.name}`, {
                    ...(controlItem.rules || {}),
                  })}
                  defaultValue={field[controlItem.name]}
                  error={error?.[controlItem.name]}
                  formValue={formValueIndex[controlItem.name]}
                  disabled={disabled}
                />
              </div>
            ) : null;
          }
        })}
        {showDeleteAlways ||
        (index >= noDeleteButtonTill &&
          index !== 0 &&
          deletePosition !== "front")
          ? renderDelete()
          : null}
      </div>

      {showLastDivider && showDivider && deletePosition !== "front" && (
        <div className={styles.divider} />
      )}
    </div>
  );
}
export default Child;
