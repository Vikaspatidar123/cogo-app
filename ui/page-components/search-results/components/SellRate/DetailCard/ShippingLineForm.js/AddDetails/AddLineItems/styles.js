import styled from '@cogoport/front/styled';

export const Container = styled.div`
	box-shadow: rgb(0 0 0 / 30%) 0px 0px 6px;
	padding: 20px;
	margin-bottom: 25px;
	border-radius: 5px;
`;

export const Text = styled.div`
	font-size: 16px;
	font-weight: 500;
	color: #393f70;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
`;

export const DetailCon = styled.div`
	margin-top: 10px;

	.core-ui-select__value-container {
		margin-top: -6px;
		margin-left: -10px;
	}

	.core-ui-select__indicators {
		margin-top: -5px;
	}
`;

export const GrayLine = styled.div`
	border: 1px dashed #393f70;
	opacity: 0.5;
	margin: 20px 0px;
	width: 100%;
`;
