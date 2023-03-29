import { Toast, Input } from '@cogoport/components';

import styles from './styles.module.css';

const MAPPING = {
	subtract : 'Cannot remove existing days',
	add      : 'Cannot add more days',
};

function DaysSelect({ days, minimumDays, maximumDays, setDays }) {
	const onChangeDays = (type) => {
		const i = type === 'subtract' ? -1 : 1;

		const limit_type = type === 'subtract' ? minimumDays : maximumDays;

		if (Number(days) === limit_type) {
			Toast.info(MAPPING[type]);
		} else {
			setDays((prev) => Number(prev) + i || '');
		}
	};

	const handleChange = (e) => {
		const { value } = e.target;

		if (value > maximumDays) {
			Toast.error(MAPPING.add);
		} else if (value < minimumDays) {
			Toast.error(MAPPING.subtract);
		} else setDays(Number(value));
	};

	return (
		<div>
			<div className={styles.styled_text}>Total days</div>

			<div className={styles.container}>
				<div
					className={styles.method_container}
					role="presentation"
					onClick={() => onChangeDays('subtract')}
				>
					-
				</div>

				<div className={styles.v_line} />

				<Input type="number" value={days} onChange={(e) => handleChange(e)} />

				<div className={styles.v_line} />

				<div
					className={styles.method_container}
					role="presentation"
					onClick={() => onChangeDays('add')}
				>
					+

				</div>
			</div>
		</div>
	);
}
export default DaysSelect;
