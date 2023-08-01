import { Modal, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import useGetNPS from '../hooks/useGetNPS';
import useSubmitNPS from '../hooks/useSubmitNPS';

import Body from './Body';
import MenuTitle from './MenuTitle';
import styles from './styles.module.css';
import Title from './Title';

const DEFAULT_NPS = 10;

function NetPromoterScore() {
	const { t } = useTranslation(['common']);

	const [show, setShow] = useState(false);
	const [score, setScore] = useState(DEFAULT_NPS);
	const [feedback, setFeedback] = useState({
		selectedOptions : [],
		reason          : '',
	});

	const { data } = useGetNPS();
	const { loading, submitNPS } = useSubmitNPS({ score, feedback });

	const handleSubmit = () => {
		setShow(false);
		submitNPS();
	};

	const handleDoItLater = () => {
		setShow(false);
		sessionStorage.setItem('npsTimeDecision', 'later');
	};

	useEffect(() => {
		const submitNpsLater = sessionStorage.getItem('npsTimeDecision') === 'later';
		setTimeout(() => {
			setShow(data && !submitNpsLater);
		}, 100);
	}, [data]);

	return (
		<>
			{data && <MenuTitle setShow={setShow} />}
			{show ?	(
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
							onClick={handleDoItLater}
						>
							{t('common:do_it_later_button_label')}
						</Button>
						<Button type="button" onClick={handleSubmit} loading={loading} disabled={loading}>
							{t('common:submit_button_label')}
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}

		</>
	);
}

export default NetPromoterScore;
