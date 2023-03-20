// import { Flex, Text } from '@cogoport/front/components';
// import { Formik, Field, ErrorMessage, Form } from 'formik';
// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import Skeleton from 'react-loading-skeleton';
// import { toast } from 'react-toastify';
// import * as Yup from 'yup';

// import { FormItem, Radio, Button, Checkbox, Card } from '../../../../../../common/ui';
// import Table from '../../../../../../common/ui/Table';
// import useDsrToSubscription from '../../../../hooks/useCreateDsrToSubscription';
// import useFetchSubscriptions from '../../../../hooks/useFetchDsrToSubscription';
// import useFetchShipments from '../../../../hooks/useFetchShipments';

// import { TableCard } from './styles';
import { Checkbox } from '@cogoport/components';
import { Placeholder, Toast } from '@cogoport/components';
import { Table } from '@cogoport/components';
import { Button } from '@cogoport/components';
import { useEffect, useMemo, useState } from 'react';

import useDsrToSubscription from '../../../../hooks/useDsrToSubscription';
import useFetchShipments from '../../../../hooks/useFetchShipment';
import useFetchSubscriptions from '../../../../hooks/useFetchSubscriptions';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

function SelectShipment({ setHeading, setStep, type, dsrId, pocName, pocId }) {
	// const formRef = useRef(null);
	const [loadingShipments, shipments] = useFetchShipments();
	const [loadingSubscriptions, subList] = useFetchSubscriptions(dsrId);
	const { submitLoading, dsrToSubscription } = useDsrToSubscription();
	const [value, setValue] = useState([]);

	useEffect(() => {
		setHeading(`Status report for ${pocName}`);
	}, []);

	const associatedShipments = useMemo(
		() => shipments.filter((item) => (item.poc_details || []).some((pocItem) => pocItem.id === pocId)),
		[shipments],
	);

	const otherShipments = useMemo(
		() => shipments.filter(
			(item) => !associatedShipments.some((item2) => item2.id === item.id),
		),
		[shipments, associatedShipments],
	);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleChange = (item, e) => {
		if (value.includes(item.id)) {
			const check = value.filter((x) => x !== item.id);
			console.log(check, 'check');
			setValue(check);
		} else {
			setValue((prv) => [...prv, item.id]);
		}

		// if (ispresent) value.filter((element) => element !== item.id);
		// else setValue(item?.id);
	};
	console.log(value, 'info');
	const onSubmit = async () => {
		const { shipment } = value;
		console.log(value, 'shipment');
		if (!value) return Toast.error('No shipments selected');
		const data = await dsrToSubscription(value, dsrId, subList);
		if (data === false) return;
		setStep((step) => step + 1);
	};

	const columns = [
		{
			id       : 'shipper',
			Header   : () => 'Shipper',
			accessor : (record, index) => (
				<Checkbox
					name="shipments"
					id={record.id}
					value={record.id}
					label={
						(record.poc_details || []).filter((item) => item.user_type === 'SHIPPER')[0]
							?.name
					}
					onChange={(e) => handleChange(record, e.target.checked)}
				/>
			),
		},
		{
			id       : 'consignee',
			Header   : () => 'Consignee',
			accessor : (record, index) => (record.poc_details || []).filter((item) => item.user_type === 'CONSIGNEE')[0]
				?.name,
		},
		{
			id       : 'port_pair',
			Header   : () => 'Port Pair',
			accessor : (record, index) => {
				let str = '';
				const { itinerary } = record;
				str += itinerary?.origin || 'Origin';
				str += ' > ';
				str += itinerary?.destination || 'Destination';
				return <div style={{ maxWidth: 200 }}>{str}</div>;
			},
		},
		{
			id       : 'booking_number',
			Header   : () => 'Booking Number',
			accessor : (record, index) => record.input,
		},
	];

	// if (loadingShipments || loadingSubscriptions) {
	// 	return <Placeholder />;
	// }

	return (
		<form>
			<h4>
				Associated Shipments
			</h4>
			{associatedShipments.length > 0 ? (
				<div className={styles.table_card} style={{ marginBottom: 24 }}>
					<Table control={control} columns={columns} data={associatedShipments} />
				</div>
			) : (
				<p>Add shipments to show here</p>
			)}
			<h4>
				Other Shipments
			</h4>
			{otherShipments.length > 0 ? (
				<div className={styles.table_card}>
					<Table control={control} columns={columns} data={otherShipments} />
				</div>
			) : (
				<p>No other shipments found</p>
			)}
			{/* <FormItem>
				<ErrorMessage className="error-message" component="p" name="shipments" />
			</FormItem> */}
			<div className={styles.footer}>
				<Button
					size="lg"
					variant="ghost"
					onClick={() => setStep((step) => step - 1)}
				>
					Back
				</Button>
				<Button
					size="lg"
					variant="secondary"
					disabled={submitLoading}
					onClick={handleSubmit(onSubmit)}
				>
					Next
				</Button>
			</div>
		</form>

	);
}

export default SelectShipment;
