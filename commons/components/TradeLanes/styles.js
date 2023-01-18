import styled from '@cogoport/front/styled';
import animate, { fadeIn } from '@cogoport/front/animate';

export const FadeIn = animate({
	enter: {
		...fadeIn,
		easing: 'easeInOutQuad',
		duration: 500,
	},
	exit: {
		...fadeIn,
		opacity: [1, 0],
		duration: 300,
	},
});

export const ServiceContainer = styled.div`
	margin-bottom: 16px;
`;

export const ServiceHeader = styled.div`
	margin-bottom: 16px;
`;

export const ServiceTitle = styled.div`
	padding: 6px 0;
	width: fit-content;

	color: #333333;
	font-weight: 500;
	font-size: 22px;

	border-bottom: ${(props) => `3px solid ${props.borderColor}`};
`;

export const ServiceMain = styled.div``;

export const FreightListContainer = styled.div``;

export const FreightItemContainer = styled.div`
	margin-bottom: 16px;
	background-color: #ffffff;
	box-shadow: 0px 1px 6px rgba(169, 188, 218, 0.65);
	border-radius: 8px;
`;

export const FreightItemHeader = styled.div`
	cursor: pointer;

	padding: 16px 16px 16px 24px;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	position: relative;

	&:hover {
		background-color: #f6f5fe;
	}
`;

export const FreightStroke = styled.div`
	position: absolute;
	left: 0;

	width: 6px;
	height: calc(100% - 20px);
	background-color: ${(props) => props.color};

	border-radius: 0 4px 4px 0;
`;

export const FreightItemHeaderLeft = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const FreightItemHeaderRight = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const FreightTitle = styled.div`
	color: #494848;
	font-size: 16px;
	font-weight: 500;

	margin-left: 12px;
`;

export const FreightItemMain = styled.div`
	padding: 8px 16px 16px;
	overflow-y: visible;
`;
