import styled from '@cogoport/front/styled';
import animated from '@cogo/deprecated_legacy/animated';

export const Heading = styled.div`
	font-weight: bold;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.02em;
	color: #000000;
`;

export const SubHeading = styled.div`
	font-size: 12px;
	line-height: 16px;
	letter-spacing: 0.02em;
	color: #828282;
	text-transform: initial;
`;

export const Container = styled.div`
	.ui-single-date-picker-input-container {
		width: 50%;
	}
`;

export const InputWrap = styled.div`
	.core-ui-input-root {
		width: 40%;
		height: 32px;
		font-size: 12px;
		margin-bottom: 16px;
		margin-left: 16px;
	}
`;

export const ServiceFormWrap = styled.div`
	background: #f9f9f9;
	border-radius: 4px 4px 10px 10px;
	padding: 12px 16px;
	margin: 10px 0px 16px 16px;
	width: 96%;
`;

export const ServiceCategory = styled.p`
	margin-top: 32px;
	font-weight: bold;
	font-size: 14px;
	line-height: 16px;
	letter-spacing: 0.04em;
	color: #000000;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	margin: 40px 0px;

	.core-ui-button-root {
		width: 240px;
		height: 44px;
		background: #333333;
		font-size: 14px;
	}
`;

export const AnimatedContainer = animated({
	enter: {
		translateY: [-10, 0],
		opacity: [0, 1],
		easing: 'easeInOutQuad',
		duration: 500,
	},
	exit: {
		translateY: [0, 10],
		opacity: [1, 0],
		duration: 400,
	},
});

export const FormWrap = styled.div`
	background: #f9f9f9;
	border-radius: 4px 4px 10px 10px;
	padding: 12px 16px;
	margin-bottom: 16px;
	width: 80%;
`;

export const AddServiceHeading = styled.div`
	color: #4f4f4f;
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	margin: 16px;
`;
