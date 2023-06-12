import { paymentRequirementsControl } from '../../../configurations/paymentRequirementsControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function PaymentRequirements() {
	const { control } = useForm();

	return (
		<form>
			{paymentRequirementsControl.map((item) => {
				const Element = getField(item?.type);
				return (
					<div className={styles.field}>
						<div className={styles.field_name}>{item.label}</div>
						<Element {...item} control={control} />
					</div>
				);
			})}
		</form>
	);
}

export default PaymentRequirements;
