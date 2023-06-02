// import useUpdateSearch from '../../../hooks/useUpdateSearch';
import { Button } from '@cogoport/components';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

// eslint-disable-next-line import/order
import useCreateRateTask from '../../hooks/useCreateRateTask';

// import BasicPlan from './BasicPlan';
import getLocationDetails from '../../utils/getLocationDetails';
import isSingleLocation from '../../utils/isSingleLocation';

import FeedBackModal from './FeedbackModal';
import serviceableCountries from './serviceble-countries';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';
import getGeoConstants from '@/ui/commons/constants/geo';

const CREATE_JOB_SERVICES = [
	'fcl_freight_local',
	'lcl_freight_local',
	'air_freight_local',
];

const CreateEnquiry = dynamic(() => import('../AdditionalCards/MultiService'), {
	ssr: false,
});

function NoResultFound({
	// id = '',
	headerData = {},
	type = '',
	refetch = () => {},
	enquiryQuota = {},
	results_type,
	data,
}) {
	const geo = getGeoConstants();
	const [showCreateEnquiry, setShowCreateEnquiry] = useState(false);
	const { scope, organization, unPrefixedPath, skippable_checks } = useSelector(({ general, profile }) => ({
		scope            : general.scope,
		unPrefixedPath   : general?.unPrefixedPath,
		organization     : profile?.organization || {},
		skippable_checks : profile?.organization?.skippable_checks || [],
	}));
	const create_enquiry_check = !CREATE_JOB_SERVICES.includes(
		headerData?.search_type,
	);

	const { loading: rateTaskLoad, handleCreateJob } = useCreateRateTask({
		headerData,
	});

	const [formData, setFormData] = useState({});

	const [apiData, setApiData] = useState({});

	const [showFeedbackModal, setShowFeedBackModal] = useState(false);

	const [addedServiceEnquiry, setAddedServiceEnquiry] = useState({});
	const [prefillDetails, setPrefillDetails] = useState({});
	const { search_type } = headerData;

	const origin = getLocationDetails({}, headerData, 'origin');
	const destination = !isSingleLocation(search_type)
		? getLocationDetails({}, headerData, 'destination')
		: null;

	const { push } = useRouter();

	const newSearch = () => {
		push('/book');
	};

	const goTo = (href) => {
		if (typeof window !== 'undefined') {
			window.open(href);
		}
	};

	const showAgent = organization?.agent?.id
        && type === 'no_result_found'
        && !skippable_checks?.includes('hide_rm_detail');
	let description = '';

	if (showAgent) {
		description = 'Don’t worry, our team is here to help.';
	} else if (type === 'no_result_found' && headerData?.expired) {
		description = 'Please search again to proceed. You can do this quickly'
            + 'by clicking on the lens icon on the search form above and click on search rates again';
	} else if (type === 'no_servicable_country') {
		description = ' We continue to add new countries to our network every month.'
            + ' If you would like to be informed when we launch in these countries, tap below.';
	}

	const title = () => {
		if (headerData?.expired) {
			return 'This search is expired';
		}
		return 'That’s odd, it doesn’t look like we have any results for you';
	};

	const renderTitle = () => {
		if (type === 'no_result_found') {
			return <div className={styles.title}>{title()}</div>;
		}

		return (
			<div className={styles.title}>
				Presently, we do not offer services between
				<div className={styles.country}>{origin?.country}</div>
				{destination && (
					<div className={styles.country}>
						{` and ${destination.country || ''}`}
					</div>
				)}
				.
			</div>
		);
	};

	const showButton = scope === 'partner'
        && !data?.tags?.includes('partner')
        && !headerData.negotiation_status
        && type === 'no_result_found';

	const showEnq = data?.id !== geo.uuid.cogo_demo_account_shipper;

	const handleButtonClick = () => {
		if (enquiryQuota?.left_limit > 0) {
			setShowCreateEnquiry(true);
		} else {
			push(
				`/pricing/[service_type]?afterPaymentUrl=${unPrefixedPath}`,
				`/pricing/spot-negotiation?afterPaymentUrl=${unPrefixedPath}`,
			);
		}
	};

	const handleFeedback = () => {
		setShowFeedBackModal(true);
	};
	// const requestRateServices = ['air_freight', 'fcl_freight', 'ftl_freight'];
	const requestRateServices = [];

	const renderButtons = () => (
		<div>
			{requestRateServices.includes(headerData?.search_type)
				? showButton && (
					<Button
						onClick={handleFeedback}
						disabled={headerData?.expired}
					>
						{enquiryQuota?.left_limit > 0
							? 'REQUEST FOR RATE'
							: 'BUY NOW'}
					</Button>
				)
				: showButton && (
					<Button
						onClick={handleButtonClick}
						disabled={headerData?.expired}
					>
						{enquiryQuota?.left_limit > 0
							? 'CREATE ENQUIRY'
							: 'BUY NOW'}
					</Button>
				)}
		</div>
	);

	const renderJobButton = () => (
		<div>
			<Button
				themeType="accent"
				onClick={handleCreateJob}
				disabled={rateTaskLoad}
			>
				Request Rate
			</Button>
		</div>
	);

	return (
		<div className={styles.main_container}>
			<div
				className={`${styles.main} ${
					type === styles.no_result_found && styles.no_result_found
				}`}
			>
				{renderTitle()}
				<div className={styles.description}>{description}</div>
				{showAgent && (
					<>
						<div className={styles.title_rm}>
							Contact Your Key Account Manager Now
						</div>
						<div className={styles.action_container}>
							<Button
								onClick={() => goTo(`mailto:${organization?.agent?.email}`)}
								style={{ display: 'inline' }}
								size="md"
								themeType="linkUi"
							>
								{`Name : ${organization?.agent?.name}`}
							</Button>

							<Button
								onClick={() => goTo(`mailto:${organization?.agent?.email}`)}
								style={{ display: 'inline' }}
								size="md"
								themeType="linkUi"
							>
								{`Email : ${organization?.agent?.email}`}
							</Button>

							{organization?.agent?.mobile_number && (
								<Button
									onClick={() => goTo(
										`tel:${organization?.agent?.mobile_number}`,
									)}
									style={{ display: 'inline' }}
									size="md"
									themeType="linkUi"
								>
									{`Phone/WhatsApp : 
									${organization?.agent?.mobile_country_code} ${organization?.agent?.mobile_number}`}
								</Button>
							)}
						</div>
					</>
				)}

				{type === 'no_servicable_country' && (
					<>
						<div className={styles.line} />
						<div className={styles.description}>
							{'Meanwhile, you can book shipments to and from '}
							{serviceableCountries.map((country) => (
								<>
									<span
										role="img"
										aria-label={`flag ${country.name}`}
									>
										{country.flag}
									</span>
									<b>{country.name}</b>
								</>
							))}
							<Button
								className={styles.blue}
								size="sm"
								onClick={newSearch}
								themeType="accent"
								style={{ display: 'inline-block', marginLeft: '10px' }}
							>
								Try a new search
							</Button>
						</div>
					</>
				)}
			</div>

			<div className={styles.container_info}>
				{showEnq && create_enquiry_check
					? renderButtons()
					: renderJobButton()}
				<img
					className={styles.bg}
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-noresults.svg"
					style={{ width: 250, height: 250 }}
					alt="cogo"
				/>
			</div>

			<CreateEnquiry
				detail={headerData}
				show={showCreateEnquiry}
				refetch={refetch}
				onClose={() => setShowCreateEnquiry(false)}
				enquiryQuota={enquiryQuota}
				results_type={results_type}
				formData={formData}
				setFormData={setFormData}
				setPrefillDetails={setPrefillDetails}
				prefillDetails={prefillDetails}
				apiData={apiData}
				setApiData={setApiData}
				addedServiceEnquiry={addedServiceEnquiry}
				setAddedServiceEnquiry={setAddedServiceEnquiry}
			/>
			{showFeedbackModal ? (
				<FeedBackModal
					onClose={() => {
						setShowFeedBackModal(false);
					}}
					show={showFeedbackModal}
					details={headerData}
				/>
			) : null}
		</div>
	);
}

export default NoResultFound;
