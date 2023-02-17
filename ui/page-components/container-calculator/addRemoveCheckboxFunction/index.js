export const addRemoveCheckBoxFunction = ({
	addProductId,
	setaddProductId,
	checked,
	setChecked,
}) => {
	const addRemoveCheckBox = (info) => {
		const { id, value } = info || {};
		const ans = addProductId.includes(id);
		if (ans) {
			const addProduct1 = addProductId.filter((productId) => productId !== id);
			setaddProductId(addProduct1);
			const conf = Object.keys(checked) !== value;
			if (conf) setChecked({ ...checked, [value]: false });
		} else {
			setaddProductId((prev) => [...prev, id]);
			setChecked({ ...checked, [value]: true });
		}
	};
	return addRemoveCheckBox;
};
