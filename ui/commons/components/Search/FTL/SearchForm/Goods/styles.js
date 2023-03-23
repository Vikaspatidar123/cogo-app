import styled from '@cogoport/front/styled';

export const GoodsContent = styled.div`
	@media (max-width: 768px) {
		.tippy-box {
			width: 360px;
		}
	}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;

	.tippy-box .tippy-arrow {
		display: none !important;
	}
	@media (max-width: 768px) {
		width: 100%;
	}
`;

export const Label = styled.label`
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	color: #393f70;
	margin-bottom: 8px;
`;

export const TermsContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 12px;
	height: 40px;
	background: #ffffff;
	border: 1px solid #cbcff5;
	border-radius: 4px;
	cursor: pointer;

	.text {
		font-weight: 400;
		font-size: 14px;
		color: #cbcff5;
	}

	&:hover {
		border: 1px solid blue;
	}
`;

export const DetailsContainer = styled.div`
	display: flex;
	align-items: center;
	height: fit-content;
	max-height: 36px;
	overflow-y: scroll;
	flex-wrap: wrap;
`;

export const Details = styled.div`
	margin-right: 4px;
	font-size: 8px;
	background: #f2efff;
	border-radius: 4px;
	padding: 2px 5px;
	font-weight: 400;
	margin-bottom: 4px;
	line-height: 14px;
`;

export const ErrorMsg = styled.div`
	margin: 0px;
	font-weight: normal;
	font-size: 12px;
	line-height: 16px;
	color: rgb(203, 100, 100);
`;
