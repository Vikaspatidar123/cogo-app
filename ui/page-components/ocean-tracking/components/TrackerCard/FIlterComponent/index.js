import { Button } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';

import { Controls } from '../../../configuration/controls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import MultiselectController from '@/packages/forms/Controlled/MultiSelectController';

const POC_TYPES = { CONSIGNEE: 'CONSIGNEE', SHIPPER: 'SHIPPER' };

function FilterComponent({ trackers, setFilters, setShowFilters }) {
	const { watch, setValue, control } = useForm();

	const removeDuplicates = (list = [], key) => {
		const obj = {};
		list.forEach((item) => {
			obj[item[key]] = item;
		});
		return Object.values(obj);
	};

	const { filter_data = {} } = trackers ?? {};
	const {
		shipping_lines = {},
		poc_details = [],
		booked_with_cogoport = [],
	} = filter_data;

	const shippingLinesList = Object.keys(shipping_lines).map((key) => ({
		label : shipping_lines[key].short_name,
		value : key,
	}));

	const pocDetailsDuplicatedRemoved = removeDuplicates(
		poc_details,
		'saas_shipment_poc_id',
	);

	const shippersList = pocDetailsDuplicatedRemoved.filter(
		(item) => item.user_type === POC_TYPES.SHIPPER,
	).map((items) => ({
		label : items.name,
		value : items.saas_container_subscription_id,
	}));

	const consigneesList = pocDetailsDuplicatedRemoved.filter(
		(item) => item.user_type === POC_TYPES.CONSIGNEE,
	).map((items) => ({
		label : items.name,
		value : items.saas_container_subscription_id,
	}));

	// const bookWithCogoport = booked_with_cogoport.map((item) => (
	// 	{
	// 		label : item.id,
	// 		value : item,
	// 	}
	// ));

	const fields = Controls;

	const handleSetFilters = () => {
		setFilters(watch());
	};

	const handleClear = () => {
		setFilters({});
		setValue('shipping_line_id', null);
		setValue('shipper', null);
		setValue('consignee', null);
	};

	return (
		<div className={`${styles.container} 
		${(shippingLinesList.length === 0 && shippersList.length === 0
		&& consigneesList.length === 0) && styles.no_data}`}
		>
			{!(shippingLinesList.length === 0 && shippersList.length === 0 && consigneesList.length === 0) && (
				<div className={styles.header}>
					<div className={styles.text}>
						Filters
					</div>
					<div role="presentation" className={styles.cross} onClick={() => { setShowFilters(false); }}>
						<IcMCross />
					</div>
				</div>
			)}

			{shippingLinesList.length > 0 && (
				<div className={styles.label_selector_ctn}>
					<div className={styles.label}>
						{fields[0].label}
					</div>
					<div className={styles.selector}>
						<MultiselectController {...fields[0]} control={control} options={shippingLinesList} />
					</div>
				</div>
			)}
			{shippersList.length > 0 && (
				<div className={styles.label_selector_ctn}>
					<div className={styles.label}>
						{fields[1].label}
					</div>
					<div className={styles.selector}>
						<MultiselectController {...fields[1]} control={control} options={shippersList} />
					</div>
				</div>
			)}
			{consigneesList.length > 0 && (
				<div className={styles.label_selector_ctn}>
					<div className={styles.label}>
						{fields[2].label}
					</div>
					<div className={styles.selector}>
						<MultiselectController {...fields[2]} control={control} options={consigneesList} />
					</div>
				</div>
			)}
			{(shippingLinesList.length > 0 || shippersList.length > 0 || consigneesList.length > 0) && (
				<div className={styles.footer}>
					<Button
						size="md"
						themeType="tertiary"
						className={styles.botton}
						onClick={() => { handleClear(); }}
					>
						Clear All

					</Button>
					<Button size="md" themeType="accent" onClick={() => { handleSetFilters(); }}>Apply</Button>
				</div>
			)}
			{(shippingLinesList.length === 0 && shippersList.length === 0 && consigneesList.length === 0) && (
				<div className={styles.not_found}>
					No Filters Found
				</div>
			)}
		</div>
	);
}

export default FilterComponent;
