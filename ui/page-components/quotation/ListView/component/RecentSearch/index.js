import iconUrl from '../../../utils/iconUrl.json';
import useRecentSearch from '../../hooks/useRecentSearch';

import Card from './Card';
import styles from './styles.module.css';

const data = {
	origin_port_id      : 'c4301086-92a8-463d-af00-9c1222ff223f',
	destination_port_id : '48323e30-87e6-4a1f-b366-3a6e3a5297e1',
	container_size      : '40HC',
	container_type      : 'standard',
	commodity           : 'general',
	containers_count    : 1,
	inco_term           : 'cif',
	created_at          : '2022-08-09T10:25:07.047Z',
	search_type         : 'fcl_freight',
	origin_port         : {
		id           : 'c4301086-92a8-463d-af00-9c1222ff223f',
		name         : 'Mundra',
		display_name : 'Mundra (INMUN), Bhuj, India',
		port_code    : 'INMUN',
		type         : 'seaport',
	},
	destination_port: {
		id           : '48323e30-87e6-4a1f-b366-3a6e3a5297e1',
		name         : 'Savannah, Georgia',
		display_name : 'Savannah, Georgia (USSAV), Savannah, United States of America',
		port_code    : 'USSAV',
		type         : 'seaport',
	},
};
function RecentSearch() {
	const { loading, recentSearchData = [] } = useRecentSearch();
	return (
		<div className={styles.container}>
			<h2>Recent Searches</h2>
			{loading && (
				<div className={styles.loading_container}>
					<img src={iconUrl.loading} alt="loading..." />
				</div>
			)}
			<div className={styles.row_container}>
				<div className={styles.scroll_content}>
					<div className={styles.card_container}>
						{recentSearchData.map((recentData) => (
							<Card data={recentData} />
						))}
						{/* <Card data={data} /> */}
					</div>

				</div>
			</div>
		</div>
	);
}

export default RecentSearch;
