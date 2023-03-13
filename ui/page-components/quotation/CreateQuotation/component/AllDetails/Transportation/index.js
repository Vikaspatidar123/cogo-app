import { cl } from '@cogoport/components';
import { IcMPort, IcMLocation } from '@cogoport/icons-react';
import { useState, useImperativeHandle, forwardRef } from 'react';

import transportControls from '../../../configuration/transportControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function Transportation(props, ref) {
	const [destinationPortDetails, setDestinationPortDetails] = useState({});
	const transportFields = transportControls({ transportMode: 'OCEAN' });
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const changeHandler = (name, data) => {
		if (name === 'destinationId') {
			setDestinationPortDetails(data);
		}
	};

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
			const onSubmit = (values) => values;

			const onError = () => true;

			return new Promise((resolve) => {
				handleSubmit(
					(values) => resolve(onSubmit(values)),
					(error) => resolve(onError(error)),
				)();
			});
		},
		destinationPortDetails,
	}));

	return (
		<div className={styles.transport_container}>
			<div className={styles.header}>
				<IcMLocation width={22} height={22} fill="#db4634" />
				<h3 className={styles.title}>Transportation Details</h3>
			</div>
			{(transportFields || []).map((field, index) => {
				const Element = getField(field?.type);
				return (
					<div key={field?.key}>
						<div className={styles.col}>
							<p className={styles.label}>{field?.label}</p>
							<Element
								{...field}
								control={control}
								className={cl`${errors?.[field?.name] && styles.error} ${field?.className}`}
								handleChange={(value) => changeHandler(field?.name, value)}
							/>
							{/* {errors?.[field?.name]?.type && <p className={styles.error_text}>required</p>} */}
						</div>
						{index === 0 && (
							<div>
								<IcMPort width={22} height={22} />
							</div>
						)}
					</div>

				);
			})}
		</div>
	);
}

export default forwardRef(Transportation);
