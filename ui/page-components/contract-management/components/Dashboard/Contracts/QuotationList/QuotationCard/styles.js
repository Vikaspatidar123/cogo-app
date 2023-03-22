import styled from '@cogoport/front/styled';

export const Container = styled.div`
	padding: 12px;
	background: #ffffff;
	box-shadow: 0px 0px 4px rgba(44, 62, 80, 0.2);
	border-radius: 4px;
	margin-bottom: 25px;
	transition: 0.4s;

	:hover {
		transform: scale(1.01, 1.03);
		box-shadow: 0px 0px 4px rgba(44, 62, 80, 0.2);
		transition: 0.2s;
	}
`;
