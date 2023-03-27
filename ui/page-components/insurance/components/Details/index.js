import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useMemo } from 'react';

import DraftModal from '../../common/DraftModal/index';
import useBillingAddress from '../../hooks/useBillingAddress';
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
	isMobile = false,
	draftDetailsPrefilling = {},
	policyId = '',
}) {
	const iff = () => {
		if (!isEmpty(formDetails)) {
			if (formDetails?.policyForSelf) {
				return 'SELF';
			}
			return 'OTHER';
		}
		return 'SELF';
	};
	const [countryDetails, setCountryDetails] = useState({});
	const [modal, setModal] = useState({
		pendingModal     : false,
		showSuccessModal : false,
	});
	const [uploadType, setUploadType] = useState(
		draftDetailsPrefilling?.billingType || 'CORPORATE',
	);
	const [draftModal, setDraftModal] = useState(false);
	const [ratesResponse, setRatesResponse] = useState();
	const [organizationAddressId, setOrganizationAddressId] = useState();
	const [commodityName, setCommodityName] = useState('');
	const [countryCode, setCountryCode] = useState(
		formDetails?.policyCountryCode || '',
	);
	const [insuranceType, setInsuranceType] = useState([iff()]);
	const [isBillingAddress, setisBillingAddress] = useState();
	const { query } = useRouter();

	const { addressdata = [], addressLoading = false } = useBillingAddress();

	const [checked, setChecked] = useState();

	const {
		insurance = () => {},
		createInsuranceLoading = false,
		policyIdDownload = '',
	} = useCreateInsurance();

	const { payment = () => {}, loading = false } = usePayment({
		ratesResponse,
		isBillingAddress,
		checked,
	});

	const { draftResponse, draftLoading, policyIdDraft } = useSaveDraft({
		setDraftModal,
		type,
		policyId,
		activeTab,
		uploadType,
		organizationAddressId,
		countryCode,
		insuranceType,
	});

	const { resp, insuranceLoading } = useCheckoutInsurance({
		payment,
		type,
		uploadType,
		activeTab,
		organizationAddressId,
		policyIdDraft,
		policyId,
		ratesResponse,
		countryCode,
		insuranceType,
	});

	const { checkLoading, stop, paymentStatus } = useCheckStatus({
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
		<div className={isMobile ? styles.main_mobile : styles.main}>
			{activeStepper?.[1] === 'pro' && (
				<div>
					{!addressLoading && (
						<BillingDetails
							formDetails={formDetails}
							setActiveStepper={setActiveStepper}
							setFormDetails={setFormDetails}
							insuranceType={insuranceType}
							setInsuranceType={setInsuranceType}
							addressdata={addressdata}
							setChecked={setChecked}
							checked={checked}
							addressLoading={addressLoading}
							setOrganizationAddressId={setOrganizationAddressId}
							isMobile={isMobile}
							draftResponse={draftResponse}
							draftLoading={draftLoading}
							policyid={policyIdDraft}
							policyIdCreated={policyId}
							uploadType={uploadType}
							setUploadType={setUploadType}
							setisBillingAddress={setisBillingAddress}
						/>
					)}
					{
						addressLoading && <Placeholder />
					}
				</div>
			)}
			{activeStepper?.[2] === 'pro' && (
				<CargoDetails
					formDetails={formDetails}
					setActiveStepper={setActiveStepper}
					activeStepper={activeStepper}
					setFormDetails={setFormDetails}
					activeTab={activeTab}
					setCommodityName={setCommodityName}
					commodityName={commodityName}
					isMobile={isMobile}
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
					isMobile={isMobile}
					draftResponse={draftResponse}
					draftLoading={draftLoading}
					policyid={policyIdDraft}
					activeTab={activeTab}
					type={type}
					countryCode={countryCode}
					uploadType={uploadType}
					setModal={setModal}
					showModal={modal}
				/>
			)}
			{draftModal && (
				<DraftModal draftModal={draftModal} setDraftModal={setDraftModal} />
			)}
		</div>
	);
}

export default Details;
