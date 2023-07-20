import { isEmpty } from '@cogoport/utils';

import EmptyPage from '../../../../../common/Empty';

import CardLoader from './CardLoader';
import styles from './styles.module.css';
import TitleLoader from './TitleLoader';
import ViewRateCards from './ViewRateCards';

import Title from '@/ui/page-components/manage-rfq/common/TitleCard';

const LOADING_ARRAY = [...Array(3).keys()];

function ListRate({
	activePortPair,
	spot_searches,
	spot_search,
	portPairloading,
	portPairRateloading,
	selectedData,
	setSelectedData,
	radioSelected,
	setRadioSelected,
	spotSearch,
}) {
	if (portPairRateloading || portPairloading) {
		return (
			<>
				<TitleLoader />
				{LOADING_ARRAY.map((key) => <CardLoader key={key} />)}
			</>
		);
	}

	const data = spot_searches[activePortPair];

	const { rfq_rates = {} } = spot_search || {};

	const searchParams = { ...spot_searches[activePortPair]?.search_params };

	if (isEmpty({ ...rfq_rates.recommended, ...rfq_rates.spot_rates })) {
		return <EmptyPage shadow={false} />;
	}

	return (
		<>
			{!isEmpty(spot_searches) && (
				<Title
					detail={spot_searches[activePortPair]?.detail}
					selected={selectedData[data?.id]?.value}
					activePortPair={activePortPair}
					portPairloading={portPairloading}
					searchParams={searchParams}
				/>
			)}
			<div className={styles.card_view}>
				{Object.keys(rfq_rates).map((item) => {
					if (!['recommended', 'spot_rates'].includes(item)) return null;
					return (
						<ViewRateCards
							key={item}
							title={item}
							spot_search={spot_search}
							rate_cards={rfq_rates[item]}
							setRadioSelected={setRadioSelected}
							radioSelected={radioSelected}
							setSelectedData={setSelectedData}
							selectedData={selectedData}
							activePortPair={activePortPair}
							spotSearch={spotSearch}
						/>
					);
				})}
			</div>

		</>
	);
}

export default ListRate;
