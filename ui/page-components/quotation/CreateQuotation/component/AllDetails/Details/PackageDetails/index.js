import { cl } from '@cogoport/components';
import { IcMFfcl } from '@cogoport/icons-react';

import packageDetailsControls from '../../../../configuration/packageDetailsControls';
import styles from '../styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function PackageDetails() {
	const {
		control,
		// formState: { errors },
	} = useForm({
		defaultValues: {
			packageHandling : 'STACKABLE',
			packageType     : 'BOX',
		},
	});
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMFfcl width={22} height={22} fill="#2d3342" />
				<h3 className={styles.title}>Package Details</h3>
			</div>

			<div className={styles.row}>
				{packageDetailsControls.map((field) => {
					const Element = getField(field.type);
					return (
						<div
							key={field?.name}
							className={cl`${styles.col} ${field?.name === 'quantity' && styles.type}
								${styles?.[field?.className]} }`}
						>
							<p className={styles.label}>{field.label}</p>
							<Element {...field} control={control} />
						</div>

					);
				})}
			</div>

		</div>
	);
}

export default PackageDetails;
