import { Modal, Placeholder, Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { STEPS_INFO, MAX_STEPS } from '../../../common/constant';
import useFetchAlerts from '../../../hooks/useFetchAlert';
import AddAlerts from '../AddAlerts';
import LinkPocs from '../LinkPocs';

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
						{handleModel()}
					</div>
				)}
			</div>
		</Modal>
	);
}

export default PocModal;
