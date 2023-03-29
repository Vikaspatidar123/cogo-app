import { Input, Toast, Select, Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import useAddTracker from '../../../hooks/useAddTracker';

import styles from './styles.module.css';

import { useRequest } from '@/packages/request';

function RenderForm() {
	const { addTracker } = useAddTracker();
	const [value, setValue] = useState(null);
	const [datas, setData] = useState();
	const [present, setPresent] = useState(false);
	const [newvalue, setNewvalue] = useState({
		airlineId    : '',
		airwayBillNo : '',
	});

	const [showinput, setshowinput] = useState(false);
	const [shippingLines, setShippingLines] = useState(null);
	const [{ loading }, trigger] = useRequest({
		url    : '/get_airline_from_airway_bill?airway_bill_no={id}',
		method : 'get',
	}, { manual: false });

	const [{ loading:apiloading }, airLines] = useRequest({
		url    : '/list_operators',
		method : 'get',
	}, { manual: false });
	const getShippingLines = async () => {
		try {
			const res = await airLines({
				params: {
					filters    : { operator_type: 'airline' },
					page_limit : 2000,
				},
			});
			setShippingLines(res?.data?.list);
		} catch (err) {
			Toast.error(err?.message || 'No airlines found');
		}
	};

	useEffect(() => {
		getShippingLines();
	}, []);

	const fetchShippingLineForContainer = async (id) => {
		try {
			const res = await trigger({ params: { airway_bill_no: id } });
			const Data = res?.data;
			setData(Data);
			if (res?.result?.airline_id) {
				const values = res.result.airline_id;
				const label = shippingLines?.filter?.((item) => item.id === value)[0]?.short_name;
				setValue('airline_id', { label, values });
			} else setValue('airline_id', '');
			setPresent(!present);
		} catch (err) {
			Toast.error(
				"Couldn't fetch shipping line for the entered container number. Please try again later.",
			);
		}
		return {

		};
	};
	const new_input = (e) => {
		const value2 = e;
		if (value2?.length >= 4) {
			const data = value2.toUpperCase();
			setshowinput(true);
			fetchShippingLineForContainer(data);
			setNewvalue((prev) => ({ ...prev, airwayBillNo: value2 }));
		} else setshowinput(false);
	};

	return (
		<div>
			<div className={styles.input}>
				<Input
					font-size="none"
					name="search_value"
					size="md"
					placeholder="Enter a Airway Bill Number"
					style={{ width: '250px' }}
					onChange={(e) => new_input(e)}
				/>
			</div>

			{showinput && (
				<div className={styles.select}>
					<Select
						onChange={(option) => {
							setNewvalue((prev) => ({ ...prev, option }));
						}}
						value={datas?.id || newvalue?.option}
						options={(shippingLines || []).map((item) => ({
							label : item.short_name,
							value : item.id,
						}))}
						placeholder="Please select a airline"
					/>
				</div>
			)}
			<div className={styles.button}>
				<Button onClick={() => addTracker(newvalue)}> Track Cargo</Button>
			</div>

		</div>

	);
}
export default RenderForm;
