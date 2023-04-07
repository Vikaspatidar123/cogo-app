import React from 'react';

import RightHeader from './RightHeader';
import styles from './styles.module.css';

function HeaderLayout({ rightParams, children, showHeader = true }) {
	return (
		<div className={styles.container}>

			{showHeader && (
				<div className={styles.header}>
					<a href="https://www.cogoport.com">
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/cogoport.svg"
							alt="Cogoport"
						/>
					</a>
					{rightParams && <RightHeader {...rightParams} />}
				</div>
			)}
			{children}
		</div>
	);
}

export default HeaderLayout;
