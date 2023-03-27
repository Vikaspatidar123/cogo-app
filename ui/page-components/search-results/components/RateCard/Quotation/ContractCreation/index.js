import { useState } from 'react';
import CreateContract from './CreateContract';
import PriceLockedModal from './PriceLockedModal';

const ContractCreation = ({
	data = {},
	details,
	showContract = false,
	setShowContract = () => {},
}) => {
	const [priceLocked, setPriceLocked] = useState(false);
	const [contractData, setContractData] = useState({});

	return (
		<>
			{showContract && (
				<CreateContract
					data={data}
					details={details}
					showContract={showContract}
					setShowContract={setShowContract}
					setPriceLocked={setPriceLocked}
					setContractData={setContractData}
				/>
			)}

			{priceLocked && (
				<PriceLockedModal
					priceLocked={priceLocked}
					setPriceLocked={setPriceLocked}
					contractData={contractData}
					details={details}
				/>
			)}
		</>
	);
};

export default ContractCreation;
