import { Modal, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useNps from '../hooks/useNps';

import Feedback from './Feedback';
import MenuTitle from './MenuTitle';
import Rating from './Rating';
import styles from './styles.module.css';
import Title from './Title';

const DEFAULT_NPS = 10;

function NetPromoterScore() {
	const { t } = useTranslation(['common']);

	const [show, setShow] = useState(false);

	const [feedback, setFeedback] = useState({
		score           : DEFAULT_NPS,
		reason          : '',
		selectedOptions : [],
	});

	const { data, loading, handleSubmitNps, handleDoItLater } = useNps({ setShow, feedback });

	return (
		<>
			{data && <MenuTitle setShow={setShow} />}
			{show ?	(
				<Modal show={show} showCloseIcon={false} size="md" className={styles.modal}>
					<Modal.Header title={<Title />} />

					<Modal.Body>
						<Rating feedback={feedback} setFeedback={setFeedback} />
						<Feedback feedback={feedback} setFeedback={setFeedback} />
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
						<Button type="button" onClick={handleSubmitNps} loading={loading} disabled={loading}>
							{t('common:submit_button_label')}
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}

		</>
	);
}

export default NetPromoterScore;
