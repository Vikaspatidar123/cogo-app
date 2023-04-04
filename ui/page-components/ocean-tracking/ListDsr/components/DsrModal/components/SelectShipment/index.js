import { Checkbox, Toast, Table, Button, Placeholder } from '@cogoport/components';
import { useEffect, useMemo, useState } from 'react';

import useDsrToSubscription from '../../../../hooks/useDsrToSubscription';
import useFetchShipments from '../../../../hooks/useFetchShipment';
import useFetchSubscriptions from '../../../../hooks/useFetchSubscriptions';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

function SelectShipment({ setHeading, setStep, dsrId, pocName, pocId }) {
	const { loading, shipments } = useFetchShipments();
	const { loadingSubscriptions, subList } = useFetchSubscriptions(dsrId);
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

	const handleChange = (item) => {
		if (value.includes(item.id)) {
			const check = value.filter((x) => x !== item.id);
			setValue(check);
		} else {
			setValue((prv) => [...prv, item.id]);
		}
	};
	const onSubmit = async () => {
		if (!value) return Toast.error('No shipments selected');
		const data = await dsrToSubscription(value, dsrId, subList);
		if (data === false) return null;
		setStep((step) => step + 1);
		return null;
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
            (record.poc_details || []).filter(
            	(item) => item.user_type === 'SHIPPER',
            )[0]?.name
          }
					onChange={(e) => handleChange(record, e.target.checked)}
				/>
			),
		},
		{
			id       : 'consignee',
			Header   : () => 'Consignee',
			accessor : (record, index) => (record.poc_details || []).filter(
				(item) => item.user_type === 'CONSIGNEE',
			)[0]?.name,
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

	return (
		<form>
			<h4>Associated Shipments</h4>
			{loading && <Placeholder />}
			{!loading && associatedShipments.length > 0 ? (
				<div className={styles.table_card} style={{ marginBottom: 24 }}>
					<Table
						control={control}
						columns={columns}
						data={associatedShipments}
					/>
				</div>
			) : (
				<div>
					{!loading
						&& <p>Add shipments to show here</p>}
				</div>
			)}
			<h4>Other Shipments</h4>
			{loading && <Placeholder />}
			{!loading && otherShipments.length > 0 ? (
				<div className={styles.table_card}>
					<Table control={control} columns={columns} data={otherShipments} />
				</div>
			) : (
				<div>
					{!loading
						&& <p>No other shipments found</p>}
				</div>
			)}
			<div className={styles.footer}>
				<Button
					size="lg"
					variant="ghost"
					onClick={() => setStep((step) => step - 1)}
					themeType="secondary"
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
