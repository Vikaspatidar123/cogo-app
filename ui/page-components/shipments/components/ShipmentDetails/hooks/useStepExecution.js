import { useState } from 'react';

import getShowTaskFields from '../../../utils/getShowTaskFields';

import { useForm } from '@/packages/forms';

const injectForm = (config, formProps, formValues) => {
	const showElements = getShowTaskFields(config.controls, formValues);

	return {
		finalConfig: {
			...config,
			formProps: { ...formProps },
		},
		controls: config.controls,
		showElements,
	};
};

export const useStepExecuton = ({
	task,
	stepConfig,
	shipment_data,
}) => {
	const formProps = useForm({
		defaultValues: {
			documents: [
				{
					description : '',
					si_filed_at : '',
					url         : '',
				},

			],
		},
	});

	const formValues = formProps.watch();

	const { finalConfig, controls, showElements } = injectForm(
		stepConfig,
		formProps,
		task,
		shipment_data,
		formValues,
	);
	console.log(formValues, 'formValues');
	const groupSubHeadings = {};
	if (task.task === 'mark_confirmed') {
		(controls || []).forEach((obj) => {
			if (!Array.isArray(groupSubHeadings[obj.subHeading])) {
				groupSubHeadings[obj.subHeading] = [];
				groupSubHeadings[obj.subHeading].push(obj);
			} else {
				groupSubHeadings[obj.subHeading].push(obj);
			}
		});
	}

	const [error, setError] = useState({});

	const { control, handleSubmit } = finalConfig.formProps;
	const [isLoading, setIsLoading] = useState(false);

	const onError = (err) => {
		setError(err);
	};

	return {
		finalConfig,
		controls,
		showElements,
		error,
		setError,
		control,
		handleSubmit,
		isLoading,
		setIsLoading,
		onError,
		groupSubHeadings,
		formValues,
	};
};
