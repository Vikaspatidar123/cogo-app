import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import { showEnquiryFunc } from '../showEnquiry';

import EnquiryAppCard from './EnquiryAppCard';
import EnquiryPartnerCard from './EnquiryPartnerCard';
import styles from './styles.module.css';

const CreateRfqEnquiry = dynamic(
	() => import('../AdditionalCards/MultiService/RfqEnquiry'),
	{ ssr: false },
);

const CreateEnquiry = dynamic(() => import('../AdditionalCards/MultiService'), {
	ssr: false,
});

function EnquiryCard({
	detail = {},
	refetch = () => {},
	// enquiryQuota = {},
	scope = '',
	results_type,
	ratesCount = 0,
}) {
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({});

	const [apiData, setApiData] = useState({});

	const [addedServiceEnquiry, setAddedServiceEnquiry] = useState({});
	const [prefillDetails, setPrefillDetails] = useState({});
	const className = results_type === 'rfq' ? 'rfqMargin' : null;

	const { notShowEnq } = showEnquiryFunc(ratesCount, detail);

	const notShowFtlEnq =		detail?.rates_count > 0
		&& ['ftl_freight', 'ltl_freight'].includes(detail?.search_type);

	return scope === 'app' && !notShowFtlEnq ? (
		<EnquiryAppCard />
	) : (
		<div className={`${styles.container} ${className}`}>
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
		</div>
	);
}

export default EnquiryCard;
