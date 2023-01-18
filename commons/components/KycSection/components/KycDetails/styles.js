import styled from '@cogoport/front/styled';
import animate, { fadeIn } from '@cogoport/front/animate';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	background: #ffffff;
	margin: 56px 0;
	padding: 24px 32px;
	box-shadow: 0px 1px 6px rgba(169, 188, 218, 0.65);
	border-radius: 4px;

	@media (max-width: 768px) {
		box-shadow: unset;
		margin: 2px 0;
		padding: 12px 0;
	}
`;

export const HeaderText = styled.div`
	font-weight: 500;
	font-size: 16px;
	color: #333333;
	margin-bottom: 16px;
`;

export const RejectedLabel = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 24px 0;
	background: #fbe6e6;
	border: 1px solid #cb6464;
	border-radius: 4px;
	margin-top: 32px;
	margin-bottom: -24px;

	@media (max-width: 767.99px) {
		margin-bottom: 0px;
	}
`;

export const Header = styled.div`
	display: flex;

	@media (max-width: 767.99px) {
		flex-direction: column;
	}
`;

export const RejectedText = styled.div`
	font-weight: 600;
	font-size: 20px;
	color: #cb6464;
`;

export const RejectedSubText = styled.div`
	font-weight: 500;
	font-size: 14px;
	color: #cb6464;
	margin-left: 8px;
	align-self: center;
`;

export const RejectionReason = styled.div`
	font-size: 10px;
	color: #4f4f4f;
	margin-top: 4px;
`;

export const ListContainer = styled.div``;

export const ItemContainer = styled.div`
	box-shadow: 0px 1px 6px rgba(169, 188, 218, 0.65);
	border-radius: 4px;
	padding: 16px 24px;
	margin-bottom: 16px;
	position: relative;

	@media (max-width: 768px) {
		padding: 12px 16px;
	}
`;

export const ItemStroke = styled.div`
	position: absolute;
	top: 10px;
	left: 0;

	width: 6px;
	height: 32px;
	background-color: #356efd;
	border-radius: 0 4px 4px 0;

	@media (max-width: 768px) {
		height: 28px;
	}
`;

export const ItemHeader = styled.div`
	cursor: pointer;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const FadeIn = animate({
	enter: {
		...fadeIn,
		easing: 'easeInOutQuad',
		duration: 300,
	},
});
