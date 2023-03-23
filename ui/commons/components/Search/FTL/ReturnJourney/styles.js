import styled from '@cogoport/front/styled';

export const Container = styled.div`
	padding: 16px 0;
	border-top: 1px solid #ded7fc;
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	margin: 24px 8px;
`;

export const LocationContainer = styled.div`
	width: 40%;
	display: flex;
	flex-direction: column;
	cursor: not-allowed;

	@media (max-width: 768px) {
		width: 100%;
		padding-bottom: 10px;
	}
`;

export const LocationText = styled.p`
	margin: 0;
	padding: 9px;
	background: #dfe1ef;
	border: 1px solid #cbcff5;
	border-radius: 4px;
	font-size: 14px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #a8acce;
`;

export const TouchPointContainer = styled.div`
	margin: 10px 0;
	display: flex;
	flex-direction: column;
	width: auto;
`;

export const Label = styled.label`
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	color: #393f70;
	display: flex;
	margin-bottom: 8px;
`;

export const Arrow = styled.div`
	text-align: center;

	@media (max-width: 540px) {
		display: none;
	}
`;

export const Heading = styled.p`
	font-size: 20px;
	margin: 0;
	color: #393f70;
	margin-bottom: 16px;
`;

export const HaltTimeContainer = styled.div`
	margin-left: 16px;
	width: 15%;

	.form-layout-root-col {
		padding-right: 0;
	}

	.core-ui-select__value-container {
		padding: 0 8px;
	}

	.core-ui-select__control {
		border: 1px solid #cbcff5;
		min-height: 40px !important;
	}

	.core-ui-input-root {
		min-height: 40px !important;
		border: 1px solid #cbcff5 !important;
	}

	@media (max-width: 768px) {
		margin-left: 0px;
	}
`;

export const ErrorMsg = styled.div`
	margin: 0px;
	font-weight: normal;
	font-size: 12px;
	line-height: 16px;
	color: rgb(203, 100, 100);
`;

export const RouteTouchPointContainer = styled.div`
	width: 55%;
	display: flex;
	justify-content: space-between;
`;
