// import SuccessModal from '@cogo/product/rfq/common/SuccessModal';
// import WhyContract from '@cogo/product/rfq/common/WhyContract';
// import { isEmpty } from '@cogoport/utils';
// import { useState } from 'react';

// import CreateContract from '../../common/CreateContract';
// import useCreateContractGuideAudit from '../../hooks/useCreateContractGuideAudit';
// import useListRfqSearches from '../../hooks/useListRfqSearches';

// import Details from './Details';
// import Header from './Header';
// import { Container, StyledModal } from './styles';

// import { useRouter } from '@/packages/next';
// import { useSelector } from '@/packages/store';

// function SelectQuotation() {
// 	const { query } = useRouter();
// 	const { scope } = useSelector(({ general }) => ({
// 		scope: general.scope,
// 	}));

// 	const [listFilters, setListFilter] = useState({
// 		search_type : 'all',
// 		rateFilter  : '',
// 		location    : '',
// 	});

// 	const [showModal, setShowModal] = useState('');
// 	const [showCreationContract, setShowContractCreation] = useState(false);
// 	const [formData, setFormData] = useState([]);
// 	const [activePortPair, setActivePortPair] = useState(0);

// 	const { portPairList, portPairloading, stats } = useListRfqSearches({
// 		listFilters,
// 		rfq_id: query.rfq_id,
// 		setActivePortPair,
// 		setShowModal,
// 	});
// 	const { onContractGuideClose } = useCreateContractGuideAudit({
// 		RFQID: query.rfq_id,
// 	});

// 	const renderModals = (type) => {
// 		switch (type) {
// 			case 'whyModal':
// 				return (
// 					<WhyContract
// 						setShowWhyContract={setShowModal}
// 						onContractGuideClose={onContractGuideClose}
// 					/>
// 				);
// 			case 'successModal':
// 				return <SuccessModal setShowModal={setShowModal} platform={scope} />;
// 			default:
// 				return null;
// 		}
// 	};
// 	return (
// 		<Container>
// 			{showCreationContract ? (
// 				<CreateContract
// 					setShowContractCreation={setShowContractCreation}
// 					formData={formData}
// 					setShowModal={setShowModal}
// 				/>
// 			) : (
// 				<>
// 					<Header isPortPairEmpty={isEmpty(portPairList)} />

// 					<Details
// 						formData={formData}
// 						setFormData={setFormData}
// 						spot_searches={portPairList}
// 						portPairloading={portPairloading}
// 						activePortPair={activePortPair}
// 						setActivePortPair={setActivePortPair}
// 						listFilters={listFilters}
// 						setListFilter={setListFilter}
// 						stats={stats}
// 						setShowContractCreation={setShowContractCreation}
// 					/>

// 					<StyledModal
// 						show={showModal}
// 						className={`primary ${showModal === 'whyModal' ? 'lg' : 'sm'}`}
// 						closable={showModal === 'WhyModal'}
// 						onClose={() => {
// 							if (showModal !== 'whyModal') setShowModal('');
// 						}}
// 						onOuterClick={() => {
// 							if (showModal !== 'whyModal') setShowModal('');
// 						}}
// 					>
// 						{renderModals(showModal)}
// 					</StyledModal>
// 				</>
// 			)}
// 		</Container>
// 	);
// }

// export default SelectQuotation;
