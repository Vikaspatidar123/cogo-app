import { useSelector } from 'react-redux';

import DiscoverRates from './DiscoverRates';
import ExportFactoring from './ExportFactoring';
import PayLaterWidgets from './PayLaterWidgets';
import styles from './styles.module.css';

const INDIA_COUNTRY_ID = '541d1232-58ce-4d64-83d6-556a42209eb7';

function SassDashboard() {
	const { query, country_id } = useSelector(({ general, profile }) => ({
		query      : general?.query,
		country_id : profile?.organization?.country_id,
	}));
	return (
		<div className={styles.container}>
			<div className={styles.child1}>
				<DiscoverRates />
				{/* <Schedule /> */}
			</div>
			<div className={styles.child2}>
				{country_id === INDIA_COUNTRY_ID
					&& query?.account_type === 'importer-exporter' && <PayLaterWidgets />}
				<ExportFactoring />
				{/* <Promotion /> */}
				{/* <Blogs /> */}
			</div>
		</div>
	);
}
export default SassDashboard;
