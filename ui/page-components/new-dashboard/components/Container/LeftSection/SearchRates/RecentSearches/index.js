import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import Card from './Card';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import useRecentSearches from '@/ui/page-components/new-dashboard/hooks/useRecentSearches';

function RecentSearches() {
	const { push } = useRouter();
	const { data, loading } = useRecentSearches();
	const list = data.slice(0, 2) || [];
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.text}>RecentSearches</div>
				<Button size="md" themeType="tertiary" onClick={() => push('/book')}>
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
