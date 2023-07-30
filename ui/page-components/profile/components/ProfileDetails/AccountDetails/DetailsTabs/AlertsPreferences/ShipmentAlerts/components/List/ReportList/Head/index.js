import { Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Head({ props }) {
	const { isEdit } = props || {};
	return (
		<div className={styles.container}>
			<div className={styles.text}>Report Data Points</div>
			{!isEdit ? (
				<Button type="button" themeType="linkUi">
					<IcMDownload />
					<span className={styles.button_text}>Download</span>
				</Button>
			) : null}
		</div>
	);
}

export default Head;
