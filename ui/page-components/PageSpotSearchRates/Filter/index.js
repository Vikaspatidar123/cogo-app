import React, { useState } from 'react';

import ViewMore from '../ViewMore';

import styles from './styles.module.css';

function Filter({ title, children, option_count }) {
	const [viewMore, setViewMore] = useState(true);
	const isBig = option_count > 4;

	return (
		<div className={styles.filter_card}>
			<p className={styles.title}>{title}</p>
			<div className={styles.filter_body} style={{ height: viewMore ? '180px' : 'auto' }}>{children}</div>
			{isBig && (
				<div className={styles.filter_footer}>
					<ViewMore callBack={() => setViewMore((x) => !x)} isOpen={viewMore} />
				</div>
			)}
		</div>
	);
}

export default Filter;
