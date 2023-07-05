import { Tooltip, cl, ProgressBar } from '@cogoport/components';
import { IcCFtick, IcMInformation } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

import { getCountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function ConfirmationTexts({
	primaryServiceData = {},
	trade_type = '',
	services = {},
}) {
	const primaryService = (Object.values(services) || [])
		.map((per_service) => {
			if (per_service?.service_type === primaryServiceData?.service_type) {
				return per_service;
			}

			return undefined;
		})
		.filter((item) => item);

	const {
		origin_detention,
		origin_demurrage,
		destination_detention,
		destination_demurrage,
	} = primaryService.reduce((acc, curr, index) => {
		const keys = [
			'origin_detention',
			'origin_demurrage',
			'destination_detention',
			'destination_demurrage',
		];

		const hash = {};
		keys.forEach((key) => {
			hash[key] = (curr[key]?.free_limit || 0) + (curr[key]?.additional_days || 0);
		});

		if (index === 0) {
			return hash;
		}

		const returnHash = {};
		keys.forEach((key) => {
			returnHash[key] = Math.min(acc[key], hash[key]);
		});

		return returnHash;
	}, {});

	const { origin_country_id } = primaryServiceData;

	const { is_country_india } = getCountrySpecificData({
		country_id   : origin_country_id,
		accessorType : 'navigations',
		accessor     : 'common',
	});

	const isExportingCountryIndia = is_country_india && trade_type === 'export';

	const isShowDestinationDays = destination_detention || destination_demurrage;

	return (
		<div className={styles.container}>
			<div className={styles.trick}>
				<div className={cl`${styles.text_div} ${styles.confirmation_text}`}>
					<IcCFtick width={20} height={20} />
					<div className={styles.text}>
						Confirmation in 24 Hrs
						<div className={styles.inner_text}>
							<div className={styles.progress_div}>
								<Tooltip content={<div>Probability of Confirmation</div>}>
									<div className={styles.progress_percent}>
										{primaryServiceData?.reliability_score || 53}
										%
										<IcMInformation />
									</div>
								</Tooltip>

								<div className={styles.progress_bar}>
									<ProgressBar
										progress={primaryServiceData?.reliability_score || 53}
										uploadText=""
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={cl`${styles.text_div} ${styles.bl_release}`}>
					<IcCFtick width={20} height={20} />
					<div className={styles.text}>
						{trade_type === 'export'
							? 'B/L release in 24hrs of ETD'
							: 'B/L release in 24hrs of ETA.'}
						<div className={styles.inner_text}>Subject to Payment Received</div>
					</div>
				</div>

				<div className={cl`${styles.text_div} ${styles.cancellation_charges}`}>
					<IcCFtick width={20} height={20} />
					<div className={styles.text}>
						Min cancellation fee of $50 will apply
						<div className={styles.inner_text}>
							For more details please read T&Cs
						</div>
					</div>
				</div>
			</div>

			<div className={cl`${styles.text_div} ${styles.second}`}>
				<div className={styles.text}>
					<div className={styles.text}>
						{isShowDestinationDays ? (
							<>
								<b>Destination</b>
								:
								{' '}
								{destination_detention ? (
									<>
										{destination_detention}
										{' '}
										detention day(s)
										{' '}
									</>
								) : null}
								{destination_demurrage ? (
									<>
										{destination_demurrage}
										{' '}
										demmurage day(s)
										{' '}
									</>
								) : null}
							</>
						) : null}
						<div className={cl`${styles.text} ${styles.detention_demurrage}`}>
							<b>Origin</b>
							:
							{' '}
							{origin_detention || (isExportingCountryIndia ? 4 : 0)}
							{' '}
							detention
							days,
							{origin_demurrage || (isExportingCountryIndia ? 4 : 0)}
							{' '}
							demurrage
							days
							{' '}
						</div>
						<div className={styles.inner_text}>
							For extra day(s) charges refer T&C
							{' '}
						</div>
					</div>
				</div>

				{primaryServiceData?.terminal_cutoff ? (
					<div className={styles.text_div}>
						<IcCFtick width={20} height={20} />
						<div className={styles.text}>
							Terminal Deadline
							<div className={styles.inner_text}>
								{format({
									date       : primaryServiceData.terminal_cutoff,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})}
							</div>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default ConfirmationTexts;
