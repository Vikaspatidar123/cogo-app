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
import { Modal, Toast } from '@cogoport/components';
import { Select } from '@cogoport/components';
import { Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import useAddCommodity from '../../../hooks/useAddCommodity';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
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
			// heading="Add Available Commodity"
			// showCrossIcon="false"
			// isOpen={isOpen}
			// overflow="visible"
			// width="60%"
		>
			<Modal.Header title="Setup detention / demurrage days" />
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
			{/* <Formik
				initialValues={{
					commodity_name:
						{
							label : filterCommodity[0]?.name,
							value : filterCommodity[0]?.id,
						} || '',
				}}
				onSubmit={onSubmit}
			>
				{({ handleSubmit, setFieldValue, resetForm }) => {
					formRef.current = { handleSubmit, setFieldValue, resetForm };
					return (
						<Form style={{ width: '100%' }}>
							<FormItem>
								<Field
									name="commodity_name"
									as={SelectStyled}
									onChange={(option) => {
										setFieldValue('commodity_name', option);
									}}
									placeholder="Please select a commodity"
									options={(commodity || []).map((item) => ({
										label    : item.name,
										value    : item.id,
										hsc_code : item.hsc_code,
									}))}
								/>
								<ErrorMessage
									component="p"
									className="error-message"
									name="commodity_name"
								/>
							</FormItem>
						</Form>
					);
				}}
			</Formik>
			<Flex justifyContent="flex-end" alignItems="center" marginTop="24px">
				<Button
					variant="ghost"
					size="lg"
					style={{ marginRight: 8 }}
					normalCase
					onClick={handleModal}
				>
					CANCEL
				</Button>
				<Button
					size="lg"
					variant="secondary"
					normalCase
					disabled={loading}
					onClick={onClick}
				>
					Save
				</Button>
			</Flex> */}
		</Modal>
	);
}

export default AddCommodityDetail;
