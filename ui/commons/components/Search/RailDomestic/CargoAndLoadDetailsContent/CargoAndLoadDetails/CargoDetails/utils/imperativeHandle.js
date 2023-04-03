const imperativeHandle = {
	onSubmit: (values) => ({
		hasError: false,
		values,
	}),
	onError      : (errors) => ({ hasError: true, errors }),
	handleSubmit : ({ formHandleSubmit }) => {
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
