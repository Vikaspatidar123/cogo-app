import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import Card from './Card';
import styles from './styles.module.css';

import useRecentSearches from '@/ui/page-components/new-dashboard/hooks/useRecentSearches';

function RecentSearches() {
	const { data, loading } = useRecentSearches();
	const list = data.slice(0, 2) || [];
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.text}>RecentSearches</div>
				<Button size="md" themeType="tertiary">
					<span className={styles.view_all}>View All</span>
					<IcMArrowRight width={16} height={16} />
				</Button>
			</div>
			<div className={styles.card}>
				{(list || []).map((item) => <Card item={item} />)}
			</div>

		</div>
	);
}
export default RecentSearches;
