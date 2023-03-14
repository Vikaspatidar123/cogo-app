import { Radio } from '@cogoport/components';

import { listView } from '../../../configuration/listView';
import { tableFunction } from '../../../utils/function';
import styles from '../styles.module.css';

const checkBox = (rowItem, addProductId, setAddProductId) => {
	const { id } = rowItem || {};
	const addRemoveCheckBox = (ids) => {
		const ans = addProductId.includes(ids);
		if (ans) {
			setAddProductId([]);
		} else {
			setAddProductId([ids]);
		}
	};

	return (
		<Radio
			checked={addProductId.includes(id)}
			onChange={() => addRemoveCheckBox(id)}
		/>
	);
};

const getData = ({
	list = {}, rowItem = {}, addProductId, setAddProductId,
}) => {
	if (list?.func) {
		if (list?.func === 'renderCheckbox') {
			return checkBox(rowItem, addProductId, setAddProductId);
		}
		return tableFunction[list?.func](list.key, rowItem);
	}
	return rowItem[list?.key];
};

const ColItem = ({
	rowItem = {}, addProductId, setAddProductId, isCategory,
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
		})}
	</div>
));

export default ColItem;
