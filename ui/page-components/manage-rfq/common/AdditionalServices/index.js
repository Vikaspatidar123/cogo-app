import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import getIcons from './getIcons';
import getServiceName from './getServiceName';
import styles from './styles.module.css';

function ToolTipContent({ services, handleServiceName }) {
	return (
		<div className={styles.tooltip_container}>
			{services.map((itm) => {
				const { serviceName, icon } = handleServiceName(itm);

				return (
					<div className={styles.service_tag}>
						{icon}
						<div className={styles.text}>{serviceName.replaceAll('Destination', 'Dest')}</div>
					</div>
				);
			})}
		</div>
	);
}

function AdditionalServices({ serviceDetails = {}, type = 'portcard' }) {
	const servicesList = Object.values(serviceDetails || {});
	const getIndex = { portcard: 2, titlecard: 5, createcontract: 1 };
	const index = getIndex?.[type] || 1;

	const servicesArr = [];
	(servicesList || []).forEach((item) => {
		if (
			!['fcl_freight', 'lcl_freight', 'air_freight'].some((itm) => getServiceName(item).includes(itm))
		) {
			servicesArr.push(getServiceName(item));
		}
	});

	const handleServiceName = (service) => {
		const splitName = service.split(':');
		const serviceIcon = getIcons(splitName[1]);

		if (splitName[2]) {
			return {
				serviceName: `${splitName[0]} ${splitName[1]} (${startCase(
					splitName[2],
				)})`,
				icon: serviceIcon,
			};
		}
		return { serviceName: startCase(service), icon: serviceIcon };
	};

	return (
		<div className={styles.container}>
			{servicesArr.slice(0, index).map((itm) => {
				const { serviceName, icon } = handleServiceName(itm);
				return (
					<div className={styles.service_tag}>
						{icon}
						<div className={styles.text}>{serviceName.replaceAll('Destination', 'Dest')}</div>
					</div>
				);
			})}

			{servicesArr.length > index && (
				<Tooltip
					content={(
						<ToolTipContent
							services={servicesArr.slice(index)}
							handleServiceName={handleServiceName}
						/>
					)}
					maxWidth={300}

				>
					<div className={styles.extra}>
						+
						{servicesArr.length - index}
						{' '}
						More
					</div>
				</Tooltip>
			)}
		</div>
	);
}

export default AdditionalServices;
