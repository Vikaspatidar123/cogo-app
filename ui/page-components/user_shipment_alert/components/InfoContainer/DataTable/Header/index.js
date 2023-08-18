import { Button, Input } from '@cogoport/components';
import { IcMAppSearch, IcMDownload } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<Input
				name="search"
				style={{ width: '300px' }}
				placeholder="Search for SSR by SID"
				size="sm"
				suffix={<IcMAppSearch style={{ marginRight: '10px' }} />}
			/>
			<div className={styles.button_box}>
				<div className={styles.download}>
					<IcMDownload />
					<div>
						Download
					</div>
				</div>
				<Button size="md" themeType="secondary">Edit</Button>
			</div>
		</div>
	);
}

export default Header;
