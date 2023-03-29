import { Modal, Placeholder, Toast, Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { STEPS_INFO, MAX_STEPS } from '../../../common/constant';
import useFetchAlerts from '../../../hooks/useFetchAlert';
import AddAlerts from '../AddAlerts';
import LinkPocs from '../LinkPocs';

import styles from './styles.module.css';

function PocModal({ isOpen, handleModal, fetchTrackerDetails, trackerDetails }) {
	const [step, setStep] = useState(0);
	const [trackerPoc, setTrackerPoc] = useState([]);
	const [subscriptionAlerts, setSubscriptionAlerts] = useState([]);
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
	}, [fetchAlertDetails, trackerDetails.id]);

	const [loading, setLoading] = useState(false);

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
			return (
				<LinkPocs
					handleNext={handleNext}
					setLoading={setLoading}
					setTrackerPoc={setTrackerPoc}
					trackerPoc={trackerPoc}
					handleModal={handleModal}
				/>
			);
		}
		if (step === 1) {
			return (
				<AddAlerts
					handleNext={handleNext}
					setLoading={setLoading}
					setTrackerPoc={setTrackerPoc}
					trackerPoc={trackerPoc}
					handlePrevious={handlePrevious}
					subscriptionAlerts={subscriptionAlerts}
					trackerDetails={trackerDetails}
				/>
			);
		}
		return null;
	};

	return (
		<Modal
			show={isOpen}
			onClose={handleModal}
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
						{/* <Modal.Footer>
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
									hideOverflow
									type="submit"
								>
									{STEPS_INFO[step]?.nextButtonLabel}
								</Button>
							</div>
						</Modal.Footer> */}
					</div>
				)}
			</div>
		</Modal>
	);
}

export default PocModal;
