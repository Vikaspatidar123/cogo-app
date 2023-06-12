import { Chips, Button, cl, MultiSelect } from '@cogoport/components';
import { useMemo, useState } from 'react';

import getOperatorOptions from '../../../../utils/getOperatorOptions';

import styles from './styles.module.css';

const TITLE = {
	ocean : 'Shipping Line',
	air   : 'Cargo Carrier',
};

const BOOKED_WITH_COGO = [
	{
		key      : '1',
		children : 'Booked With Cogoport',
	},

];

const removeDuplicatePoc = (list = []) => {
	const obj = {};
	(list || []).forEach((ele) => {
		obj[ele?.saas_shipment_poc_id] = ele;
	});
	return Object.values(obj);
};

const getPocControls = (list) => list.map((item) => ({
	key      : item?.saas_container_subscription_id,
	children : item?.name,
}));

const getSelectOpt = (list) => list.map((item) => ({
	label : item?.short_name,
	value : item?.id,
}));

function FilterContent({ filterData = {}, activeTab, setGlobalFilter }) {
	const [filter, setFilter] = useState({
		operatorId         : [],
		shipper            : [],
		consignee          : [],
		bookedWithCogoport : '',
	});
	const { shipping_lines = {}, poc_details = [], booked_with_cogoport = [], air_lines = {} } = filterData || {};
	const operatorList = getOperatorOptions({ operatorHash: shipping_lines || air_lines });

	const { shippersList, consigneesList } = useMemo(() => {
		const uniquePoc = removeDuplicatePoc(poc_details);

		const { shipperList, consigneeList } = uniquePoc.reduce((result, curr) => {
			if (curr.user_type === 'SHIPPER') {
				result.shipperList.push(curr);
			} else if (curr.user_type === 'CONSIGNEE') {
				result.consigneeList.push(curr);
			}
			return result;
		}, { shipperList: [], consigneeList: [] });

		return { shippersList: shipperList, consigneesList: consigneeList };
	}, [poc_details]);

	const clearHandler = () => {
		setFilter({
			operatorId         : [],
			bookedWithCogoport : false,
		});
	};

	const submitHandler = () => {
		setGlobalFilter((prev) => ({
			...prev,
			...filter,
		}));
	};

	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${styles.header}`}>
				<h3>Filters</h3>
				<div className={styles.flex_box}>
					<Button themeType="linkUi" onClick={clearHandler}>Clear</Button>
					<Button themeType="accent" size="sm">Apply</Button>
				</div>
			</div>

			<div className={styles.filter_section}>
				<p className={styles.title}>{TITLE?.[activeTab]}</p>
				<div className={styles.chips_container}>
					<MultiSelect
						value={filter.operatorId}
						size="sm"
						onChange={(e) => {
							setFilter((prev) => ({
								...prev,
								operatorId: e,
							}));
						}}
						placeholder="Select Shipping Line"
						options={getSelectOpt(operatorList)}
						isClearable

					/>
				</div>
			</div>

			<div className={styles.filter_section}>
				<p className={styles.title}>Shipper Name</p>
				<div className={styles.chips_container}>
					<Chips
						items={getPocControls(shippersList)}
						selectedItems={filter?.shipper}
						onItemChange={(e) => setFilter((prev) => ({
							...prev,
							shipper: e,
						}))}
						enableMultiSelect

					/>
				</div>
			</div>

			<div className={styles.filter_section}>
				<p className={styles.title}>Consignee Name</p>
				<div className={styles.chips_container}>
					<Chips
						items={getPocControls(consigneesList)}
						selectedItems={filter?.consignee}
						onItemChange={(e) => setFilter((prev) => ({
							...prev,
							consignee: e,
						}))}
						enableMultiSelect

					/>
				</div>
			</div>
			{booked_with_cogoport.length > 0 && (
				<div className={styles.filter_section}>
					<p className={styles.title}>Shipment Booked</p>
					<div className={styles.chips_container}>
						<Chips
							items={BOOKED_WITH_COGO}
							selectedItems={filter?.bookedWithCogoport}
							onItemChange={(e) => setFilter((prev) => ({
								...prev,
								bookedWithCogoport: e,
							}))}
						/>
					</div>
				</div>
			)}

		</div>
	);
}

export default FilterContent;
