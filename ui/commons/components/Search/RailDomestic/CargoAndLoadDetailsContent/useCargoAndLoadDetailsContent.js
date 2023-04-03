import { isEmpty } from '@cogoport/front/utils';
import { useState, useImperativeHandle } from 'react';

const useCargoAndLoadDetailsContent = (props, ref) => {
	const { formValues } = props;

	const [showModal, setShowModal] = useState(false);
	const [savedData, setSavedData] = useState(() => formValues || null);
	const [draftData, setDraftData] = useState(null);

	const onSave = ({ values }) => {
		setDraftData(null);
		setSavedData(values);
		setShowModal(false);
	};

	const onClose = ({ values }) => {
		setDraftData(values);
		setShowModal(false);
	};

	useImperativeHandle(ref, () => ({
		handleSubmit: () => new Promise((resolve) => {
			if (isEmpty(savedData)) {
				resolve({
					hasError : true,
					errors   : {},
				});
			}

			resolve({
				hasError : false,
				values   : savedData,
			});
		}),
	}));

	return {
		showModal,
		setShowModal,
		draftData,
		savedData,
		onSave,
		onClose,
	};
};

export default useCargoAndLoadDetailsContent;
