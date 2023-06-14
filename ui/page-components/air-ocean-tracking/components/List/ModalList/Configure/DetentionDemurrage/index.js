import { cl, Button } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import detDemControls from '@/ui/page-components/air-ocean-tracking/configuration/detDemControls';
import useCreateShipment from '@/ui/page-components/air-ocean-tracking/hooks/useCreateShipment';

function DetentionDemurrage({ closeHandler, shipmentId, refetchTrackerList }) {
	const { loading, updateTrackerInfo } = useCreateShipment({ closeHandler, refetchTrackerList });

	const { control, formState:{ errors }, handleSubmit } = useForm({
		defaultValues: {
			origin_detention      : 0,
			destination_detention : 0,
			destination_demurrage : 0,
		},
	});

	const onSubmit = (data) => {
		const payload = {
			saas_container_subscription_id : shipmentId,
			origin_detention               : data?.origin_detention || 0,
			destination_detention          : data?.destination_detention || 0,
			destination_demurrage          : data?.destination_demurrage || 0,
		};
		updateTrackerInfo({ payload });
	};
	// use align self when error
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Setup detention / demurrage days</h3>
			</div>
			<div className={styles.notif}>
				<IcMInformation fill="#F68B21" width={20} height={20} />
				<div className={styles.notif_text}>
					Get alerted when detention / demurrage free days are about to expire, and when they expire.
				</div>
			</div>
			<div className={styles.form_container}>
				<div className={cl`${styles.row}`}>
					{detDemControls.map((config, index) => {
						const { name, label = '', type } = config || {};
						const Element = getField(type);
						return (
							<div key={name} className={cl`${styles.col} ${index === 0 ? styles.first_col : ''}`}>
								<p className={styles.label}>{label}</p>
								<Element control={control} {...config} />
								<p className={styles.errors}>{errors?.[name]?.message || errors?.[name]?.type}</p>
							</div>
						);
					})}
				</div>
			</div>
			<div className={styles.footer}>
				<Button themeType="secondary" disabled={loading} onClick={closeHandler}>Cancel</Button>
				<Button
					className={styles.submit_btn}
					themeType="accent"
					onClick={handleSubmit(onSubmit)}
					loading={loading}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default DetentionDemurrage;
