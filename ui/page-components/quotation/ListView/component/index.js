import Header from './Header';
import List from './List';
import RecentSearch from './RecentSearch';

function ListView() {
	return (
		<div style={{ padding: '22px 0' }}>
			<Header />
			<RecentSearch />
			<List />
		</div>
	);
}

export default ListView;
