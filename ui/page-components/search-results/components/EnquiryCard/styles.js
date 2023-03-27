import styled from '@cogoport/front/styled';

export const Container = styled.div`
	background: #fff1cf;
	border: 1px solid #e0e0e0;
	box-shadow: 0px 2px 55px rgba(60, 67, 83, 0.1);
	border-radius: 10px;

	display: flex;
	justify-content: space-between;
	padding-right: 25px;

	@media (max-width: 760px) {
		flex-direction: column;
		padding-bottom: 25px;
		padding-right: 0px;
	}
	&.rfqMargin {
		margin-left: 26px;
	}
`;
