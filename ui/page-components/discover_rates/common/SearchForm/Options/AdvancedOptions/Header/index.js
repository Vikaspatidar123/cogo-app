// import Icon from '@cogo/deprecated_legacy/icons/advanced-search.svg';
import { Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Header({
	children = null,
	loading = false,
	onClose = () => {},
	onSubmit = () => {},
}) {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>
				<IcMSearchlight size={1.5} style={{ marginRight: 10 }} />
				{children}
			</h2>
			<div className={styles.right}>
				<Button onClick={onClose} ghost>
					CANCEL
				</Button>

				<Button
					disabled={loading}
					onClick={onSubmit}
					style={{ marginLeft: '16px' }}
				>
					SEARCH RATES
				</Button>
			</div>
		</div>
	);
}

export default Header;
