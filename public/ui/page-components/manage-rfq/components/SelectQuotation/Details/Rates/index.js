import ListRate from './ListRate';
import styles from './styles.module.css';

function Rates({
	setCardIds,
	activePortPair,
	setActivePortPair,
	totalLength,
	spot_searches,
	portPairloading,
	spot_search,
	portPairRateloading,
	selectedData,
	setSelectedData,
	setRadioSelected,
	radioSelected,
	spotSearch,
}) {
	return (
		<div className={styles.container}>
			<ListRate
				spot_search={spot_search}
				activePortPair={activePortPair}
				setActivePortPair={setActivePortPair}
				totalLength={totalLength}
				spot_searches={spot_searches}
				portPairloading={portPairloading}
				portPairRateloading={portPairRateloading}
				selectedData={selectedData}
				setSelectedData={setSelectedData}
				setCardIds={setCardIds}
				setRadioSelected={setRadioSelected}
				radioSelected={radioSelected}
				spotSearch={spotSearch}
			/>
		</div>
	);
}

export default Rates;
