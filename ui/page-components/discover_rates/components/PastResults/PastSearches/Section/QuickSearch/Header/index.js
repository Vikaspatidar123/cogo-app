import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Header({ onClose, isLoading }) {
	return (
		<div>

			<div className={styles.container}>
				<div className={styles.title}>QUICK SEARCH</div>

				<div className={styles.right}>
					<Button
						type="button"
						size="sm"
						themeType="secondary"
						onClick={onClose}
						isLoading={isLoading}
					>
						Cancel
					</Button>
					<Button type="submit" size="sm" isLoading={isLoading} style={{ marginLeft: 16 }}>
						Search Now
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Header;
