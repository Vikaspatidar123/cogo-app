import { cl } from '@cogoport/components';

import MobileView from '../MobileView';

import Head from './Head';
import styles from './styles.module.css';

import TableList from '@/ui/page-components/cogo-subscriptions/common/TableList';

function CardTable({ planFeatureData }) {
	const { plan_features = {} } = planFeatureData || {};
	const plan_key = Object.keys(plan_features) || [];

	return (
		<div>
			<div className={styles.mobile_view}>
				<MobileView planFeatureData={planFeatureData?.plan_features} />
			</div>
			<div className={cl`${styles.web_view} ${styles.table}`}>
				<div className={styles.head}>
					<Head />
				</div>
				{(plan_key || []).map((item) => {
					const feature = plan_features[item];
					return (
						<div key={item} className={styles.table_container}>
							<div className={styles.name}>
								<div className={styles.title_head}>{feature?.display_name}</div>
								<div className={styles.check_line} />
							</div>
							<div className={styles.container}>
								<TableList features={feature?.features} />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default CardTable;
