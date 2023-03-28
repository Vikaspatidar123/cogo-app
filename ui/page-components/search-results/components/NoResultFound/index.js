import getLocationDetails from '@cogo/app-search/utils/getLocationDetails';
import isSingleLocation from '@cogo/app-search/utils/isSingleLocation';
import { usePartnerEntityType } from '@cogo/commons/hooks';
import getGeoConstants from '@cogo/globalization/constants/geo';
import { useRouter } from '@cogo/next';
import { useSelector } from '@cogo/store';
import { Button } from '@cogoport/front/components';
// import useUpdateSearch from '../../../hooks/useUpdateSearch';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import useCreateRateTask from '../../hooks/useCreateRateTask';

// import BasicPlan from './BasicPlan';
import FeedBackModal from './FeedbackModal';
import serviceableCountries from './serviceble-countries';
import {
	Main,
	Title,
	Description,
	Country,
	Line,
	Action,
	ActionContainer,
	TitleRm,
	MainContainer,
	ContainerInfo,
	Bg,
} from './styles';

const geo = getGeoConstants();

const CREATE_JOB_SERVICES = [
	'fcl_freight_local',
	'lcl_freight_local',
	'air_freight_local',
];

const CreateRfqEnquiry = dynamic(
	() => import('../AdditionalCards/MultiService/RfqEnquiry'),
	{ ssr: false },
);

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
	const [showCreateEnquiry, setShowCreateEnquiry] = useState(false);
	const { scope, organization, unPrefixedPath, skippable_checks } = useSelector(
		({ general, profile }) => ({
			scope            : general.scope,
			unPrefixedPath   : general?.unPrefixedPath,
			organization     : profile?.organization || {},
			skippable_checks : profile?.organization?.skippable_checks || [],
		}),
	);
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
	const { isChannelPartner } = usePartnerEntityType();
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

	const showAgent =		organization?.agent?.id
		&& scope === 'app'
		&& type === 'no_result_found'
		&& !skippable_checks?.includes('hide_rm_detail');
	let description = '';

	if (showAgent) {
		description = 'Don’t worry, our team is here to help.';
	} else if (type === 'no_result_found' && headerData?.expired) {
		description =			'Please search again to proceed. You can do this quickly by clicking on the lens icon on the search form above and click on search rates again';
	} else if (type === 'no_servicable_country') {
		description =			' We continue to add new countries to our network every month. If you would like to be informed when we launch in these countries, tap below.';
	}

	const title = () => {
		if (scope === 'app') {
			return 'That’s odd, it doesn’t look like we have any results for you.';
		}
		if (headerData?.expired) {
			return 'This search is expired';
		}
		return 'That’s odd, it doesn’t look like we have any results for you';
	};

	const renderTitle = () => {
		if (type === 'no_result_found') {
			return <Title>{title()}</Title>;
		}

		return (
			<Title>
				Presently, we do not offer services between
				{' '}
				<Country>{origin?.country}</Country>
				{destination && (
					<Country>{` and ${destination.country || ''}`}</Country>
				)}
				.
			</Title>
		);
	};

	const showButton =		scope === 'partner'
		&& !data?.tags?.includes('partner')
		&& !headerData.negotiation_status
		&& type === 'no_result_found';

	const showEnq = data?.id !== geo.uuid.cogo_demo_account_shipper;

	const handleButtonClick = () => {
		if (!isChannelPartner || enquiryQuota?.left_limit > 0) {
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
					<Button onClick={handleFeedback} disabled={headerData?.expired}>
						{enquiryQuota?.left_limit > 0 || !isChannelPartner
							? 'REQUEST FOR RATE'
							: 'BUY NOW'}
					</Button>
				  )
				: showButton && (
					<Button onClick={handleButtonClick} disabled={headerData?.expired}>
						{enquiryQuota?.left_limit > 0 || !isChannelPartner
							? 'CREATE ENQUIRY'
							: 'BUY NOW'}
					</Button>
				  )}
		</div>
	);

	const renderJobButton = () => (
		<div>
			<Button onClick={handleCreateJob} disabled={rateTaskLoad}>
				Request Rate
			</Button>
		</div>
	);

	return (
		<MainContainer>
			<Main className={type === 'no_result_found' && 'no_result_found'}>
				{renderTitle()}
				<Description>{description}</Description>
				{/* {isChannelPartner ? <BasicPlan enquiryQuota={enquiryQuota} /> : null} */}

				{showAgent && (
					<>
						<TitleRm>Contact Your Key Account Manager Now</TitleRm>
						<ActionContainer>
							<Action
								onClick={() => goTo(`mailto:${organization?.agent?.email}`)}
								style={{ display: 'inline' }}
							>
								{`Name : ${organization?.agent?.name}`}
							</Action>

							<Action
								onClick={() => goTo(`mailto:${organization?.agent?.email}`)}
								style={{ display: 'inline' }}
							>
								{`Email : ${organization?.agent?.email}`}
							</Action>

							{organization?.agent?.mobile_number && (
								<Action
									onClick={() => goTo(`tel:${organization?.agent?.mobile_number}`)}
									style={{ display: 'inline' }}
								>
									{`Phone/WhatsApp : ${organization?.agent?.mobile_country_code} ${organization?.agent?.mobile_number}`}
								</Action>
							)}
						</ActionContainer>
					</>
				)}

				{type === 'no_servicable_country' && (
					<>
						<Line />
						<Description>
							{'Meanwhile, you can book shipments to and from '}
							{serviceableCountries.map((country) => (
								<>
									<span role="img" aria-label={`flag ${country.name}`}>
										{country.flag}
									</span>
									<b>{country.name}</b>
								</>
							))}
							<Button
								className="blue"
								onClick={newSearch}
								style={{ display: 'inline-block' }}
							>
								Try a new search
							</Button>
						</Description>
					</>
				)}
			</Main>

			<ContainerInfo>
				{showEnq && create_enquiry_check ? renderButtons() : renderJobButton()}
				<Bg
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-noresults.svg"
					style={{ width: 250, height: 250 }}
				/>
			</ContainerInfo>

			{results_type === 'rfq' ? (
				<CreateRfqEnquiry
					detail={headerData}
					show={showCreateEnquiry}
					refetch={refetch}
					onClose={() => setShowCreateEnquiry(false)}
					enquiryQuota={enquiryQuota}
					results_type={results_type}
				/>
			) : (
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
			)}
			{showFeedbackModal ? (
				<FeedBackModal
					onClose={() => {
						setShowFeedBackModal(false);
					}}
					show={showFeedbackModal}
					details={headerData}
				/>
			) : null}
		</MainContainer>
	);
}

export default NoResultFound;
