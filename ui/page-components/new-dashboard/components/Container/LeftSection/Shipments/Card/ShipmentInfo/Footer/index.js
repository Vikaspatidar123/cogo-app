import { IcMFship } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

function Footer({ item }) {
	const { t } = useTranslation(['dashboard']);
	return (
		<div className={styles.container}>
			<div className={styles.fouth_data}>
				<div className={styles.first_row}>
					<IcMFship
						className={styles.image}
					/>
					{item?.selected_schedule_departure && (
						<p
							className={styles.arrive}
						>
							<span
								className={styles.span}
							>
								{t('dashboard:onGoingShipments_card_text_1')}
							</span>
							{formatDate({
								date       : item?.selected_schedule_departure,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yyyy'],
								formatType : 'date',
							})}
						</p>
					)}
				</div>
				{item?.selected_schedule_arrival && (
					<p className={styles.dept}>
						<span
							className={styles.span}
						>
							{t('dashboard:onGoingShipments_card_text_2')}
						</span>
						{formatDate({
							date       : item?.selected_schedule_arrival,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yyyy'],
							formatType : 'date',
						})}
					</p>
				)}
				{item?.last_updated_at && (
					<p className={styles.update}>
						<span
							className={styles.span}
						>
							{t('dashboard:onGoingShipments_card_text_3')}
							{' '}
							&nbsp;
						</span>
						{formatDate({
							date       : item?.last_updated_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yyyy'],
							formatType : 'date',
						})}
					</p>
				)}
			</div>
		</div>
	);
}
export default Footer;
