import { Radio, Input, Toast, Select, Button } from '@cogoport/components';
import { useState, useEffect, useCallback } from 'react';

import useAddTracker from '../../../hooks/useAddTracker';

import styles from './styles.module.css';

import { useRequest } from '@/packages/request';

function RenderForm() {
	const { addTracker } = useAddTracker();
	const SEARCH_TYPES = {
		CONTAINER_NUMBER : 'CONTAINER_NO',
		BOOKING_NUMBER   : 'BOOKING_NO/BL_NO',
		BL_NUMBER        : 'BL_NO',
	};

	const controls = [
		{ label: 'Booking No / BL No', value: SEARCH_TYPES.BOOKING_NUMBER },
		{ label: 'Container Number', value: SEARCH_TYPES.CONTAINER_NUMBER },
	];
	const [value, setValue] = useState({ search_type: '', search_value: '', shipping_line_id: '' });
	const [showinput, setShowInput] = useState(false);
	const [shippingLines, setShippingLines] = useState(null);
	const [{ loading }, trigger] = useRequest({
		url    : '/get_shipping_line_for_container_no',
		method : 'get',
	}, { manual: false });

	const [{ loading:apiloading }, shipping] = useRequest({
		url    : '/get_saas_container_shipping_lines',
		method : 'get',
	}, { manual: false });

	const getShippingLines = useCallback(async () => {
		try {
			const res = await shipping();
			setShippingLines(res?.data?.list);
		} catch (err) {
			Toast.error(err?.message || 'No shipping lines found');
		}
	}, [shipping]);

	useEffect(() => {
		getShippingLines();
	}, [getShippingLines]);

	const fetchShippingLineForContainer = async (id) => {
		try {
			const res = await trigger({ params: { container_no: id } });

			const { data } = res;
			if (data?.result?.shipping_line_id) {
				const valueId = data.result.shipping_line_id;
				const label = shippingLines?.filter?.((item) => item.id === value)[0]?.short_name;
				setValue((prv) => ({ ...prv, shipping_line_id: valueId }));
			} else setValue((prv) => ({ ...prv, shipping_line_id: '' }));
		} catch (err) {
			Toast.error(
				"Couldn't fetch shipping line for the entered container number. Please try again later.",
			);
		}
	};

	const newInput = (item) => {
		if (item?.length >= 4) {
			const data = item.toUpperCase();
			setShowInput(true);
			fetchShippingLineForContainer(data);
			setValue((prv) => ({ ...prv, search_value: item }));
		} else setShowInput(false);
	};
	return (
		<div>
			<div className={styles.form}>
				{controls.map((item) => (
					<div className={styles.radio}>
						<Radio
							name="search_type"
							value={item.value}
							label={item.label}
							onChange={(e) => setValue((prv) => ({ ...prv, search_type: e.target.value }))}
						/>
					</div>
				))}
			</div>
			<div>
				<Input
					name="search_value"
					size="md"
					placeholder="Enter Container / BL Booking"
					onChange={(e) => newInput(e)}
				/>
			</div>
			{showinput && (
				<div className={styles.select}>
					<Select
						onChange={(option) => {
							setValue((prev) => ({ ...prev, shipping_line_id: option }));
						}}
						value={value?.shipping_line_id}
						options={(shippingLines || []).map((item) => ({
							label : item.short_name,
							value : item.id,
						}))}
						placeholder="Please select a shipping line"
					/>
				</div>
			)}
			<div className={styles.button}>
				<Button onClick={() => addTracker(value)}> Track Shipment</Button>
			</div>

		</div>
	);
}
export default RenderForm;
