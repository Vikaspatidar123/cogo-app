import { Modal, Toast, Select, Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import useAddCommodity from '../../../hooks/useAddCommodity';

import styles from './styles.module.css';

import { useRequest } from '@/packages/request';

function AddCommodityDetail({ isOpen, handleModal, trackerDetails, setTrackerDetails }) {
	const [commodity, setCommodity] = useState([]);
	const { onSubmit } = useAddCommodity({ trackerDetails, setTrackerDetails, handleModal });
	const [value, setValue] = useState();

	const [{ loading }, trigger] = useRequest({
		url    : 'list_hs_codes',
		method : 'get',
	}, { manual: true });

	const getCommodity = async () => {
		try {
			const res = await trigger({
				params: { page_limit: 2000 },
			});
			setCommodity(res?.data?.list);
		} catch (err) {
			Toast.error(err?.message || 'No commodity found');
		}
	};
	useEffect(() => {
		getCommodity();
	}, []);
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
