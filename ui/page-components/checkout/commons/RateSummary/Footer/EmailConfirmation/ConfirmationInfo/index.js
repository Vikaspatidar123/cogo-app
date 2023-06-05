import { IcCFtick } from '@cogoport/icons-react';
import React from 'react';

import getDetentionDemurrageDays from './getDetentionDemurrageDays';
import styles from './styles.module.css';

function ConfirmationInfo({
	services,
	detailedServices,
	primaryService,
	trade_type,
	detail,
}) {
	const { source } = detail;
	const freeDays = getDetentionDemurrageDays({
		services,
		detailedServices,
		source,
		trade_type,
		primaryService,
	});

	const {
		originDetention,
		originDemurrage,
		destinationDemurrage,
		destinationDetention,
	} = freeDays || {};
	const confirmationMapping = [
		[
			{
				text       : 'Free Days at Origin',
				innerText  : `${originDetention} Detention Days, ${originDemurrage} Demurrage Days`,
				innerText2 : 'For extra day(s) charges, refer to T&C',
			},
			{
				text       : 'Free Days at Destination',
				innerText  : `${destinationDetention} Detention Days, ${destinationDemurrage} Demurrage Days`,
				innerText2 : 'For extra day(s) charges, refer to T&C',
			},
		],
		[
			{
				text: 'Confirmation in 24 Hrs',
			},
			{
				text      : 'B/L Release in 24 Hours ETD',
				innerText : 'Subject to Payment Received',
			},
		],
	];

	return (
		<div className={styles.container}>
			{confirmationMapping.map((items) => (
				<div className={styles.confirmation_text}>
					{items.map((item) => (
						<div className={styles.text_div}>
							<div className={styles.icon}>
								<IcCFtick width={20} height={20} />
							</div>
							<div className={styles.text}>
								{item.text}
								{item.innerText ? (
									<dic className={styles.inner_text}>{item.innerText}</dic>
								) : undefined}
								{item.innerText2 ? (
									<div className={styles.inner_text}>{item.innerText2}</div>
								) : undefined}
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default ConfirmationInfo;
