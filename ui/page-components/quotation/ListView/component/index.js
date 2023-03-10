import useListQuote from '../hooks/useListQuote';

import Header from './Header';
import List from './List';
import RecentSearch from './RecentSearch';

function ListView() {
	const {
		sentListData,
		sendListLoading,
		pagination,
		setPagination,
		setSortObj,
		filters,
		setFilters,
		searchTerm,
		setSearchTerm,
		summaryLoading,
		summaryData,
		deleteQuote,
		deleteLoading,
	} = useListQuote();

	return (
		<div style={{ padding: '22px 0' }}>
			<Header
				filters={filters}
				setFilters={setFilters}
				summaryLoading={summaryLoading}
				summaryData={summaryData}

			/>
			<RecentSearch />
			<List
				data={sentListData}
				loading={sendListLoading}
				pagination={pagination}
				setPagination={setPagination}
				setSortObj={setSortObj}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				deleteQuote={deleteQuote}
				deleteLoading={deleteLoading}
			/>
		</div>
	);
}

export default ListView;
