import { cl } from '@cogoport/components';
import React from 'react';

import useGetOrganizationOutstandings from '../../hooks/useGetOrganizationOutstandings';

import PaidOnAccount from './PaidOnAccount';
import PayLaterWidgets from './PayLaterWidgets';
import styles from './styles.module.css';
import TotalOutstanding from './TotalOutstanding';

import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function Outstanding() {
	const { country_code } = useSelector(({ profile }) => ({
		country_code: profile?.organization?.country?.country_code,
	}));

	const { statsList } = useGetOrganizationOutstandings();

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
			</div>

			<div className={styles.web_view}>
				<div className={styles.flex}>
					{GLOBAL_CONSTANTS.feature_supported_service.paylater.supported_countries.includes(country_code) && (
						<PayLaterWidgets allowPadding />
					)}
				</div>
			</div>
		</div>
	);
}

export default Outstanding;
