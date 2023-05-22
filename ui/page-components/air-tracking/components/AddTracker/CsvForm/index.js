import { Toast, Select, Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import useAddTrackerCSV from '../../../hooks/useAddTrackerCSV';

import styles from './styles.module.css';

import FileUploader from '@/packages/forms/Business/FileUploader';
import { useRequest } from '@/packages/request';

function CsvForm() {
	const [newvalue, setNewvalue] = useState({
		airlineId    : '',
		airwayBillNo : '',
	});
	const { addTrackerCSV, loading } = useAddTrackerCSV();

	const [airLinesData, setAirLineData] = useState(null);
	const [fileValue, setFileValue] = useState();

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
			setAirLineData(res?.data?.list);
		} catch (err) {
			Toast.error(err?.message || 'No air lines found');
		}
	};

	useEffect(() => {
		getShippingLines();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<FileUploader value={fileValue} onChange={setFileValue} accept="csv" style={{ width: '300px' }} />
			<div className={styles.select}>
				<Select
					onChange={(option) => {
						setNewvalue((prev) => ({ ...prev, option }));
					}}
					value={newvalue?.option}
					options={(airLinesData || []).map((item) => ({
						label : item.short_name,
						value : item.id,
					}))}
					placeholder="Please select a airline"
				/>
			</div>

			<div className={styles.button}>
				<Button
					onClick={() => addTrackerCSV(newvalue?.option, fileValue)}
					loading={loading || apiloading}
				>
					Track Cargo
				</Button>
			</div>
		</div>
	);
}
export default CsvForm;
