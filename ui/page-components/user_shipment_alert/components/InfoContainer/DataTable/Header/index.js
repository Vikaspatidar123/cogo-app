import { Button, Input } from '@cogoport/components';
import { IcMAppSearch, IcMDownload } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ setShow, showTitleType }) {
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
