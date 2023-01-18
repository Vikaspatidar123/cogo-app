import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	background: #ffffff;
	margin: 56px 32px;
	padding: 24px 32px;
	box-shadow: 0px 1px 6px rgba(169, 188, 218, 0.65);
	border-radius: 4px;

	@media (max-width: 767.99px) {
		margin: 8px;
		padding: 16px;
	}
`;
