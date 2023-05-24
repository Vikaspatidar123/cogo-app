import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useImperativeHandle, useRef, useEffect } from 'react';

import CONSTANTS from './utils/constants';

const {
	MAXIMUM_FULL_RAKE_CONTAINER_COUNT,
	MAXIMUM_PIECE_MILE_CONTAINER_COUNT,
} = CONSTANTS;

const useCargoContainersDetails = (props, ref) => {
	const { formValuesList, containerLoadSubType } = props;

	const [showForm, setShowForm] = useState(() => !((formValuesList || []).length > 0));
	const [savedFormList, setSavedFormList] = useState(formValuesList || []);
	const [editFormId, setEditFormId] = useState('');

	const formContainerRef = useRef({});
	const formImperativeHandleRef = useRef({});

	useEffect(() => {
		if (showForm && editFormId && formContainerRef.current) {
			setTimeout(() => {
				formContainerRef.current.scrollIntoView({
					behavior : 'smooth',
					block    : 'center',
					inline   : 'nearest',
				});
			}, 500);
		}
	}, [showForm, editFormId]);

	const onClickCancelButton = () => {
		setShowForm(false);
		setEditFormId('');
	};

	const onSaveSuccess = ({ values }) => {
		let formList = [...(savedFormList || [])];

		if (editFormId) {
			const index = formList.findIndex((form) => form.id === editFormId);
			formList[index] = {
				...values,
				id: editFormId,
			};
		} else {
			formList = [...formList, { ...values, id: new Date().valueOf() }];
		}

		if (editFormId) {
			setEditFormId('');
		}

		setSavedFormList(formList);
		setShowForm(false);

		return formList;
	};

	const onClickListEditButton = ({ id }) => {
		setEditFormId(id);
		setShowForm(false);
	};

	const onClickListDeleteButton = ({ id }) => {
		setSavedFormList((previousState) => {
			if (editFormId === id) {
				setEditFormId('');
				setShowForm(false);
			}

			const newList = previousState.filter((item) => item.id !== id);

			Toast.success('Deleted Successfully');

			if (newList.length === 0) {
				setShowForm(true);
			}

			return newList;
		});
	};

	// calculated on basis of 20FT/22FT = 1, 44FT = (20FT/22FT) * 2
	const calculateTotalContainersCount = ({ values }) => savedFormList.reduce((total, item) => {
		const { id, container_size, container_count } = item;

		let count = +container_count || 0;

		if (id === editFormId && !isEmpty(values)) {
			count = +values.container_count || 0;
		}

		if (`${container_size}FT` === CONSTANTS['44FT']) {
			count *= 2;
		}

		return +((total || 0) + count);
	}, 0);

	const validateContainersCount = ({ values }) => {
		const totalContainerCounts = calculateTotalContainersCount({ values });

		if (containerLoadSubType !== 'full_rake') {
			if (totalContainerCounts > MAXIMUM_PIECE_MILE_CONTAINER_COUNT) {
				Toast.error('Total containers count should not  be greater than 1000');
			}

			return totalContainerCounts <= MAXIMUM_PIECE_MILE_CONTAINER_COUNT;
		}

		if (!MAXIMUM_FULL_RAKE_CONTAINER_COUNT.includes(totalContainerCounts)) {
			Toast.error('Total containers count should be equal to 80 or 90');
		}

		return MAXIMUM_FULL_RAKE_CONTAINER_COUNT.includes(totalContainerCounts);
	};

	useImperativeHandle(ref, () => ({
		handleSubmit: async () => {
			const isValidTotalContainersCount = validateContainersCount({});
			if (!isValidTotalContainersCount) {
				return {
					hasError : true,
					errors   : {},
				};
			}

			if (!showForm) {
				return {
					hasError : false,
					values   : savedFormList,
				};
			}

			const { handleSubmit } = formImperativeHandleRef.current;

			const response = await handleSubmit();
			const { hasError, values } = response;

			return {
				...response,
				...(!hasError && { values: onSaveSuccess({ values }) }),
			};
		},
		getValues: () => savedFormList,
	}));

	return {
		showForm,
		setShowForm,
		savedFormList,
		formContainerRef,
		formImperativeHandleRef,
		onClickCancelButton,
		onSaveSuccess,
		editFormId,
		onClickListEditButton,
		onClickListDeleteButton,
		calculateTotalContainersCount,
	};
};

export default useCargoContainersDetails;
