import { useState, useRef } from 'react';
import { isEmpty } from '@cogoport/front/utils';
import { toast } from '@cogoport/front/components/admin';
import getImperativeHandleValues from './utils/getImperativeHandleValues';

const useCargoAndLoadDetails = (props) => {
	const { onSave, onClose } = props;

	const [containerLoadSubType, setContainerLoadSubType] = useState('');

	const imperativeHandleRef = useRef({});

	const onClickSaveButton = async () => {
		const values = await getImperativeHandleValues({
			imperativeHandleRef,
		});

		if (isEmpty(values)) {
			return;
		}

		if (!isEmpty(values) && isEmpty(values.cargoDetails.cargo_value)) {
			toast.error('Enter Cargo Value');
			return;
		}

		onSave?.({ values });
		toast.success('Saved Successfully');
	};

	const onClickCloseButton = () => {
		const values = {};

		Object.entries(imperativeHandleRef.current).forEach(([key, refObj]) => {
			const { getValues } = refObj;

			values[key] = getValues();
		});

		onClose?.({ values });
	};

	return {
		containerLoadSubType,
		setContainerLoadSubType,
		imperativeHandleRef,
		onClickSaveButton,
		onClickCloseButton,
	};
};

export default useCargoAndLoadDetails;
