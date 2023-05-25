import useListQuote from '../hooks/useListQuote';

import Header from './Header';
import List from './List';
import RecentSearch from './RecentSearch';

function ListView() {
	const {
		sentListData,
		sendListLoading,
		summaryLoading,
		summaryData,
		deleteQuote,
		deleteLoading,
		setGlobalFilter,
		globalFilter,
		debounceQuery,
	} = useListQuote();

	return (
		<div style={{ padding: '22px 0' }}>
			<Header
				summaryLoading={summaryLoading}
				summaryData={summaryData}
				setGlobalFilter={setGlobalFilter}
				globalFilter={globalFilter}

			/>
			<RecentSearch />
			<List
				data={sentListData}
				loading={sendListLoading}
				deleteQuote={deleteQuote}
				deleteLoading={deleteLoading}
				setGlobalFilter={setGlobalFilter}
				debounceQuery={debounceQuery}
			/>
		</div>
	);
}

export default ListView;
