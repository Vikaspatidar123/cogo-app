import { Placeholder } from '@cogoport/components';
import { IcMSchedules } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import { convert24To12HourFormat } from '../../../../../utils';
import useListOrganisation from '../../../../hooks/useListOrganigations';

import EditDetails from './EditDetails';
import styles from './styles.module.css';

function Details(props) {
	const { isEdit = false, reportData = {}, loading = false } = props || {};

	const { schedule_time_zone = '', schedule_type = '', schedule_time = '' } = reportData || {};

	const { t } = useTranslation(['settings']);

	const { data, isLoading, hookSetter } = useListOrganisation({ isEdit, reportData });
	if (isLoading || loading) {
		return (
			<div>
				<Placeholder height="100px" margin="10px 0px 20px 0px">
					<IcMSchedules width={40} height={40} />
				</Placeholder>
			</div>
		);
	}
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
			{schedule_type ? (
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
			) : null}
			{!isEmpty(data?.list) ? (
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
			) : null}
		</div>
	);
}

export default Details;
