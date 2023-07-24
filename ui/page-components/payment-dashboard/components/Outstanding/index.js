import { cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import ResponsivePieChart from '../../common/ResponsivePieChart';
import DueInData from '../../constants/due-in-data';

import PaidOnAccount from './PaidOnAccount';
import PayLaterWidgets from './PayLaterWidgets';
import styles from './styles.module.css';
import TotalOutstanding from './TotalOutstanding';

import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function Outstanding({
	statsList,
	statsLoading,
	serviceWiseLoading,
	serviceWiseStats,
}) {
	const { country_code } = useSelector(({ general, profile }) => ({
		query        : general?.query,
		country_code : profile?.organization?.country?.country_code

		,
	}));

	const ServiceDataPoints = (serviceWiseStats || []).map((item, index) => ({
		id        : index,
		label     : startCase(item.shipment_type) || '-',
		sub_label : startCase(item.shipment_type) || '-',
		value     : item.total_open_invoice_amount || 0,
	}));

	return (
		<div className={styles.container}>
			<div
				className={styles.box}
			>
				<div className={styles.card}>
					<div className={styles.card_box}>
						<TotalOutstanding
							statsList={statsList}
						/>
					</div>
					<div className={cl`${styles.card_box} ${styles.web_view}`}>
						<PaidOnAccount
							statsList={statsList}
						/>
					</div>
				</div>
				<div className={cl`${styles.card} ${styles.web_view}`}>
					<div className={styles.styled_row}>
						<ResponsivePieChart
							data={DueInData({ statsList })}
							heading="Outstanding Amount by Due Date"
							loading={statsLoading}
							isKamWise
						/>

						<ResponsivePieChart
							data={ServiceDataPoints}
							heading="Outstanding Payment by Service"
							loading={serviceWiseLoading}
							isKamWise={false}
						/>
					</div>
				</div>
				<div />
			</div>
			<div className={styles.web_view}>
				<div className={styles.flex}>
					{GLOBAL_CONSTANTS.feature_supported_service.paylater
                    	.supported_countries.includes(country_code) && (
	<PayLaterWidgets allowPadding />
					)}
				</div>
			</div>
		</div>
	);
}

export default Outstanding;
