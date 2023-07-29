import RecentSearches from './RecentSearches';
import Search from './Search';
import styles from './styles.module.css';

import useRecentSearches from '@/ui/page-components/new-dashboard/hooks/useRecentSearches';

function SearchRates() {
	const { data, loading } = useRecentSearches();
	return (
		<div className={styles.container}>
			<Search data={data} />
			<RecentSearches data={data} loading={loading} />
		</div>
	);
}
export default SearchRates;
