// import { startCase } from '@cogoport/front/utils';
// import React from 'react';

// import FilterService from './FilterServices';
// import Price from './Price';
// import ServicesList from './ServicesList';
// import { Loading } from './styles';
// import tableFields from './tableFields';

function ChooseService({
	setAddRate,
	isSeller,
	list,
	loading,
	setFilters,
	filters,
	setShow = () => {},
	refetch = () => {},
	serviceCountTotal,
	shipment_data,
}) {
	const priceRequest = (item) => (
		<Price
			item={item}
			setAddRate={setAddRate}
			isSeller={isSeller}
			setShow={setShow}
			refetch={refetch}
		/>
	);

	const countObj = { listCount: list.length, total: serviceCountTotal };

	const fields = tableFields(priceRequest, countObj);

	const ServiceOptions = (shipment_data?.services || []).map((service) => ({ label: startCase(service), value: service }));

	return (
		<>
			<FilterService
				setFilters={setFilters}
				filters={filters}
				uniqueServices={ServiceOptions}
			/>

			{loading ? (
				<Loading>
					Loading
					<span>.</span>
					<span>.</span>
					<span>.</span>
				</Loading>
			) : (
				<ServicesList fields={fields} data={list} loading={loading} />
			)}
		</>
	);
}

export default ChooseService;
