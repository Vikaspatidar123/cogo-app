import { getByKey, isEmpty } from '@cogoport/utils';
import { useEffect, useRef, useState } from 'react';

import BankDetails from '../BankDetails';
import BillingAddresses from '../BillingAddresses';
import CompanyDetails from '../CompanyDetails';
import Declaration from '../Declaration';
import Documents from '../Documents';
import SigningAuthority from '../SigningAuthority';
import TradeBodyInformation from '../TradeBodyInformation';
import UserDetails from '../UserDetails';

import useGetChannelPartner from './useGetChannelPartner';

const COMPONENTS_MAPPING = {
	organization: {
		title     : 'Company Details',
		tooltip   : 'Company Details',
		component : CompanyDetails,
	},
	billing_address: {
		title     : 'Billing Address',
		tooltip   : 'Billing Address',
		component : BillingAddresses,
	},
	bank_detail: {
		title     : 'Bank Details',
		tooltip   : 'Bank Details',
		component : BankDetails,
	},
	documents: {
		title     : 'Documents',
		tooltip   : 'Documents',
		component : Documents,
	},
	user: {
		title     : 'User Details',
		tooltip   : 'User Details',
		component : UserDetails,
	},
	trade_bodies: {
		title     : 'Trade Body Information',
		tooltip   : 'Trade Body Information',
		component : TradeBodyInformation,
	},
	signing_authority: {
		title     : 'Signing Authority',
		tooltip   : 'Signing Authority',
		component : SigningAuthority,
	},
	declaration: {
		title     : 'Declaration',
		tooltip   : 'Declaration',
		component : Declaration,
	},
};

const STATE_CONSTANTS = {
	SET_PASSWORD         : 'setPassword',
	ORGANIZATION_DETAILS : 'organizationDetails',
	PERSONA              : 'persona',
	PLAN                 : 'plan',
	SERVICES             : 'services',
	TRADE_LANES          : 'tradeLanes',
	ACCOUNT_INFORMATION  : 'accountInformation',
	TERMS_AND_CONDITIONS : 'termsAndConditions',
	ACCOUNT_CREATED      : 'accountCreated',
	SUBSCRIPTION         : 'subscription',
};

const useKycDetails = ({
	source,
	kycDetails,
	setKycDetails,
	channelPartnerDetails,
	setShow,
	onClose,
}) => {
	const { verification_progress } = kycDetails;

	const { channelPartnerState, setChannelPartnerState } = useGetChannelPartner({
		STATE_CONSTANTS,
		channelPartnerDetails,
	});

	const [showHiddenComponentContents, setShowHiddenComponentContents] =		useState(() => {
		const hash = {};
		Object.keys(COMPONENTS_MAPPING).forEach((componentKey) => {
			hash[componentKey] = componentKey === 'declaration';
		});

		return hash;
	});

	const componentsRef = useRef({});

	useEffect(() => {
		focusNextIncompleteComponent();
	}, [
		JSON.stringify(channelPartnerState),
		JSON.stringify(verification_progress),
	]);

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
				behavior : 'smooth',
				block    : 'center',
				inline   : 'nearest',
			});

			return {
				...previousState,
				[componentKey]: true,
			};
		});
	};

	const showComponents = {};
	Object.keys(COMPONENTS_MAPPING).forEach((componentKey) => {
		let showComponent = true;

		if (
			componentKey === 'billing_address'
			&& (isEmpty(channelPartnerState)
				|| channelPartnerState.organizationDetails.formValues.country_id
					!== global.INDIA_COUNTRY_ID)
		) {
			showComponent = false;
		}

		if (componentKey === 'bank_detail') {
			const { PLAN } = STATE_CONSTANTS;

			const planService =	getByKey(channelPartnerState, `[${PLAN}].formValues.planService`) || '';

			if (!['sell', 'both'].includes(planService)) {
				showComponent = false;
			}
		}

		showComponents[componentKey] = showComponent;
	});

	const componentProps = {
		organization: {
			kycDetails,
			setKycDetails,
			channelPartnerDetails,
		},
		billing_address: {
			CONSTANTS : { COMPONENT_KEYS: { ...STATE_CONSTANTS } },
			state     : channelPartnerState,
			setState  : setChannelPartnerState,
			kycDetails,
			setKycDetails,
			channelPartnerDetails,
		},
		bank_detail: {
			CONSTANTS : { COMPONENT_KEYS: { ...STATE_CONSTANTS } },
			state     : channelPartnerState,
			setState  : setChannelPartnerState,
			kycDetails,
			setKycDetails,
			channelPartnerDetails,
		},
		documents: {
			kycDetails,
			setKycDetails,
			channelPartnerDetails,
		},
		user: {
			kycDetails,
			setKycDetails,
			channelPartnerDetails,
		},
		trade_bodies: {
			kycDetails,
			setKycDetails,
			channelPartnerDetails,
		},
		signing_authority: {
			kycDetails,
			setKycDetails,
			channelPartnerDetails,
		},
		declaration: {
			source,
			kycDetails,
			setKycDetails,
			channelPartnerDetails,
			setShow,
			onClose,
		},
	};

	return {
		COMPONENTS_MAPPING,
		showComponents,
		componentProps,
		showHiddenComponentContents,
		setShowHiddenComponentContents,
		componentsRef,
	};
};

export default useKycDetails;
