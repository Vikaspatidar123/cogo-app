import styled from '@cogo/styled';

export const Container = styled.div`
	padding-left: 32px;
	border-left: 1px solid #f2f2f2;
	align-items: center;
	align-self: stretch;
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	&.mobile {
		padding-left: 0px;
		justify-content: center;
		flex-direction: column;
		border-left: none;
		width: 15%;
		align-items: center;
	}
`;
