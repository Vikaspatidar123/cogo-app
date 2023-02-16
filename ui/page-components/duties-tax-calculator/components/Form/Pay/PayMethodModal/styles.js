// import styled from '@cogoport/front/styled';
// import Modal from '@cogoport/front/components/admin/Modal';

export const StyledModal = styled(Modal)`
	.ui-modal-dialog {
		padding: 0;
	}
`;

export const Container = styled.div``;

export const Heading = styled.div`
	text-align: center;
	font-size: 17px;
	margin: 45px 0;
	color: #4b5c6d;

	@media screen and (max-width: 767px) {
		margin: 35px;
	}
`;

export const CardContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin-top: 55px;
	margin-bottom: 70px;

	@media screen and (max-width: 767px) {
		flex-direction: column;
		align-items: center;
		margin-top: 0;
		margin-bottom: 30px;
	}
`;

export const Card = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 150px;
	height: 150px;
	border: 1px solid #dee7f1;
	border-radius: 8px;
	cursor: pointer;
	&:hover {
		box-shadow: 0px 12px 32px 1px #dfe8fa99;
		.text {
			font-weight: 500;
		}
	}
	&.selectedCard {
		background: #fef8f7;
		border: 1px solid #ee3425;

		.text {
			font-weight: 500;
		}
	}

	@media screen and (max-width: 767px) {
		flex-direction: row;
		height: 100px;
		width: 250px;
		margin-bottom: 30px;
	}
`;
export const Row = styled.div`
	display: flex;
`;

export const Dot = styled.div`
	position: absolute;
	top: 10px;
	left: 10px;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: #db4634;
	box-shadow: 0 0 7px #fff, 0 0 0px #fff, 0 0 4px #f00, 0 0 12px #f00;
`;
export const Txt = styled.div`
	margin-top: 10px;
	color: #4b5c6d;
	width: 55%;
	text-align: center;
	font-weight: 300;
`;
