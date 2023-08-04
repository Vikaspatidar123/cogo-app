import { IcAOceanSchedule, IcMArrowNext, IcAAirSchedule } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

const control = ({ t = () => {} }) => [
	{
		type_icon   : <IcAOceanSchedule width={40} height={40} />,
		heading     : t('dashboard:schedule_title_text_1'),
		description : t('dashboard:schedule_title_text_2'),
		background  : '#fff1d5',
		url         : '/saas/ocean-schedules',
	},
	{
		type_icon   : <IcAAirSchedule width={40} height={40} />,
		heading     : t('dashboard:schedule_title_text_3'),
		description : t('dashboard:schedule_title_text_4'),
		background  : '#fff1d5',
		url         : '/saas/air-schedules',

	},
];
function Schedule() {
	const { t } = useTranslation(['dashboard']);

	const controls = control({ t });
	const { push } = useRouter();
	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				{controls.map((item) => (
					<div
						key={item.heading}
						role="presentation"
						className={styles.card}
						onClick={() => push(item.url)}
					>
						<div className={styles.icon_wrapper} style={{ backgroundColor: item.background }}>
							{item.type_icon}
						</div>
						<div className={styles.box}>
							<div className={styles.text_box}>
								<div className={styles.text}>{item.heading}</div>
								<IcMArrowNext fill="#356efd" />
							</div>
							<div className={styles.des}>{item.description}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Schedule;
