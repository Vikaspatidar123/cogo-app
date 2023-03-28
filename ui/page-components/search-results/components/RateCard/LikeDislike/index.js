import Tooltip from '@cogoport/front/components/ToolTip';
import { IcCLike } from '@cogoport/icons-react';
import { useState } from 'react';

import DislikeFeedback from './DislikeFeedback';
import { Container, Count, MainContainer } from './styles';
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
		<MainContainer>
			<Tooltip
				placement="top"
				theme="light"
				content={rate.is_liked ? 'Liked' : 'Like'}
			>
				<Container
					className={`${rate.is_liked ? 'active' : ''}`}
					onClick={handleLikeRateCard}
				>
					<Count>{rate.likes_count}</Count>
					<IcCLike width="20px" height="16px" />
				</Container>
			</Tooltip>

			<Tooltip
				placement="top"
				theme="light"
				content={rate.is_disliked ? 'Disliked' : 'Dislike'}
			>
				<Container
					className={`dislike ${rate.is_disliked ? 'active' : ''}`}
					onClick={onClickDislike}
				>
					<IcCLike width="20px" height="16px" />
				</Container>
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
		</MainContainer>
	);
}

export default LikeDislike;
