import { IcMArrowBack } from '@cogoport/icons-react';

import styles from './styles.module.css';

function MobileHeader({
	heading = '',
	ChildComponent = null,
	onClickBackButton = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.icon_text}>
				<div className={styles.icon_container} onClick={onClickBackButton} role="presentation">
					<IcMArrowBack />
				</div>

				<div className={styles.heading_container}>
					<div className={styles.heading}>{heading}</div>
				</div>
			</div>

			{ChildComponent ? <ChildComponent /> : null}
		</div>
	);
}

export default MobileHeader;
