import { cl } from '@cogoport/components';

import styles from '../styles.module.css';

import getField from '@/packages/forms/Controlled';

const BasicCharge = ({ fields, control }) => (fields || []).map((field, index) => {
	// eslint-disable-next-line react/jsx-no-useless-fragment
	if (index === 0 || index > 3) return <></>;
	const Element = getField(field?.type);
	return (
		<div className={cl`${styles.flex_box} ${styles.row}`}>
			<p className={styles.label}>{field?.label}</p>
			<Element
				{...field}
				control={control}
				className={cl`${styles.input_box} ${styles[field?.className]}`}
			/>
		</div>
	);
});

export default BasicCharge;
