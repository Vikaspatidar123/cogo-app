import { useEffect, useState } from 'react';

const useEditColsPopOver = ({ colsList = [], serviceName, data = {}, fixedPoint }) => {
	const { setColumns = () => {}, reset } = data || {};

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

		const checked = newList.filter((x) => x?.isChecked || fixedPoint[x?.value])?.map((item) => item.value);

		setColumns((prev) => ({ ...prev, [serviceName]: checked }));
	};
	useEffect(() => {
		setInsideList([...colsList]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
