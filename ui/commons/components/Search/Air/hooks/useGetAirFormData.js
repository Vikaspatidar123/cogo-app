const useGetAirFormData = ({ airFormRef }) => {
	let formValues = {};

	Object.keys(airFormRef.current || []).forEach((element) => {
		formValues = {
			...formValues,
			[element]: airFormRef.current[element]?.handleSubmit().values || {},
		};
	});

	return formValues;
};

export default useGetAirFormData;
