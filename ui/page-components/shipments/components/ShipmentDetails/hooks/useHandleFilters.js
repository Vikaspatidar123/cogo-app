const useHandleFilters = ({
	tradePartiesHookSetters,
	tradePartyFilters,
	formRef,
}) => {
	const handleFilters = () => {
		formRef.current.setValue('trade_partner', '');
		tradePartiesHookSetters.setFilters({
			...tradePartyFilters,
			trade_partner: '',
		});
	};

	const handleDesnFilters = (filter) => {
		const newFilters = [];
		(formRef?.current?.filterProps?.designation || []).forEach((element) => {
			if (element !== filter) {
				newFilters.push(element);
			}
		});

		if (newFilters.length) {
			formRef.current.setValue('designation', [...newFilters]);
			tradePartiesHookSetters.setFilters({
				...tradePartyFilters,
				designation: [...newFilters],
			});
		} else {
			formRef.current.setValue('designation', '');
			tradePartiesHookSetters.setFilters({
				...tradePartyFilters,
				designation: [],
			});
		}
	};

	const handleLocationFilter = () => {
		formRef.current.setValue('origin_location_id', '');
		tradePartiesHookSetters.setFilters({
			...tradePartyFilters,
			origin_location_id: '',
		});
	};

	return {
		handleFilters,
		handleDesnFilters,
		handleLocationFilter,
	};
};

export default useHandleFilters;
