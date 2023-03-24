import styled from '@cogoport/front/styled';

export const Container = styled.section`
	padding: 16px;
	background: #ffffff;
	box-shadow: 0px 1px 6px rgba(169, 188, 218, 0.65);
	margin-bottom: 16px;

	.core-ui-button-root.primary.md.add-invoicing-text {
		padding: 12px !important;
		width: 100% !important;
		background-color: #ffffff !important;
		font-weight: 500;
		font-size: 16px;
		color: #9ab7fe !important;
		border: 1px dashed #9ab7fe !important;
		margin-left: 0px !important;
	}
`;

export const Header = styled.header`
	display: flex;
	flex-direction: column;

	margin-bottom: 16px;
`;

export const Title = styled.h3`
	font-weight: 500;
	font-size: 22px;
	line-height: 26px;
	color: #333333;

	margin: 0;
`;

export const SelectedAddressListContainer = styled.div`
	margin-bottom: 16px;
`;

export const AddInvoicingPartyButton = styled.button`
	padding: 12px;
	width: 100%;
	cursor: pointer;

	background-color: #ffffff;
	font-weight: 500;
	font-size: 16px;
	text-transform: capitalize;

	color: #9ab7fe;
	border: 1px dashed #9ab7fe;

	border-radius: 4px;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	&:disabled {
		cursor: not-allowed;

		color: #dfe1ef;
		border: 1px dashed #dfe1ef;
	}
`;
