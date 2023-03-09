import { cl } from '@cogoport/components';
import { IcMMoney } from '@cogoport/icons-react';

import chargesControls from '../../configuration/chargesControls';

import IncoTermCharge from './IncotermCharge';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function Charges() {
	const { control, watch } = useForm({
		defaultValues: {
			incoterm: 'CIF',
		},
	});

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

			{(chargesControls || []).map((field, index) => {
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
			})}

			<div className={styles.hr} />

			<IncoTermCharge watch={watch} chargeFields={chargesControls} control={control} />
		</div>
	);
}

export default Charges;
