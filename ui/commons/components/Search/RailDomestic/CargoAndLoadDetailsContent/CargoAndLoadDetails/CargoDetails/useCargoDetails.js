import { useFormCogo } from '@cogoport/front/hooks';
import { useImperativeHandle, useEffect } from 'react';

import getControls from './utils/controls';
import getMutatedFields from './utils/getMutatedFields';
import imperativeHandle from './utils/imperativeHandle';

const useCargoDetails = (props, ref) => {
	const { formValues, onChangeContainerSubType } = props;

	const controls = getControls({ values: formValues });

	const formProps = useFormCogo(controls);
	const { fields, handleSubmit, getValues, watch } = formProps;

	const watchContainerLoadType = watch('container_load_type') || '';
	const watchContainerLoadSubType = watch('container_load_sub_type') || '';

	useEffect(() => {
		if (watchContainerLoadSubType) {
			onChangeContainerSubType?.(watchContainerLoadSubType);
		}
	}, [watchContainerLoadSubType]);

	const mutatedFields = getMutatedFields({
		fields,
		watchContainerLoadType,
	});

	useImperativeHandle(ref, () => {
		const { handleSubmit: handleSubmitImperativeHandle } = imperativeHandle;

		return {
			handleSubmit: () => handleSubmitImperativeHandle({
				formHandleSubmit: handleSubmit,
			}),
			getValues,
		};
	});

	return {
		controls,
		formProps: { ...formProps, fields: mutatedFields },
	};
};

export default useCargoDetails;
