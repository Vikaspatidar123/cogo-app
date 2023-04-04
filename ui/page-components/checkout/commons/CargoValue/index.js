import { Button } from '@cogoport/components';
import { useEffect } from 'react';

import useUpdateCheckout from '../../hooks/useUpdateCheckout';
import ErrorMessage from '../../utils/error-message';

import controls from './controls';
import styles from './styles.module.css';

import { MobileNumberSelectController, useForm } from '@/packages/forms';

function CargoValue({
	cargo_value,
	cargo_value_currency,
	serviceId,
	primary_service,
}) {
	const {
		handleSubmit,
		formState: { errors },
		setValue,
		control,
	} = useForm();
	const cargo = {
		price    : cargo_value,
		currency : cargo_value_currency,
	};
	useEffect(() => {
		setValue('cargo_value_currency', cargo);
	}, [cargo_value, cargo_value_currency, setValue]);

	const { updateCheckout, loading } = useUpdateCheckout(
		serviceId,
		primary_service,
	);

	const onSubmit = async (values) => {
		console.log(values, 'values');
		const obj = {
			cargo_value_currency : values.cargo_value_currency.currency,
			cargo_value          : values.cargo_value_currency.price,
		};

		await updateCheckout(obj);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>Cargo Value</div>
			<div className={styles.sub}>
				(We will be giving you a suitable payment option basis this information)
			</div>

			<div className={styles.section}>
				<div className={styles.cargo_value_container}>
					<MobileNumberSelectController control={control} {...controls[0]} />
				</div>

				<Button
					style={{ marginLeft: '8px' }}
					className="primary sm"
					onClick={handleSubmit(onSubmit)}
					disabled={loading}
				>
					Confirm
				</Button>
			</div>
			<ErrorMessage message={errors.cargo_value_currency?.message} />
		</div>
	);
}

export default CargoValue;
