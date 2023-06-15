import { Checkbox } from '@cogoport/components';

import styles from '../styles.module.css';

const CheckBoxCol = ({ contactList = [], checkboxChangeHandler, name = '', tableValue }) => (
	contactList.map((contact) => (
		<div key={`${name}_${contact?.id}`} className={styles.col}>
			<Checkbox
				checked={tableValue[name]?.includes(contact?.id)}
				onChange={checkboxChangeHandler({ name, contactInfo: contact })}
			/>
		</div>
	))
);

export default CheckBoxCol;
