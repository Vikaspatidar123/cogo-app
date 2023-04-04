import { Modal, Placeholder } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { STEPS_INFO, MAX_STEPS } from '../../../common/constant';
import useFetchAlerts from '../../../hooks/useFetchAlert';
import AddAlerts from '../AddAlerts';
import LinkPocs from '../LinkPocs';

function IncotermModal({
	isOpen,
	handleModal,
	fetchTrackerDetails,
	trackerDetails,
}) {
	const [step, setStep] = useState(0);
	const [subscriptionAlerts, setSubscriptionAlerts] = useState([]);
	const [trackerPoc, setTrackerPoc] = useState([]);
	const [determiningStep, setDeterminingStep] = useState(true);
	const { fetchAlertDetails } = useFetchAlerts({ setSubscriptionAlerts, setStep, setDeterminingStep });

	useEffect(() => {
		if (trackerDetails?.id) {
			fetchAlertDetails(trackerDetails.id);
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
					handleModal={handleModal}
					setTrackerPoc={setTrackerPoc}
					trackerPoc={trackerPoc}
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
			heading={STEPS_INFO[step]?.heading}
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

export default IncotermModal;
