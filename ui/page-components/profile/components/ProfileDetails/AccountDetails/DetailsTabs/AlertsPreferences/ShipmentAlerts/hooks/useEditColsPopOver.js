import { useEffect, useState } from 'react';

const useEditColsPopOver = ({ colsList = [], props, serviceName }) => {
	const { setColumns, reset } = props || {};
	const [show, setShow] = useState(false);
	const [insideList, setInsideList] = useState([...colsList]);
	const onSelect = (idx) => {
		const newList = [...insideList];
		if (!newList[idx].isChecked) {
			newList[idx].isChecked = true;
			setInsideList(newList);
		} else {
			newList[idx].isChecked = false;
			setInsideList(newList);
		}

		const checked = newList.filter((x) => x.isChecked).map((item) => item.value);

		setColumns((prev) => ({ ...prev, [serviceName]: checked }));
	};
	useEffect(() => {
		setInsideList([...colsList]);
	}, [reset]);

	return {
		show,
		setShow,
		insideList,
		setInsideList,
		onSelect,
	};
};

export default useEditColsPopOver;
