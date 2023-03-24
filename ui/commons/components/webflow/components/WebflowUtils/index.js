import { Link } from '@/packages/next';
import { rest } from '@cogo/deprecated_legacy/rest';
import { Button, Toast } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function WebflowUtils() {
	const [loading, setLoading] = useState(false);
	const onReload = () => {
		setLoading(true);
		rest
			.get(`${process.env.APP_URL}api/reload-webflow`)
			.then((res) => {
				if (res.hasError) {
					Toast.error(`ERRROR: ${(res.messages || []).join(', ')}`, {
						hideAfter: 6,
					});
				} else {
					Toast.success(`${res.data.message}`);
				}
				setLoading(false);
			})
			.catch((e) => {
				Toast.error(`ERRROR: ${e.message}`, { hideAfter: 6 });
				setLoading(false);
			});
	};
	return (
		<div>
			<div className={styles.header}>
				<Link href="/" passHref>
					<div className={styles.a}>
						<div
							className={styles.logo}
							src="https://dev-cogoport-s3.imgix.net/cf1d4688be0b4efcb656ec04544043f3.png?auto=format&w=400"
							atl="Cogoport - Logo"
						/>
					</div>
				</Link>
			</div>
			<div className={styles.content}>
				<Button themeType="error" onClick={onReload} isLoading={loading}>
					Reload API Data
				</Button>
			</div>
		</div>
	);
}

WebflowUtils.getInitialProps = () => ({ layout: 'none' });

export default WebflowUtils;
