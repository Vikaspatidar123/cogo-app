import SearchForm from './SearchForm';
import styles from './styles.module.css';

function Search() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Search</div>
			<SearchForm />
		</div>
	);
}
export default Search;
