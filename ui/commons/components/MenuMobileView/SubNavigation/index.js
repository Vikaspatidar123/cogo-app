import { IcMArrowDown, IcMArrowNext } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from '../styles.module.css';

function Subnavigation({ menuItem, getRedirectUrl }) {
	const [showSubNav, setShowSubNav] = useState(false);

	return (
		<div className={styles.main}>
			<div
				className={styles.styled_button}
				onClick={() => setShowSubNav(!showSubNav)}
				role="presentation"
			>
				<div className={showSubNav ? styles.active : styles.button_text}>{menuItem.title}</div>

				<div className={styles.arrow_icon_container}>
					<IcMArrowDown />
				</div>
			</div>
			{showSubNav && menuItem.options?.map((item) => (
				<div
					className={styles.styled_button}
					onClick={() => getRedirectUrl(item.href, item.as)}
				>
					<div className={styles.button_text}>{item.title}</div>
					<div className={styles.arrow_icon_container}>
						<IcMArrowNext />
					</div>

				</div>
			))}

		</div>
	);
}

export default Subnavigation;
