import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import { convert24To12HourFormat } from '../../../../../utils';
import useListOrganisation from '../../../../hooks/useListOrganigations';

import EditDetails from './EditDetails';
import styles from './styles.module.css';

function Details(props) {
	const { isEdit, reportData } = props || {};
	const { schedule_time_zone, schedule_type, schedule_time } = reportData || {};
	const { t } = useTranslation(['settings']);

	const { data, isLoading, hookSetter } = useListOrganisation({ isEdit, reportData });
	if (isEdit) {
		return (
			<EditDetails
				data={data}
				hookSetter={hookSetter}
				isLoading={isLoading}
				{...props}
			/>
		);
	}

	return (
		<div className={styles.conatiner}>
			<div className={styles.line_item}>
				<div className={styles.title}>{t('settings:schedule_alerts_text_2')}</div>
				<div className={styles.values}>
					{startCase(schedule_type)}
					{' '}
					at
					{' '}
					{convert24To12HourFormat(schedule_time)}
					{' '}
					IST (
					{schedule_time_zone}
					)
				</div>
			</div>
			<div className={styles.line_item}>
				<div className={styles.title}>{t('settings:schedule_alerts_text_3')}</div>
				<div className={styles.values}>
					{(data?.list || []).map((item) => (
						<div className={styles.item} key={item?.id}>
							{item.name}
							;
							<span className={styles.text}>
								{item.email}
								;
							</span>

							{item.mobile_number}
							;
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Details;
