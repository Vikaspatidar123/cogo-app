import { Modal } from '@cogoport/components';

import EmptyState from '../../../../EmptyState';

import ChooseService from './ChooseService';
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

			<Modal.Header title="ADD NEW SERVICE" />
			<ChooseService
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

		</div>
	);
}

export default AddService;
