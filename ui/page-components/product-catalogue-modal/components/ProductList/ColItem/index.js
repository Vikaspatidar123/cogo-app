import { Radio, Checkbox } from '@cogoport/components';

import { listView } from '../../../configuration/listView';
import { tableFunction } from '../../../utils/function';
import styles from '../styles.module.css';

const checkBox = (rowItem, addProductId, setAddProductId, multiSelect) => {
	const { id } = rowItem || {};
	const addRemoveCheckBox = (ids) => {
		const ans = addProductId.includes(ids);
		if (ans) {
			if (multiSelect) {
				const checkId = addProductId.filter((x) => x !== ids);
				setAddProductId(checkId);
			} else {
				setAddProductId([]);
			}
		} else if (multiSelect) {
			setAddProductId((prv) => [...prv, ids]);
		} else {
			setAddProductId([ids]);
		}
	};

	return multiSelect ? (
		<Checkbox
			checked={addProductId.includes(id)}
			onChange={() => addRemoveCheckBox(id)}
		/>
	) : (
		<Radio
			checked={addProductId.includes(id)}
			onChange={() => addRemoveCheckBox(id)}
		/>
	);
};

const getData = ({
	list = {},
	rowItem = {},
	addProductId,
	setAddProductId,
	multiSelect,
}) => {
	if (list?.func) {
		if (list?.func === 'renderCheckbox') {
			return checkBox(rowItem, addProductId, setAddProductId, multiSelect);
		}
		return tableFunction[list?.func](list.key, rowItem);
	}
	return rowItem[list?.key];
};

const ColItem = ({
	rowItem = {},
	addProductId,
	setAddProductId,
	isCategory,
	multiSelect,
}) => (listView || []).map((list) => (
	<div
		key={list?.key}
		className={styles.col}
		style={{ width: `${!isCategory ? list?.width : list?.categoryWidth}` }}
	>
		{getData({
			list,
			rowItem,
			addProductId,
			setAddProductId,
			multiSelect,
		})}
	</div>
));

export default ColItem;
