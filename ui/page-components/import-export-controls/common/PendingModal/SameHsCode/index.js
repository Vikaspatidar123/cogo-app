import { Button } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SameHsCode({ setShowPendingModal, btnSubtmitHandler }) {
	return (
		<div className={styles.container}>
			<IcMAlert fill="#FBDC00" width={45} height={45} />
			<div className={styles.title}>
				You have selected different universal HS codes.
			</div>
			<div className={styles.btn_container}>
				<Button
					size="sm"
					themeType="secondary"
					onClick={() => setShowPendingModal(false)}
				>
					Close
				</Button>
				<Button
					size="sm"
					className={styles.submit_btn}
					onClick={() => {
						btnSubtmitHandler();
						setShowPendingModal(false);
					}}
				>
					Proceed
				</Button>
			</div>
		</div>
	);
}

export default SameHsCode;
