import styled from '@cogo/styled';

export const ButtonDiv = styled.div`
	display: flex;
	justify-content: center;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	&.input{
		width : 40px !important;
	}
`;

export const InputDiv = styled.div``;
export const ResendOtp = styled.div`
	font-weight: bold;
	font-size: 10px;
	letter-spacing: 0.02em;
	text-decoration-line: underline;
	color: #034AFD;
	cursor: pointer;
	margin: 16px 0px;
`;
