import { IcMMinus, IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function Card({ item = [] }) {
	const [show, setShows] = useState(false);
	const { answerDetails = [], question = '' } = item || {};

	return (
		<div className={styles.main_card}>
			<div role="presentation" className={styles.card} onClick={() => setShows(!show)}>
				<div className={styles.text}>{question || ''}</div>
				<div className={styles.cursor}>
					{show ? (
						<IcMMinus width={20} height={20} onClick={() => setShows(!show)} />
					) : (
						<IcMPlus width={20} height={20} onClick={() => setShows(!show)} />
					)}
				</div>
			</div>

			<div className={show ? styles.text_div : styles.text_div_hidden}>
				<div className={styles.line} />
				{(answerDetails || []).map(({ heading = '', answer = [] }) => (
					<>
						{heading != null && (
							<div className={styles.card_text} key={heading}>
								<b>{heading || ''}</b>
							</div>
						)}
						<ul>
							{(answer || []).map((itm) => (
								<li>
									<div className={styles.answer}>{itm || ''}</div>
								</li>
							))}
						</ul>
					</>
				))}
			</div>
		</div>
	);
}

export default Card;
