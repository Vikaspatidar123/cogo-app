/* eslint-disable max-len */
import { format } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import styles from './styles.module.css';

import { useTranslation } from '@/ui/components/LocaleTranslationContext';
import getFormattedCurrency from '@/ui/helpers/getFormattedCurrency';

const Maps = dynamic(() => import('../Maps'), {
	ssr: false,
});

function BreakUp({ data, display, routes, data_detail, validity_start, validity_end }) {
	const { t } = useTranslation(['spot_search']);

	const [activeTab, setActiveTab] = useState('Map');

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};
	return (
		<div className={styles.container}>
			{display ? (
				<div className={styles.main_container1}>
					<div className={styles.main_container}>
						<div
							className={styles.border_button}
						>
							<div className={styles.gtp_container_button}>
								<button
									onClick={() => handleTabClick('Map')}
									className={activeTab === 'Map' ? styles.active : styles.inactive}
								>
									<span style={{ fontSize: 12 }}>
										{t('map')}
									</span>
								</button>
								<button
									onClick={() => handleTabClick('Breakdown')}
									className={activeTab === 'Breakdown' ? styles.active : styles.inactive}
								>
									<span style={{ fontSize: 12 }}>
										{t('breakdown')}
									</span>
								</button>
							</div>
						</div>
					</div>
					{activeTab === 'Breakdown' ? (
						<div className={styles.price_break_up_container}>
							{data.map((detail) => (
								<div className={styles.break}>
									<div>{detail.name}</div>
									<div>
										<span>
											{detail.currency}
										</span>
										{' '}
										{getFormattedCurrency({ amount: Math.ceil(detail.price), formatType: 'decimal' })}

									</div>

								</div>
							))}
							<div className={styles.sailing_schedules}>
								{t('sailing_week')}
								{'  '}
								{format(new Date(validity_start), 'ddo MMMM YYYY')}
								{' '}
								{t('sailing_to')}
								{' '}
								{format(new Date(validity_end), 'ddo MMMM YYYY')}
							</div>
						</div>
					) : (
						<div className={styles.price_break_up_container}>
							<Maps routes={routes} detail={data_detail} />
						</div>
					)}
				</div>

			) : null}

		</div>

	);
}

export default BreakUp;
