import { useEffect, useMemo, useState } from 'react';

import Ports from '../../../common/PortCards';
import getCreateContractData from '../../../helpers/getCreateContractData';
import useGetRfqSearch from '../../../hooks/useGetRfqSearch';

import Footer from './Footer';
import Rates from './Rates';
import styles from './styles.module.css';

function Details({
	spot_searches,
	portPairloading,
	activePortPair,
	listFilters,
	setListFilter = () => {},
	stats = {},
	setFormData = () => {},
	setActivePortPair = () => {},
	setShowContractCreation = () => {},
	spotSearch,
}) {
	const [cardIds, setCardIds] = useState({});
	const [selectedData, setSelectedData] = useState({});
	const [radioSelected, setRadioSelected] = useState({});

	const selectedPairs = useMemo(() => Object.keys(selectedData).reduce((acc, curr) => {
		if (selectedData[curr]) {
			return acc + 1;
		}
		return acc;
	}, 0), [selectedData]);

	const totalLength = spot_searches.length;

	const { portPairRateloading, portPairRates } = useGetRfqSearch({
		portPairloading,
		spot_searches,
		activePortPair,
	});

	const { spot_search } = portPairRates || {};

	useEffect(() => {
		const result = getCreateContractData({
			selectedData,
			spot_searches,
			cardIds,
		});
		setFormData(result);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedData]);

	return (
		<div className={styles.container}>
			<Ports
				stats={stats}
				activePortPair={activePortPair}
				setActivePortPair={setActivePortPair}
				spot_searches={spot_searches}
				selectedData={selectedData}
				portPairloading={portPairloading}
				listFilters={listFilters}
				setListFilter={setListFilter}
			/>
			<Rates
				activePortPair={activePortPair}
				setActivePortPair={setActivePortPair}
				totalLength={totalLength}
				spot_searches={spot_searches}
				spot_search={spot_search}
				portPairloading={portPairloading}
				portPairRateloading={portPairRateloading}
				selectedData={selectedData}
				setSelectedData={setSelectedData}
				setCardIds={setCardIds}
				radioSelected={radioSelected}
				setRadioSelected={setRadioSelected}
				spotSearch={spotSearch}
			/>
			<Footer
				selectedPairs={selectedPairs}
				setShowContractCreation={setShowContractCreation}
			/>
		</div>
	);
}

export default Details;
