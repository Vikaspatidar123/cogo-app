import styled from '@cogoport/front/styled';

export const Container = styled.div`
	background: #fef9f9;
	border: 1px solid #cb6464;
	border-radius: 4px;
	padding: 7px 16px;
	margin-bottom: 20px;
	display: flex;
	align-items: center;
`;

export const Main = styled.div`
	padding: 0 11px;
	margin-right: auto;
`;

export const Description = styled.div`
	font-size: 14px;
	line-height: 16px;
	color: black;

	&.bold {
		font-weight: bold;
	}
`;
