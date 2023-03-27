import styled from '@cogoport/front/styled';

export const Card = styled.div`
	display: flex;
	flex-direction: column;
	padding: 12px 6px;
	width: fit-content;
	background: #ffffff;
	border: 1px solid #e0e0e0;
	margin-top: 10px;
	border-radius: 4px;
`;

export const Title = styled.div`
	color: #4f4f4f;
	font-size: 20px;
	font-weight: 500;
	margin-bottom: 10px;
	padding-left: 30px;
`;

export const Item = styled.div`
	display: flex;
	flex: 4;
	margin-bottom: 12px;
`;

export const Dot = styled.div`
	height: 10px;
	width: 10px;
	border-radius: 100%;
	margin: 5px 10px 0px 10px;
	background-color: ${({ bg }) => bg || '#8cc1f9'};
`;

export const Label = styled.div`
	font-size: 14px;
	color: #4f4f4f;
	flex: 3;
`;
