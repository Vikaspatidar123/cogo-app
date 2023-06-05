import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function RecentSearches() {
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.text}>RecentSearches</div>
				<Button size="md" themeType="tertiary" className={styles.view_all}>View All</Button>
			</div>
		</div>
	);
}
export default RecentSearches;
