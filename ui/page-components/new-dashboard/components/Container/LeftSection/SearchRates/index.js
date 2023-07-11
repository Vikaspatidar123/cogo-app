import RecentSearches from './RecentSearches';
import Search from './Search';
import styles from './styles.module.css';

function SearchRates() {
	return (
		<div className={styles.container}>
			<Search />
			<RecentSearches />
		</div>
	);
}
export default SearchRates;
