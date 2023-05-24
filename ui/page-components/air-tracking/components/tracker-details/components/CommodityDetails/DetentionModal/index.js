import { Modal, Select, Button } from '@cogoport/components';
import { useState } from 'react';

import useAddCommodity from '../../../hooks/useAddCommodity';
import useHsCode from '../../../hooks/useHsCode';

import styles from './styles.module.css';

function AddCommodityDetail({ isOpen, handleModal, trackerDetails, setTrackerDetails, fetchTrackerDetails }) {
	const { onSubmit, loading } = useAddCommodity({
		trackerDetails,
		setTrackerDetails,
		handleModal,
		fetchTrackerDetails,
	});
	const [value, setValue] = useState();
	const { commodity } = useHsCode();

	const { commodity_details } = trackerDetails || [];
	const commodity_label = commodity_details?.commodity;

	const filterCommodity = commodity?.filter((items) => items.name === commodity_label);
	return (
		<Modal
			show={isOpen}
			onClose={handleModal}
			placement="center"
		>
			<Modal.Header title="Add Available Commodity" />
			<Modal.Body>
				<div className={styles.detail}>
					<p>Add commodity and get automatic updates about the status of your shipments.</p>
				</div>
				<div className={styles.list}>
					<Select
						key={filterCommodity?.[0]?.id}
						className={styles.input}
						value={value?.value || filterCommodity?.[0]?.id}
						onChange={(e, v) => {
							setValue(v);
						}}
						placeholder="Select Commodity"
						options={(commodity || []).map((item) => ({
							label   : item.name,
							value   : item.id,
							hs_code : item.hs_code,
						}))}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button}>
					<Button themeType="secondary" onClick={handleModal}>Cancel</Button>
					<Button onClick={() => onSubmit(value)} loading={loading}>Save</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default AddCommodityDetail;
