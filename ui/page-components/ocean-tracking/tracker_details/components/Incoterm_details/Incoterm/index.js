// import Flex from '@cogoport/front/components/Flex';
// import Skeleton from '@cogoport/front/components/Skeleton';
// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';

// import { useSaasState } from '../../../../../../common/context';
// import Button from '../../../../../../common/ui/Button';
// import Modal from '../../../../../../common/ui/Modal';
// import useFetchAlerts from '../../../../hooks/useFetchAlerts';

// import { STEPS_INFO, MAX_STEPS } from './common/constants';
// import AddAlerts from './components/add-alerts';
// import LinkPocs from './components/link-poc';
import { Modal, Placeholder, Toast, Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { STEPS_INFO, MAX_STEPS } from '../../../common/constant';
import useFetchAlerts from '../../../hooks/useFetchAlert';
import LinkPocs from '../LinkPocs';

import styles from './styles.module.css';

function IncotermModal({ isOpen, handleModal, fetchTrackerDetails, trackerDetails }) {
	const [step, setStep] = useState(0);
	const [subscriptionAlerts, setSubscriptionAlerts] = useState([]);
	// const { formRef, trackerDetails, setSubscriptionAlerts, isMobile } = useSaasState();
	const { fetchAlertDetails } = useFetchAlerts();
	const [determiningStep, setDeterminingStep] = useState(true);

	useEffect(() => {
		if (trackerDetails?.id) {
			fetchAlertDetails(trackerDetails.id)
				.then((res) => {
					if (res?.length > 0) {
						setSubscriptionAlerts(res);
						setStep(1);
					}
					setDeterminingStep(false);
				})
				.catch((err) => {
					Toast.error(err);
				});
		}
	}, [trackerDetails?.id]);

	const [loading, setLoading] = useState(false);

	const submitForm = () => {
		formRef.current?.handleSubmit?.();
	};

	const handleNext = (callApi = false) => {
		if (step < MAX_STEPS) {
			setStep((steps) => steps + 1);
		} else {
			if (callApi) {
				fetchTrackerDetails(false, true);
			}
			handleModal();
		}
	};

	const handlePrevious = () => {
		if (step > 0) {
			setStep((steps) => steps - 1);
		} else {
			handleModal();
		}
	};

	const handleModel = () => {
		if (step === 0) {
			return <LinkPocs handleNext={handleNext} setLoading={setLoading} />;
		}
		// if (step === 1) {
		// 	return <AddAlerts handleNext={handleNext} setLoading={setLoading} />;
		// }
		return null;
	};

	return (
		<Modal
			show={isOpen}
			onClose={handleModal}
			// width={isMobile ? 350 : 'none'}
			// heading={STEPS_INFO[step]?.heading}
			placement="center"
		>
			<Modal.Header title={STEPS_INFO[step]?.heading} />
			<div>
				{determiningStep ? (
					<div style={{ width: '100%' }}>
						<Placeholder margin="10px 0px" />
					</div>
				) : (
					<div>
						<Modal.Body>{handleModel()}</Modal.Body>
						<Modal.Footer>
							<div className={styles.item}>
								{step === 1 && (
									<Button
										size="lg"
										variant="ghost"
										normalCase
										onClick={handlePrevious}
									>
										Back
									</Button>
								)}
								{step === 0 && (
									<Button
										variant="ghost"
										size="lg"
										normalCase
										onClick={handleModal}
									>
										CANCEL
									</Button>
								)}
								<Button
									size="lg"
									variant="secondary"
									normalCase
									disabled={loading}
								// onClick={submitForm}
									hideOverflow
									type="submit"
								>
									{STEPS_INFO[step]?.nextButtonLabel}
								</Button>
							</div>
						</Modal.Footer>
					</div>
				)}
			</div>
		</Modal>
	);
}

export default IncotermModal;
