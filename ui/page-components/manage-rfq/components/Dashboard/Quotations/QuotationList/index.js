import { isEmpty } from '@cogoport/utils';

import Empty from '../../../../common/Empty';
import ListLoader from '../ListLoader';

import QuotationsCard from './QuotationsCard';
import styles from './styles.module.css';

function Quotations({
	rfqList,
	loading,
	getRfqList,
	activeFilter,
	inViewport,
	getRfqStats,
	setShowDashboard = () => {},
}) {
	const filterMapping = {
		all        : '',
		live       : 'Active',
		requested  : 'Requested',
		draft      : 'Draft',
		is_expired : 'Expired',
	};

	const subLabelMapping = {
		all        : 'Your All Quotations will show up here',
		live       : 'Your Active Quotations will show up here',
		requested  : 'Your Requested Quotations will show up here',
		draft      : 'Your Draft Quotations will show up here',
		is_expired : 'Your Expired Quotations will show up here',
	};

	if (loading) {
		return <ListLoader />;
	}

	if (isEmpty(rfqList)) {
		return (
			<Empty
				label={`You have no ${filterMapping[activeFilter]} Quotations`}
				subLabel={subLabelMapping[activeFilter]}
				setShowDashboard={setShowDashboard}
				type="list"
			/>
		);
	}

	return (
		<div className={inViewport ? styles.rfq_scroll : styles.rfq_no_scroll}>
			{(rfqList || []).map((item) => (
				<QuotationsCard
					key={item}
					rfqItem={item}
					getRfqStats={getRfqStats}
					activeFilter={activeFilter}
					getRfqList={getRfqList}
				/>
			))}
		</div>
	);
}

export default Quotations;
