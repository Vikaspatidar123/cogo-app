// import Grid from '@cogoport/front/components/Grid';
import { useState, useEffect } from 'react';

import { HeadingIcon } from '../configuration/icon-configuration';
// import { useWindowDimensions } from '../../../common/utils/getMobileView';
import useFetchQuotaDetails from '../hooks/useFetchQuotaDetails';
import useSaveDraft from '../hooks/useSaveDraft';

import Content from './Content';
// import {
// 	Container, ContentWrapper, Heading, SVG, Wrapper,
// } from './styles';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

// const { Col } = Grid;

function TraderEligibilty() {
	const [formDetails, setFormDetails] = useState({});
	const [countryDetails, setCountryDetails] = useState();
	const {
		fetchQuotaDetails = {},
		quotaLoading = false,
		modal = false,
		serviceRates = {},
		serviceRatesLoading = false,
		setModal,
		quotaDetails,
	} = useFetchQuotaDetails();
	// const [isMobile, setIsMobile] = useState(false);

	// const { width } = useWindowDimensions();
	// useEffect(() => {
	// 	if (width < 1154) {
	// 		setIsMobile(true);
	// 	} else {
	// 		setIsMobile(false);
	// 	}
	// }, [width]);
	const { isMobile } = useSelector(({ general }) => general);

	const { createDraft, loading, draftId } = useSaveDraft();

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				{!isMobile && <div />}
				<div className={styles.heading}>
					<img src={HeadingIcon} alt="" className={styles.svg_style} />
					Trader Eligibilty Check
				</div>
			</div>
			<div className={styles.content_wrapper}>
				<Content
					quotaLoading={quotaLoading}
					setFormDetails={setFormDetails}
					fetchQuotaDetails={fetchQuotaDetails}
					serviceRatesLoading={serviceRatesLoading}
					quotaDetails={quotaDetails}
					modal={modal}
					createDraft={createDraft}
					loading={loading}
					formDetails={formDetails}
					serviceRates={serviceRates}
					setModal={setModal}
					draftId={draftId}
					setCountryDetails={setCountryDetails}
					countryDetails={countryDetails}
					isMobile={isMobile}
				/>
			</div>
		</div>
	);
}

export default TraderEligibilty;
