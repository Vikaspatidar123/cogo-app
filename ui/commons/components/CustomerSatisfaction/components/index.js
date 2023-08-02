import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import useSubmitCsat from '../hooks/useSubmitCsat';

import Rating from './Rating';
import RatingText from './RatingText';
import styles from './styles.module.css';
import Title from './Title';

function CustomerSatisfactionModal({
	show = false,
	setShow = () => {},
	serviceName = '',
	csatInfo = {},
	setShowRateUs = () => {},
	details = {},
}) {
	const [feedback, setFeedback] = useState({
		rating          : 5,
		selectedOptions : [],
		reason          : '',
	});

	const { submitCsat } = useSubmitCsat({ feedback, csatInfo, serviceName, details });

	const handleSubmit = () => {
		submitCsat();
		setShow(false);
		setShowRateUs(false);
	};

	return (
		<Modal show={show} size="sm" className={styles.modal} showCloseIcon={false}>
			<Modal.Header title={<Title serviceName={serviceName} />} />

			<Modal.Body>
				<Rating feedback={feedback} setFeedback={setFeedback} />
				<RatingText feedback={feedback} setFeedback={setFeedback} />
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="secondary"
					type="button"
					className={styles.button}
					onClick={() => setShow(false)}
				>
					Do it later
				</Button>

				<Button type="button" onClick={handleSubmit}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CustomerSatisfactionModal;
