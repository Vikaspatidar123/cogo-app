import { cl, Button } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { snakeCase } from '@cogoport/utils';

import rfqDetails from '../../configurations/why-rfq';
import iconUrl from '../../utils/iconUrl.json';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function WhyRfq({ setShowDashboard = () => {} }) {
	const { push } = useRouter();
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMCross
					className={styles.cross_icon}
					onClick={() => {
						setShowDashboard(true);
					}}
				/>
			</div>
			<div className={styles.content}>
				<div className={styles.title}>Why RFQ</div>

				<div className={styles.description}>
					{rfqDetails.map(({ icon, title, text }, index) => (
						<div
							key={snakeCase(title)}
							className={cl`${styles.item} ${index === rfqDetails.length - 1 && styles.last_row}`}
						>
							<div className={styles.icon}>{icon}</div>
							<div className={styles.label}>{title}</div>
							<div className={styles.text}>{text}</div>
						</div>
					))}
				</div>

				<div className={styles.btn_container}>
					<Button themeType="accent" size="lg" onClick={() => push('/manage-rfq/create')}>Request RFQ</Button>
				</div>
			</div>
			<div className={styles.cogo_icon_container}>
				<img src={iconUrl?.cogoIcon} alt="icon" className={styles.cogo_icon} />
			</div>
		</div>
	);
}

export default WhyRfq;
