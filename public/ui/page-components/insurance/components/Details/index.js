import { isEmpty } from '@cogoport/utils';
import { useState, useMemo } from 'react';

import DraftModal from '../../common/DraftModal/index';
import useCheckStatus from '../../hooks/useCheckStatus';
import useCreateInsurance from '../../hooks/useCreateInsurance';
import useCheckoutInsurance from '../../hooks/useInsurance';
import usePayment from '../../hooks/usePayment';
import useSaveDraft from '../../hooks/useSaveDraft';

import BillingDetails from './BillingDetails';
import CargoDetails from './CargoDetails';
import styles from './styles.module.css';
import ValueDetails from './ValueDetails';

import { useRouter } from '@/packages/next';

function Details({
	setActiveStepper = () => {},
	activeStepper = '',
	setFormDetails = () => {},
	formDetails = {},
	type = '',
	activeTab = '',
	policyId = '',
}) {
	const { query } = useRouter();

	const [countryDetails, setCountryDetails] = useState({});
	const [draftModal, setDraftModal] = useState(false);
	const [ratesResponse, setRatesResponse] = useState();
	const [commodityName, setCommodityName] = useState('');

	const [modal, setModal] = useState({
		pendingModal     : false,
		showSuccessModal : false,
	});

	const {
		billingType = '',
		organizationAddressId: draftorganizationAddressId = '',
		organizationBillingAddressId = '',
		policyForSelf = true,
		policyCountryCode = '',
	} = formDetails || {};

	const [organizationAddress, setOrganizationAddress] = useState({
		isBillingAddress: !isEmpty(formDetails)
			? !organizationBillingAddressId
			: false,
		organizationAddressId:
		draftorganizationAddressId || organizationBillingAddressId || '',
	});

	const [countryCode, setCountryCode] = useState(policyCountryCode || '');
	const [uploadType, setUploadType] = useState(billingType || 'CORPORATE');
	const [insuranceType, setInsuranceType] = useState([!policyForSelf ? 'OTHER' : 'SELF']);
	const [checked, setChecked] = useState([organizationBillingAddressId || draftorganizationAddressId]);

	const {
		insurance = () => {},
		createInsuranceLoading = false,
		policyIdDownload = '',
		postInsuranceResponse = {},
	} = useCreateInsurance();

	const { payment = () => {}, loading = false } = usePayment({
		ratesResponse,
		organizationAddress,
	});

	const { draftResponse = () => {}, draftLoading = false, policyIdDraft = '' } = useSaveDraft({
		setDraftModal,
		type,
		policyId,
		activeTab,
		uploadType,
		organizationAddress,
		countryCode,
		insuranceType,
	});

	const { resp = () => {}, insuranceLoading = false } = useCheckoutInsurance({
		payment,
		type,
		uploadType,
		activeTab,
		organizationAddress,
		policyIdDraft,
		policyId,
		ratesResponse,
		countryCode,
		insuranceType,
	});

	const { checkLoading = false, stop = '', paymentStatus = '' } = useCheckStatus({
		query,
		insurance,
		setModal,
	});

	useMemo(() => {
		if (query?.billId) {
			setActiveStepper((prev) => ({
				...prev,
				1   : true,
				2   : true,
				3   : 'pro',
				svg : 3,
			}));
		}
	}, [query, setActiveStepper]);

	return (
		<div className={styles.main}>
			{activeStepper?.[1] === 'pro' && (
				<div>
					<BillingDetails
						formDetails={formDetails}
						setActiveStepper={setActiveStepper}
						setFormDetails={setFormDetails}
						insuranceType={insuranceType}
						setInsuranceType={setInsuranceType}
						setChecked={setChecked}
						checked={checked}
						setOrganizationAddress={setOrganizationAddress}
						organizationAddress={organizationAddress}
						draftResponse={draftResponse}
						draftLoading={draftLoading}
						policyid={policyIdDraft}
						uploadType={uploadType}
						setUploadType={setUploadType}
					/>
				</div>
			)}
			{activeStepper?.[2] === 'pro' && (
				<CargoDetails
					formDetails={formDetails}
					setActiveStepper={setActiveStepper}
					setFormDetails={setFormDetails}
					activeTab={activeTab}
					setCommodityName={setCommodityName}
					commodityName={commodityName}
					draftResponse={draftResponse}
					draftLoading={draftLoading}
					policyid={policyIdDraft}
					type={type}
					setCountryCode={setCountryCode}
					setCountryDetails={setCountryDetails}
					countryDetails={countryDetails}
				/>
			)}
			{(activeStepper[3] === 'pro' || activeStepper[4] === 'pro') && (
				<ValueDetails
					setActiveStepper={setActiveStepper}
					formDetails={formDetails}
					setFormDetails={setFormDetails}
					resp={resp}
					ratesResponse={ratesResponse}
					setRatesResponse={setRatesResponse}
					countryDetails={countryDetails}
					commodityName={commodityName}
					insuranceLoading={insuranceLoading}
					paymentLoading={loading}
					checkLoading={checkLoading}
					stop={stop}
					paymentStatus={paymentStatus}
					createInsuranceLoading={createInsuranceLoading}
					policyIdDownload={policyIdDownload}
					draftResponse={draftResponse}
					draftLoading={draftLoading}
					policyid={policyIdDraft}
					activeTab={activeTab}
					type={type}
					countryCode={countryCode}
					uploadType={uploadType}
					setModal={setModal}
					showModal={modal}
					postInsuranceResponse={postInsuranceResponse}
				/>
			)}
			{draftModal && (
				<DraftModal draftModal={draftModal} setDraftModal={setDraftModal} />
			)}
		</div>
	);
}

export default Details;
