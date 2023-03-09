import { cl } from '@cogoport/components';
import { IcMMoney } from '@cogoport/icons-react';

import chargesControls from '../../configuration/chargesControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function Charges() {
	const { control } = useForm();
	const SelectController = getField('select');
	return (
		<div className={styles.container}>
			<div className={cl`${styles.heading_row} ${styles.flex_box}`}>

				<div className={styles.header}>
					<div className={styles.icon_container}>
						<IcMMoney width={18} height={18} fill="#fff" />
					</div>
					<h3 className={styles.title}>Charges</h3>
				</div>
				<div className={styles.incoterm}>
					<p className={`${styles.label} ${styles.incoterm_label}`}>Incoterm: </p>
					<SelectController {...chargesControls[0]} control={control} style={{ width: '130px' }} />
				</div>
			</div>
		</div>
	);
}

export default Charges;
