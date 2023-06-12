import { useEffect } from 'react';

import getControls from '../configuration';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import FormItem from '@/ui/commons/components/FormItem';

const MAPPING = {
	incoterm    : 'incoterm',
	consignment : 'consignmentValue',
	result      : 'resultCurrency',
	applicable  : 'totalDutiesAndTaxes',
};
function Duties({ transactionData }) {
	const controls = getControls();
	const {
		setValue,
		control,
	} = useForm();

	useEffect(() => {
		controls.map((item) => setValue(item.name, transactionData[MAPPING[item.name]]));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transactionData]);
	return (
		<div className={styles.container}>
			<div className={styles.styled_row}>
				{(controls || []).map((item) => {
					const Element = getField(item.type);
					return (
						<div className={styles.row} style={{ margin: 0 }}>
							<FormItem label={item?.label} className={item?.name} key={item.id}>
								<Element {...item} control={control} />
							</FormItem>
						</div>

					);
				})}

			</div>
			<div className={styles.hr} />
		</div>
	);
}
export default Duties;
