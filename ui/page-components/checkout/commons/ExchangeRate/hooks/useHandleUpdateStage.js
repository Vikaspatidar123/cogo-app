import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequest } from '@/packages/request';

const useHandleUpdateStage = ({ detail, refetch }) => {
	const [value, setValue] = useState(detail?.applicable_state || '');
	const [showPopover, setShowPopover] = useState(false);

	const [{ loading }, updateCheckout] = useRequest({
		url    : 'update_checkout',
		method : 'post',
	}, { manual: false });

	const handleUpdateStage = async (selectedValue) => {
		try {
			await updateCheckout({
				params: { applicable_state: selectedValue, id: detail?.id },
			});
			setShowPopover(false);
			setValue(selectedValue);
			Toast.success('updated succesfully');
			refetch();
		} catch (err) {
			console.log(err);
		}
	};

	return {
		handleUpdateStage,
		value,
		showPopover,
		setShowPopover,
		loading,
	};
};

export default useHandleUpdateStage;
