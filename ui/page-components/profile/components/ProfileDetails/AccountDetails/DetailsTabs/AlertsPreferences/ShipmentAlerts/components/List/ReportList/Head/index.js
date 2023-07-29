import { Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Head() {
	return (
		<div className={styles.container}>
			<div className={styles.text}>Report Data Points</div>
			<Button type="button" themeType="linkUi">
				<IcMDownload />
				<span className={styles.button_text}>Download</span>
			</Button>
		</div>
	);
}

export default Head;
