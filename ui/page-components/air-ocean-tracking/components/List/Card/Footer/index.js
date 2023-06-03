import { cl } from '@cogoport/components';
import { IcMError, IcMFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

const ICONS = {
	error   : IcMError,
	success : IcMFtick,
};
function Footer() {
	return (
		<div className={cl`${styles.flex_box} ${styles.footer_container}`}>
			<div className={cl`${styles.flex_box} ${styles.first_section}`}>
				<div>
					<IcMFtick />
					On Track
				</div>
				<div className={styles.next_milestone}>Next Milestone: Loaded vessel</div>
			</div>
			<div>Last updated at: 28 Jan 2023  | 07:32 pm</div>

		</div>
	);
}
export default Footer;
