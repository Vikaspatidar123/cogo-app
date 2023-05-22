import { Modal, Select, Button } from '@cogoport/components';
import { useState } from 'react';

import useAddCommodity from '../../../hooks/useAddCommodity';
import useHsCode from '../../../hooks/useHsCode';

import styles from './styles.module.css';

function AddCommodityDetail({ isOpen, handleModal, trackerDetails, setTrackerDetails }) {
	const { onSubmit } = useAddCommodity({ trackerDetails, setTrackerDetails, handleModal });
	const [value, setValue] = useState();
	const { commodity } = useHsCode();

	return (
		<Modal
			show={isOpen}
			onClose={() => handleModal()}
			placement="center"
		>
			<Modal.Header title="Add Available Commodity" />
			<Modal.Body>
				<div className={styles.detail}>
					<p>Add commodity and get automatic updates about the status of your shipments.</p>
				</div>
				<div className={styles.icon} />
				<div className={styles.list}>
					<Select
						value={value?.value}
						onChange={(e, v) => {
							setValue(v);
						}}
						placeholder="Select Commodity"
						options={(commodity || []).map((item) => ({
							label    : item.name,
							value    : item.id,
							hsc_code : item.hsc_code,
						}))}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button}>
					<Button onClick={handleModal} themeType="secondary">Cancel</Button>
					<Button onClick={() => onSubmit(value)}>Save</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default AddCommodityDetail;
