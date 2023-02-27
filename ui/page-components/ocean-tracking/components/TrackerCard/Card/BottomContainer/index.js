import { IcMFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function BottomContainer() {
	return (
		<div className={styles.container}>
			<div className={styles.bottom_text}>
				<div className={styles.text1}>
					<IcMFtick fill="#ABCD62" width={17} height={17} />
					<div>
						<strong>On track</strong>
						(as per original plan)
					</div>
				</div>
				<div className={styles.text2}> Next milestone : Loaded on Vessel</div>
			</div>
			<div className={styles.bottom_text}>Last updated at: 28 Jan 2023  | 07:32 pm</div>
		</div>

	);
}

export default BottomContainer;
