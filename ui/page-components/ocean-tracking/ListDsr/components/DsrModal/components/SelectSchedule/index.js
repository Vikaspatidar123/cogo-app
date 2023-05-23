import { Radio, Select, Button, Modal } from '@cogoport/components';
import { useEffect, useState } from 'react';

import useCreateSchedule from '../../../../hooks/useCreateSchedule';

import styles from './styles.module.css';

const DAYS = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];
const TIME = [...Array(24).keys()].reduce((acc, curr) => {
	const hour = curr;
	const minutes = ['00', '15', '30', '45'];
	return acc.concat(minutes.map((minute) => `${hour}:${minute}`));
}, []);

function SelectSchedule({
	setHeading,
	setStep,
	dsrId,
	pocName,
	handleModal,
	dsrs,
	setDsrs,
}) {
	const { submitLoading, createSchedule } = useCreateSchedule({ dsrs, setDsrs, dsrId });

	const [frequency, setFrequency] = useState();
	const [day, setDay] = useState('');
	const [dailytime, setTime] = useState();
	const [alert, setAlert] = useState(false);
	const onSubmit = async () => {
		if (dailytime === '') {
			setAlert(true);
			return;
		}
		const data = await createSchedule(frequency, day, dailytime, true);
		if (data === false) return;
		handleModal();
	};
	const options = [
		{ name: 'Weekly', value: 'Weekly', label: 'Weekly' },
		{ name: 'Daily', value: 'Daily', label: 'Daily' },
	];
	const timeOptions = TIME.map((item) => ({
		label : item,
		value : item,
	}));
	useEffect(() => {
		setHeading(`Status report for ${pocName}`);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<form>
			<Modal.Body>
				<div className={styles.select}>
					{options.map((item) => (
						<div>
							<Radio
								name="frequency"
								value={item.value}
								label={item.label}
								onChange={() => setFrequency(item.name)}
							/>
						</div>
					))}
				</div>
				{frequency === 'Weekly' && (
					<div className={styles.weekly}>
						{DAYS.map((item) => (
							<div>
								<Radio
									name="day"
									value={item}
									label={item}
									onChange={() => setDay(item)}
								/>
							</div>
						))}
					</div>
				)}
				<div>
					At:
					<Select
						value={timeOptions.filter((item) => item.value === dailytime)[0]?.value}
						placeholder="Select Time"
						defaultValue={dailytime}
						onChange={(option) => {
							setTime(option);
						}}
						options={timeOptions}
					/>
					{alert && <div className={styles.alert}>Time is required</div>}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button}>
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
						onClick={() => onSubmit()}
					>
						Next
					</Button>
				</div>
			</Modal.Footer>

		</form>
	);
}

export default SelectSchedule;
