import { Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ setShow, showTitleType }) {
	return (
		<div className={styles.container}>

			<div />
			<div className={styles.button_box}>
				<div
					role="presentation"
					className={styles.download}
					onClick={() => { setShow(true); showTitleType('Download SSR'); }}
				>
					<IcMDownload />
					<div className={styles.down}>
						Download
					</div>
				</div>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => {
						setShow(true);
						showTitleType('Edit Report');
					}}
				>
					Edit

				</Button>
			</div>
		</div>
	);
}

export default Header;
