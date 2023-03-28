import { useFormCogo } from '@cogoport/front/hooks';
import { useImperativeHandle } from 'react';

import getControls from './utils/controls';
import getMutatedFields from './utils/getMutatedFields';
import imperativeHandle from './utils/imperativeHandle';

const useRoutesSearch = (props, ref) => {
	const { importerExporterDetails, searchType, formValues } = props;

	const { id: importer_exporter_id } = importerExporterDetails || {};

	const controls = getControls({ values: formValues });
	const [originLocationControl, destinationLocationControl] = controls;

	const formProps = useFormCogo(controls);
	const { fields, handleSubmit } = formProps;

	const mutatedFields = getMutatedFields({
		fields,
		importer_exporter_id,
		searchType,
	});

	useImperativeHandle(ref, () => {
		const { handleSubmit: handleSubmitImperativeHandle } = imperativeHandle;

		return {
			handleSubmit: () => handleSubmitImperativeHandle({
				formHandleSubmit: handleSubmit,
			}),
		};
	});

	return {
		controls,
		originLocationControl,
		destinationLocationControl,
		formProps: {
			...formProps,
			fields: mutatedFields,
		},
	};
};

export default useRoutesSearch;
