import { Tooltip } from '@cogoport/components';
import { IcCLike } from '@cogoport/icons-react';
import { useState } from 'react';

import DislikeFeedback from './DislikeFeedback';
import styles from './styles.module.css';
import updateLikeRate from './updateLikeRate';

function LikeDislike({ details, updateRate, rate }) {
	const [show, setShow] = useState(false);

	const { handleLikeRateCard } = updateLikeRate({
		details,
		updateRate,
		rate,
	});

	const onClickDislike = () => {
		setShow(!rate.is_disliked);
	};

	return (
		<div className={styles.main_container}>
			<Tooltip
				placement="top"
				theme="light"
				content={rate.is_liked ? 'Liked' : 'Like'}
			>
				<div
					className={`${styles.container} ${rate.is_liked ? 'active' : ''}`}
					role="presentation"
					onClick={handleLikeRateCard}
				>
					<div className={styles.count}>{rate.likes_count}</div>
					<IcCLike width="20px" height="16px" />
				</div>
			</Tooltip>

			<Tooltip
				placement="top"
				theme="light"
				content={rate.is_disliked ? 'Disliked' : 'Dislike'}
			>
				<div
					className={`dislike ${styles.container} ${rate.is_disliked ? 'active' : ''}`}
					role="presentation"
					onClick={onClickDislike}
				>
					<IcCLike width="20px" height="16px" />
				</div>
			</Tooltip>

			<DislikeFeedback
				details={details}
				rate={rate}
				updateRate={updateRate}
				show={show}
				onClose={() => {
					setShow(false);
				}}
			/>
		</div>
	);
}

export default LikeDislike;
