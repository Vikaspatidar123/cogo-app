const imperativeHandle = {
	onSubmit: (values) => {
		return {
			hasError: false,
			values,
		};
	},
	onError: (errors) => {
		return { hasError: true, errors };
	},
	handleSubmit: ({ formHandleSubmit }) => {
		const { onSubmit, onError } = imperativeHandle;

		return new Promise((resolve) => {
			formHandleSubmit(
				(values) => resolve(onSubmit(values)),
				(errors) => resolve(onError(errors)),
			)();
		});
	},
};

export default imperativeHandle;
