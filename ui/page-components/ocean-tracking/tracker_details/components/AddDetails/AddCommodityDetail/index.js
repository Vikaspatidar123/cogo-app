// import { Flex } from '@cogoport/front/components';
// import { Formik, Field, ErrorMessage, Form } from 'formik';
// import React, { useState, useRef, useEffect } from 'react';
// import { toast } from 'react-toastify';

// import { useSaasState } from '../../../../common/context';
// import IconCommodity from '../../../../common/icons/commodity.svg';
// import Button from '../../../../common/ui/Button';
// import FormItem from '../../../../common/ui/FormItem';
// import Modal from '../../../../common/ui/Modal';
// import request from '../../../../common/utils/request';

// import { SelectStyled, Details } from './styles';
import { Modal, Toast, Select, Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import useAddCommodity from '../../../hooks/useAddCommodity';

import styles from './styles.module.css';

// import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';

function AddCommodityDetail({ isOpen, handleModal, trackerDetails, setTrackerDetails }) {
	// const formRef = useRef(null);
	// const [loading, setLoading] = useState(false);
	const [commodity, setCommodity] = useState([]);
	// const { trackerDetails, setTrackerDetails, general } = useSaasState();
	// const { scope } = general;
	const { onSubmit } = useAddCommodity({ trackerDetails, setTrackerDetails, handleModal });

	const { shipment_info } = trackerDetails || [];
	const commodity_label = shipment_info?.commodity;
	const [value, setValue] = useState();

	// const onClick = () => {
	// 	formRef?.current?.handleSubmit?.();
	// };
	const [{ loading }, trigger] = useRequest({
		url    : 'list_hs_codes',
		method : 'get',
	}, { manual: true });

	const getCommodity = async () => {
		// setLoading(true);

		try {
			const res = await trigger({
				params: { page_limit: 2000 },
			});
			setCommodity(res?.data?.list);
		} catch (err) {
			Toast.error(err?.message || 'No commodity found');
		}
		// setLoading(false);
	};
	useEffect(() => {
		getCommodity();
	}, []);

	if (commodity.length === 0) return null;
	// const {
	// 	control,
	// 	handleSubmit,
	// 	formState: { errors },
	// } = useForm();

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
				<div className={styles.icon}>
					{/* <IconCommodity size={8} /> */}
				</div>
				<div className={styles.list}>
					<Select
						value={value?.value}
						onChange={(e, v) => {
							setValue(v);
						}}
				// onChange={(option) => {
				// 	setValue('commodity_name', option);
				// }}
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
					<Button onClick={handleModal}>Cancel</Button>
					<Button onClick={() => onSubmit(value)}>Save</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default AddCommodityDetail;
