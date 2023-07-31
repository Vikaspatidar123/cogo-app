import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import useSubmitCsat from '../hooks/useSubmitCsat';

import Body from './Body';
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
	const [rating, setRating] = useState(5);
	const [feedback, setFeedback] = useState({
		selectedOptions : [],
		reason          : '',
	});

	const { submitCsat } = useSubmitCsat({ rating, feedback, csatInfo, serviceName, details });

	const handleSubmit = () => {
		setShowRateUs(false);
		setShow(false);
		submitCsat();
	};

	return (
		<Modal show={show} size="sm" className={styles.modal} showCloseIcon={false}>
			<Modal.Header title={<Title serviceName={serviceName} />} />
			<Modal.Body>
				<Body
					rating={rating}
					setRating={setRating}
					feedback={feedback}
					setFeedback={setFeedback}
				/>
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
