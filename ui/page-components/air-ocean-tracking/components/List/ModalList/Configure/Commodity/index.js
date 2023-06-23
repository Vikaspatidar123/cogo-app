import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import commodityControls from '../../../../../configuration/commodityControls';
import useCreateShipment from '../../../../../hooks/useCreateShipment';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function Commodity({ closeHandler, shipmentId = '', refetchTrackerList, shipmentInfo = {} }) {
	const [commodityValue, setCommodityValue] = useState('');

	const { hs_code = '' } = shipmentInfo || {};

	const { control, handleSubmit, setValue, formState:{ errors } } = useForm({
		defaultValues: {
			hscode: hs_code,
		},
	});

	const { loading, updateTrackerInfo } = useCreateShipment({ closeHandler, refetchTrackerList });

	const onSubmit = () => {
		const payload = {
			commodity                      : commodityValue?.description,
			hs_code                        : commodityValue?.hsCode,
			saas_container_subscription_id : shipmentId,
		};
		updateTrackerInfo({ payload });
	};

	useEffect(() => {
		if (!isEmpty(hs_code)) {
			setValue('hscode', hs_code);
		}
	}, [hs_code, setValue]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Select Commodity</h3>
			</div>
			<div className={styles.form_container}>
				{commodityControls.map((config) => {
					const { name, label, type } = config;
					const Element = getField(type);
					return (
						<div key={name} className={styles.col}>
							<p>{label}</p>
							<Element control={control} {...config} handleChange={(e) => setCommodityValue(e)} />
							<p className={styles.errors}>{errors?.[name]?.message || errors?.[name]?.type}</p>
						</div>
					);
				})}
			</div>
			<div className={styles.footer}>
				<Button type="button" themeType="secondary" disabled={loading} onClick={closeHandler}>Cancel</Button>
				<Button
					className={styles.submit_btn}
					themeType="accent"
					type="button"
					onClick={handleSubmit(onSubmit)}
					loading={loading}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default Commodity;
