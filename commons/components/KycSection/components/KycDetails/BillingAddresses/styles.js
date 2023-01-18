import styled from '@cogoport/front/styled';

export const Container = styled.div`
	background: #f9f9f9;

	@media (min-width: 768px) {
		display: flex;
		flex-direction: column;

		margin-top: 16px;

		border-radius: 10px;
		padding: 16px 32px 16px 32px;
	}
`;

export const BookingContactAlign = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const AddMoreButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 16px;
`;
