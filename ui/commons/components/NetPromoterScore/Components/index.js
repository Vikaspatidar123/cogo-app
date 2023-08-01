import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import useGetNPS from '../hooks/useGetNPS';
import useSubmitNPS from '../hooks/useSubmitNPS';

import Body from './Body';
import styles from './styles.module.css';
import Title from './Title';

function NetPromoterScore() {
	const [score, setScore] = useState(10);
	const [feedback, setFeedback] = useState({
		selectedOptions : [],
		reason          : '',
	});

	const { show = false, setShow = () => {} } = useGetNPS();
	const { loading, submitNPS } = useSubmitNPS({ score, feedback });

	const handleSubmit = () => {
		setShow(false);
		submitNPS();
	};

	return (
		<Modal show={show} showCloseIcon={false} size="md" className={styles.modal}>
			<Modal.Header title={<Title />} />
			<Modal.Body>
				<Body score={score} feedback={feedback} setFeedback={setFeedback} setScore={setScore} />
			</Modal.Body>
			<Modal.Footer>
				<Button
					themeType="secondary"
					type="button"
					className={styles.button_2}
					disabled={loading}
					onClick={() => setShow(false)}
				>
					Do it later
				</Button>
				<Button type="button" onClick={handleSubmit} loading={loading} disabled={loading}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default NetPromoterScore;
