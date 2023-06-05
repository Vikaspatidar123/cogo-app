import { Loader } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import FilterService from './FilterService';
import Price from './Price';
import ServicesList from './ServicesList';
import styles from './styles.module.css';
import tableFields from './tableFields';

function ChooseService({
	setAddRate = () => {},
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

	const ServiceOptions = (shipment_data?.services || []).map((service) => (
		{ label: startCase(service), value: service }));

	return (
		<>
			<FilterService
				setFilters={setFilters}
				filters={filters}
				uniqueServices={ServiceOptions}
			/>

			{loading ? (
				<div className={styles.loading}>
					<Loader themeType="primary" style={{ width: '80px' }} />
				</div>
			) : (
				<ServicesList fields={fields} data={list} loading={loading} />
			)}
		</>
	);
}

export default ChooseService;
