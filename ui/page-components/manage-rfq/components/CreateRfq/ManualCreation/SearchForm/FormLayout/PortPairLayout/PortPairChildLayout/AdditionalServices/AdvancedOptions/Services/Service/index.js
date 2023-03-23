import { cl, Toast, Checkbox } from '@cogoport/components';
import { IcCError, IcMArrowRotateUp } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

import IconMapping from '@/ui/page-components/manage-rfq/configurations/icon-mapping';

function Service({
	service = '',
	selected = false,
	onChange = () => {},
	details = {},
	setExpandServices = () => {},
	expandServices,
	checkErrors,
}) {
	const mainServices = ['freight'];
	const isMainService = mainServices.includes(service);

	const handleChange = () => {
		if (!isMainService) {
			onChange(service, selected);
		}
	};

	return (
		<div
			className={cl`${styles.container} ${selected ? styles.selected : ''}`}
			// service={service}
			key={service}
		>
			<div className={styles.service_name} role="presentation" onClick={handleChange}>
				<div className={styles.title}>
					{IconMapping[service]}
					{details?.title || ''}
				</div>
				{(checkErrors?.[service] || false) && <IcCError className={styles.error_icon} />}
			</div>
			<div className={styles.controls_container}>
				<Checkbox value={selected} onChange={handleChange} />
				<IcMArrowRotateUp
					className={cl`${styles.arrow_up} ${expandServices?.[service] && styles.rotate}`}
					onClick={() => {
						if (selected) {
							setExpandServices({
								...expandServices,
								[service]: !(expandServices?.[service] || false),
							});
						} else {
							Toast.warn('enable the service to show form');
						}
					}}
					expanded={expandServices?.[service]}
				/>
			</div>
		</div>
	);
}

export default Service;
