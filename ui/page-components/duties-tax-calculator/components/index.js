/* eslint-disable react-hooks/exhaustive-deps */
import { cl } from '@cogoport/components';
import { useEffect, useState } from 'react';

import useCheckPaymentStatus from '../hook/useCheckPaymentStatus';
import useDraft from '../hook/useDraft';
import useGetQuota from '../hook/useGetQuota';
import useOceanRoute from '../hook/useOceanRoute';
import useTradeEngine from '../hook/useTradeEngine';

import Form from './Form';
import Header from './Header';
import Loader from './Loader';
import Map from './Map';
import PendingModal from './PendingModal';
import styles from './styles.module.css';
import SuccessModal from './SuccessModal';
import ValidateHsModal from './ValidateHsModal';

import { useRouter } from '@/packages/next';

function DutiesTaxCalulator() {
	const { query } = useRouter();
	const { billId = '' } = query || {};

	const [transportMode, setTransportMode] = useState('OCEAN');
	const [portDetails, setPortDetails] = useState({});
	const [showPendingModal, setShowPendingModal] = useState(false);
	const [validateModal, setValidateModal] = useState(false);
	const [verifiedData, setVerifiedData] = useState({});
	const [formStepper, setFormStepper] = useState({
		formTransportDetails : true,
		formProductDetails   : false,
		formChargeDetails    : false,
		formPayDetails       : false,
	});

	const [stepper, setStepper] = useState({
		transportDetails : true,
		productDetails   : false,
		chargeDetails    : false,
		payDetails       : false,
	});

	const { formPayDetails } = formStepper;

	const { getDraftFn, getDraftData = {}, getDraftloading, refetchDraft, draftLoading } = useDraft();
	const { postTradeEngine, tradeEngineLoading, tradeEngineResp = {}, isTradeEngineRespEmpty } = useTradeEngine();
	const { getOceanRoute, routeDataLength = false, setMapPoints, mapPoints } = useOceanRoute();

	const {
		isUserSubscribed = false,
		isQuotaLeft = false,
		prioritySequence = 0,
		quotaValue = 10,
	} = useGetQuota();

	const { stop } = useCheckPaymentStatus({
		postTradeEngine,
		setShowPendingModal,
		isUserSubscribed,
		isQuotaLeft,
		getDraftFn,
		setValidateModal,
	});

	useEffect(() => {
		if (billId) {
			localStorage.removeItem('formData');
			localStorage.removeItem('draftId');
		}
	}, []);

	return (
		<div className={styles.container}>
			<Header
				stepper={stepper}
				setStepper={setStepper}
				isTradeEngineRespEmpty={isTradeEngineRespEmpty}
				billId={billId}
			/>

			<div className={`${styles.with_mobile_view} ${styles.without_mobile_view}`}>
				<div
					className={cl`${formPayDetails && styles.form_pay_details} ${
						(!isTradeEngineRespEmpty || billId) && styles.calculate_done_form
					} ${styles.child1}`}
				>
					<Form
						stepper={stepper}
						setStepper={setStepper}
						portDetails={portDetails}
						setPortDetails={setPortDetails}
						transportMode={transportMode}
						setTransportMode={setTransportMode}
						formStepper={formStepper}
						setFormStepper={setFormStepper}
						isQuotaLeft={isQuotaLeft}
						quotaValue={quotaValue}
						isUserSubscribed={isUserSubscribed}
						postTradeEngine={postTradeEngine}
						prioritySequence={prioritySequence}
						setMapPoints={setMapPoints}
					/>
				</div>
				<div
					className={cl`${formPayDetails && styles.map_form} ${
						(!isTradeEngineRespEmpty || billId) && styles.calculate_done_map
					} ${styles.child2}`}
				>
					<Map
						portDetails={portDetails}
						transportMode={transportMode}
						billId={billId}
						getOceanRoute={getOceanRoute}
						routeDataLength={routeDataLength}
						setMapPoints={setMapPoints}
						isTradeEngineRespEmpty={isTradeEngineRespEmpty}
						mapPoints={mapPoints}
					/>
				</div>
			</div>
			{showPendingModal && (
				<PendingModal
					stop={stop}
					showPendingModal={showPendingModal}
					setShowPendingModal={setShowPendingModal}
				/>
			)}
			{(tradeEngineLoading || getDraftloading) && <Loader />}
			{!isTradeEngineRespEmpty && (
				<SuccessModal tradeEngineResp={tradeEngineResp} />
			)}
			{validateModal && (
				<ValidateHsModal
					show={validateModal}
					setShow={setValidateModal}
					hsCode={verifiedData.hsCode}
					verifiedData={verifiedData}
					setVerifiedData={setVerifiedData}
					refetchDraft={refetchDraft}
					draftLoading={draftLoading}
					getDraftData={getDraftData}
					postTradeEngine={postTradeEngine}
				/>
			)}
		</div>
	);
}

export default DutiesTaxCalulator;
