// import WhyContract from '@cogo/product/rfq/common/WhyContract';
import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import CreateContract from '../../common/CreateContract';
import useCreateContractGuideAudit from '../../hooks/useCreateContractGuideAudit';
import useListRfqSearches from '../../hooks/useListRfqSearches';

import Details from './Details';
import Header from './Header';
import SuccessModal from './SuccessModal';
import WhyContract from './WhyContract';

import { useRouter } from '@/packages/next';

function SelectQuotation() {
	const { query } = useRouter();

	const [listFilters, setListFilter] = useState({
		search_type : 'all',
		rateFilter  : '',
		location    : '',
	});

	const [showModal, setShowModal] = useState('');
	const [showCreationContract, setShowContractCreation] = useState(false);
	const [formData, setFormData] = useState([]);
	const [activePortPair, setActivePortPair] = useState(0);

	const { portPairList, portPairloading, stats } = useListRfqSearches({
		listFilters,
		rfq_id: query.rfq_id,
		setActivePortPair,
		setShowModal,
	});
	const { onContractGuideClose } = useCreateContractGuideAudit({
		RFQID: query.rfq_id,
	});

	const renderModals = (type) => {
		switch (type) {
			case 'whyModal':
				return (
					<WhyContract
						setShowWhyContract={setShowModal}
						onContractGuideClose={onContractGuideClose}
					/>
				);
			case 'successModal':
				return <SuccessModal />;
			default:
				return null;
		}
	};
	return (
		<div>
			{showCreationContract ? (
				<CreateContract
					setShowContractCreation={setShowContractCreation}
					formData={formData}
					setShowModal={setShowModal}
				/>
			) : (
				<>
					<Header isPortPairEmpty={isEmpty(portPairList)} />

					<Details
						setFormData={setFormData}
						spot_searches={portPairList}
						portPairloading={portPairloading}
						activePortPair={activePortPair}
						setActivePortPair={setActivePortPair}
						listFilters={listFilters}
						setListFilter={setListFilter}
						stats={stats}
						setShowContractCreation={setShowContractCreation}
						spotSearch={portPairList?.[activePortPair] || {}}
					/>

					<Modal
						show={showModal}
						size={showModal === 'whyModal' ? 'lg' : 'sm'}
						showCloseIcon={showModal === 'WhyModal'}
						onClose={() => {
							if (showModal !== 'whyModal') setShowModal('');
						}}
						closeOnOuterClick={() => {
							if (showModal !== 'whyModal') setShowModal('');
						}}
					>
						{renderModals(showModal)}
					</Modal>
				</>
			)}
		</div>
	);
}

export default SelectQuotation;
