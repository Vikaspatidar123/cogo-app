import { Button } from '@cogoport/components';
import { IcABlog } from '@cogoport/icons-react';

import styles from './styles.module.css';

function EmptyPage({
	label,
	subLabel,
	icon,
	setShowDashboard = () => {},
	shadow = true,
	type = '',
}) {
	return (
		<div className={shadow ? styles.shadow_container : styles.no_shadow_container}>
			<div className={styles.wrapper}>
				<div className={styles.heading}>{label || 'No records found'}</div>
				<div className={styles.content}>
					{type === 'list'
						? subLabel
						: subLabel
					|| 'Looks like you do not have any records for this section'}
				</div>
				{type === 'list' && (
					<div className={styles.button_container}>
						<Button
							themeType="accent"
							onClick={() => setShowDashboard(false)}
						>
							Request RFQ
						</Button>
					</div>
				)}
			</div>
			<div className={styles.icc_container}>
				{icon || <IcABlog width="85%" height="85%" />}
			</div>
		</div>
	);
}

export default EmptyPage;
