import { useEffect, useState } from 'react';

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
	formData,
	listFilters,
	setListFilter = () => {},
	stats = {},
	setFormData = () => {},
	setActivePortPair = () => {},
	setShowContractCreation = () => {},
}) {
	const [selectedData, setSelectedData] = useState({});
	const [cardIds, setCardIds] = useState({});
	const selectedPairs = Object.keys(selectedData).length;
	const totalLength = spot_searches.length;

	const { portPairRateloading, portPairRates } = useGetRfqSearch({
		portPairloading,
		spot_searches,
		activePortPair,
	});

	const { spot_search } = portPairRates || {};
	const spotSearchId = spot_searches[activePortPair]?.id || '';

	useEffect(() => {
		const result = getCreateContractData({
			selectedData,
			spot_searches,
			cardIds,
		});
		setFormData(result);
	}, [cardIds, selectedData, setFormData, spot_searches]);

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
			/>
			<Footer
				selectedPairs={selectedPairs}
				formData={formData}
				spotSearchId={spotSearchId}
				setShowContractCreation={setShowContractCreation}
			/>
		</div>
	);
}

export default Details;
