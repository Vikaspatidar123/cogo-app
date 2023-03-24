import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useHandleUpdateStage = ({ detail, refetch }) => {
	const {
		general: { scope },
	} = useSelector((state) => state);

	const [value, setValue] = useState(detail?.applicable_state || '');
	const [showPopover, setShowPopover] = useState(false);

	const updateCheckout = useRequest('post', false, scope)('/update_checkout');

	const handleUpdateStage = async (selectedValue) => {
		try {
			await updateCheckout.trigger({
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
		loading: updateCheckout.loading,
	};
};

export default useHandleUpdateStage;
