import SearchForm from './SearchForm';
import styles from './styles.module.css';

function Search({ data }) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Search</div>
			<SearchForm data={data} />
		</div>
	);
}
export default Search;
