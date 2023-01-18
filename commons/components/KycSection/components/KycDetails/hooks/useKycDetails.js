import getValue from '@/commons/utils/getValue';
import { useSelector } from '@cogoport/front/store';
import { isEmpty } from '@cogoport/front/utils';
import { useEffect, useRef, useState } from 'react';
import { getIndiaCountryId } from '@/commons/utils/getIndiaCountryId';
import CompanyDetails from '../CompanyDetails';
import BillingAddresses from '../BillingAddresses';
// import BankDetails from '../BankDetails';
import Documents from '../Documents';
import UserDetails from '../UserDetails';
import SigningAuthority from '../SigningAuthority';
import Declaration from '../Declaration';
import useGetChannelPartner from './useGetChannelPartner';
import TradeBodyInformation from '../TradeBodyInformation';

const INDIA_COUNTRY_ID = getIndiaCountryId();

const COMPONENTS_MAPPING = {
	organization: {
		title: 'Company Details',
		tooltip: 'Company Details',
		component: CompanyDetails,
	},
	billing_address: {
		title: 'Billing Address',
		tooltip: 'Billing Address',
		component: BillingAddresses,
	},
	documents: {
		title: 'Documents',
		tooltip: 'Documents',
		component: Documents,
	},
	user: {
		title: 'User Details',
		tooltip: 'User Details',
		component: UserDetails,
	},
	trade_bodies: {
		title: 'Trade Body Information',
		tooltip: 'Trade Body Information',
		component: TradeBodyInformation,
	},
	signing_authority: {
		title: 'Signing Authority',
		tooltip: 'Signing Authority',
		component: SigningAuthority,
	},
	declaration: {
		title: 'Declaration',
		tooltip: 'Declaration',
		component: Declaration,
	},
};

const STATE_CONSTANTS = {
	SET_PASSWORD: 'setPassword',
	ORGANIZATION_DETAILS: 'organizationDetails',
	PERSONA: 'persona',
	PLAN: 'plan',
	SERVICES: 'services',
	TRADE_LANES: 'tradeLanes',
	ACCOUNT_INFORMATION: 'accountInformation',
	TERMS_AND_CONDITIONS: 'termsAndConditions',
	ACCOUNT_CREATED: 'accountCreated',
	SUBSCRIPTION: 'subscription',
};

const useKycDetails = ({ kycDetails, setKycDetails }) => {
	const { verification_progress } = kycDetails;

	const {
		general: { isMobile },
		profile: {
			partner: { id: partnerId },
		},
	} = useSelector((reduxState) => reduxState);

	const [showHiddenComponentContents, setShowHiddenComponentContents] =
		useState(() => {
			const hash = {};
			Object.keys(COMPONENTS_MAPPING).forEach((componentKey) => {
				hash[componentKey] = componentKey === 'declaration';
			});

			return hash;
		});
	const [channelPartnerState, setChannelPartnerState] = useState({});
	const componentsRef = useRef({});

	const { getChannelPartner } = useGetChannelPartner({
		STATE_CONSTANTS,
		setState: setChannelPartnerState,
	});

	useEffect(() => {
		getChannelPartner({ partnerId });
	}, []);

	const focusNextIncompleteComponent = () => {
		setShowHiddenComponentContents((previousState) => {
			let componentKey = 'declaration';

			Object.keys(COMPONENTS_MAPPING).forEach((key) => {
				if (componentKey !== 'declaration') {
					return;
				}

				if ((verification_progress || {})[key] === 'incomplete') {
					componentKey = key;
				}
			});

			const element = componentsRef.current[componentKey];
			element?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'nearest',
			});

			return {
				...previousState,
				[componentKey]: true,
			};
		});
	};

	useEffect(() => {
		if (isEmpty(channelPartnerState)) {
			return;
		}

		focusNextIncompleteComponent();
	}, [
		JSON.stringify(channelPartnerState),
		JSON.stringify(verification_progress),
	]);

	const showComponents = {};

	Object.keys(COMPONENTS_MAPPING).forEach((componentKey) => {
		let showComponent = true;

		if (
			componentKey === 'billing_address' &&
			(isEmpty(channelPartnerState) ||
				channelPartnerState.organizationDetails.formValues.country_id !==
					INDIA_COUNTRY_ID)
		) {
			showComponent = false;
		}

		if (componentKey === 'bank_detail') {
			if (isEmpty(channelPartnerState)) {
				showComponent = false;
			} else {
				const { PLAN } = STATE_CONSTANTS;

				const planService = getValue(
					channelPartnerState,
					`[${PLAN}].formValues.planService`,
					'',
				);

				if (!['sell', 'both'].includes(planService)) {
					showComponent = false;
				}
			}
		}

		showComponents[componentKey] = showComponent;
	});

	const componentProps = {
		organization: {
			kycDetails,
			setKycDetails,
		},
		billing_address: {
			CONSTANTS: { COMPONENT_KEYS: { ...STATE_CONSTANTS } },
			state: channelPartnerState,
			setState: setChannelPartnerState,
			kycDetails,
			setKycDetails,
		},
		bank_detail: {
			CONSTANTS: { COMPONENT_KEYS: { ...STATE_CONSTANTS } },
			state: channelPartnerState,
			setState: setChannelPartnerState,
			kycDetails,
			setKycDetails,
		},
		documents: {
			kycDetails,
			setKycDetails,
		},
		user: {
			kycDetails,
			setKycDetails,
		},
		trade_bodies: {
			kycDetails,
			setKycDetails,
		},
		signing_authority: {
			kycDetails,
			setKycDetails,
		},
		declaration: {
			kycDetails,
			setKycDetails,
		},
	};

	return {
		isMobile,
		COMPONENTS_MAPPING,
		showComponents,
		componentProps,
		showHiddenComponentContents,
		setShowHiddenComponentContents,
		componentsRef,
		channelPartnerState,
	};
};

export default useKycDetails;
