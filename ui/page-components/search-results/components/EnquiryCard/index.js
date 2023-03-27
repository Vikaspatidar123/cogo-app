import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import EnquiryAppCard from './EnquiryAppCard';
import { Container } from './styles';
import EnquiryPartnerCard from './EnquiryPartnerCard';
import { showEnquiryFunc } from '../showEnquiry';

const CreateRfqEnquiry = dynamic(
	() => import('../AdditionalCards/MultiService/RfqEnquiry'),
	{ ssr: false },
);

const CreateEnquiry = dynamic(() => import('../AdditionalCards/MultiService'), {
	ssr: false,
});

const EnquiryCard = ({
	detail = {},
	refetch = () => {},
	// enquiryQuota = {},
	scope = '',
	results_type,
	ratesCount = 0,
}) => {
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({});

	const [apiData, setApiData] = useState({});

	const [addedServiceEnquiry, setAddedServiceEnquiry] = useState({});
	const [prefillDetails, setPrefillDetails] = useState({});
	const className = results_type === 'rfq' ? 'rfqMargin' : null;

	const { notShowEnq } = showEnquiryFunc(ratesCount, detail);

	const notShowFtlEnq =
		detail?.rates_count > 0 &&
		['ftl_freight', 'ltl_freight'].includes(detail?.search_type);

	return scope === 'app' && !notShowFtlEnq ? (
		<EnquiryAppCard />
	) : (
		<Container className={className}>
			{!notShowEnq && !notShowFtlEnq ? (
				<EnquiryPartnerCard data={detail} setShow={setShow} />
			) : null}
			{show && results_type === 'rfq' ? (
				<CreateRfqEnquiry
					show={show}
					onClose={() => setShow(false)}
					detail={detail}
					refetch={refetch}
					results_type={results_type}
				/>
			) : null}

			{show && results_type !== 'rfq' ? (
				<CreateEnquiry
					show={show}
					onClose={() => setShow(false)}
					detail={detail}
					refetch={refetch}
					results_type={results_type}
					formData={formData}
					setFormData={setFormData}
					setApiData={setApiData}
					apiData={apiData}
					addedServiceEnquiry={addedServiceEnquiry}
					setAddedServiceEnquiry={setAddedServiceEnquiry}
					prefillDetails={prefillDetails}
					setPrefillDetails={setPrefillDetails}
				/>
			) : null}
		</Container>
	);
};

export default EnquiryCard;
