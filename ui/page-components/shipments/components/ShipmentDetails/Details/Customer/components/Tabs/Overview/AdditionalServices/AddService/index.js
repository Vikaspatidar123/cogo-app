// import AddRate from '@cogo/bookings/AdditionalServices/components/AddRate';
// import EmptyState from '@cogo/bookings/commons/EmptyState';
// import getGeoConstants from '@cogo/globalization/constants/geo';

// import ChooseService from './ChooseService';
// import Header from './Header';
// import { Container } from './styles';
// import useList from './useList';
import { useState } from 'react';

import EmptyState from '../../../../EmptyState';

import ChooseService from './ChooseService';
import Header from './Header';
import useList from './hooks/useList';
import styles from './styles.module.css';

function AddService({
	shipment_data,
	services,
	isSeller,
	refetch = () => {},
	show = false,
	setShow = () => {},
}) {
	const [showAddRate, setAddRate] = useState(null);

	const shipment_id = shipment_data?.id;

	const { list, loading, setFilters, filters, serviceCountTotal } = useList({
		shipment_id,
		services,
		show,
		isSeller,
	});

	if (!list?.length && !loading) {
		<EmptyState />;
	}

	return (
		<div className={styles.container}>
			<Header />

			{!showAddRate ? (
				<ChooseService
					setAddRate={setAddRate}
					isSeller={isSeller}
					list={list}
					loading={loading}
					setFilters={setFilters}
					filters={filters}
					setShow={setShow}
					serviceCountTotal={serviceCountTotal}
					services={services}
					shipment_data={shipment_data}
					refetch={refetch}
				/>
			) : (
			// <AddRate
			// 	isSeller={isSeller}
			// 	item={showAddRate}
			// 	setAddRate={setAddRate}
			// 	setShow={setShow}
			// 	refetch={refetch}
			// />
				<div>addrate</div>
			)}
		</div>
	);
}

export default AddService;
