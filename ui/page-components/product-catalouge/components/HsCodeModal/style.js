// import { Tag } from '@cogoport/front/components/admin';
// import Button from '@cogoport/front/components/admin/Button';
// import Grid from '@cogoport/front/components/Grid';
// import Modal from '@cogoport/front/components/Modal';
// import styled from '@cogoport/front/styled';

// import Loading from '../../assets/loading.svg';

// const { Row, Col } = Grid;

// export const StyledModal = styled(Modal)`
// 	@media screen and (max-width: 767px) {
// 		.ui-modal-dialog {
// 			width: 380px !important;
// 		}
// 	}
// 	.ui-modal-dialog {
// 		height: 520px !important;
// 		display: flex;
// 		flex-direction: column;
// 		justify-content: space-between;
// 	}

// 	.ui-modal-overlay {
// 		background-color: #4f4f4f;
// 		opacity: 0.7;
// 		height: 100% !important;
// 	}
// `;

// export const StyledHSCODElabel = styled.div`
// 	font-weight: 500;
// 	font-size: 16px;
// 	display: flex;
// 	align-items: center;
// 	padding-left: 15px;
// `;

// export const FlexDiv = styled.div`
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;

// 	.title {
// 		display: flex;
// 		align-items: center;
// 	}
// 	.search {
// 		.inputbox {
// 			border-radius: 13px;
// 			margin-right: 22px;
// 			input::-webkit-outer-spin-button,
// 			input::-webkit-inner-spin-button {
// 				-webkit-appearance: none;
// 				margin: 0;
// 			}
// 		}
// 		.labelText {
// 			translate: 0 44%;
// 		}
// 	}
// `;

// export const SelectLabel = styled.div`
// 	font-weight: 500;
// 	font-size: 14px;
// 	text-decoration-line: underline;
// 	color: #356efd;
// 	padding-right: 15px;
// 	cursor: pointer;
// `;

// export const Select = styled.div`
// 	font-weight: 500;
// 	font-size: 14px;
// `;

// export const StyledColumnHeading = styled(Col)`
// 	display: flex !important;
// 	flex-direction: row !important;
// `;

// export const FlexDiv2 = styled.div`
// 	display: flex;
// 	align-items: center;
// 	align-content: center;
// `;

// export const SelectLabel2 = styled.div`
// 	font-weight: 500;
// 	font-size: 14px;
// 	padding-right: 15px;
// 	color: #356efd;
// `;

// export const STyledROW = styled(Row)`
// 	padding: 18px;
// `;

// export const TableWrapper = styled.div`
// 	*.selected {
// 		.rowcss {
// 			border: 1px solid #db4634 !important;
// 			box-shadow: 0px 0px 7px 1px #dde0e0 !important;
// 		}
// 	}
// 	.ui-table-body-cell {
// 		border: none !important;
// 		border-collapse: separate !important;
// 		background: #ffffff !important;
// 		padding-bottom: 5px !important;
// 	}
// 	.ui-table-head-cell {
// 		border: none !important;
// 		padding: 0px !important;
// 	}
// `;

// export const DIVHSCode = styled.div`
// 	border: 1px solid #cedcea;
// 	align-items: center;
// 	display: flex;
// 	padding: 10px;
// 	border-radius: 9px;
// 	background: #fffef9;
// 	color: black;
// 	font-size: 12px;
// 	font-weight: 500;
// 	:hover {
// 		border: 0.5px solid #db4634;
// 	}
// `;

// export const SubHeading = styled.div`
// 	padding-left: 5px;
// 	color: #6b6d81;
// 	font-weight: 500;
// 	font-size: 12px;
// `;

// export const HSCodeTableWrapper = styled.div`
// 	height: 350px;
// 	overflow: scroll;
// `;

// export const AddButtonWrapper = styled.div`
// 	display: flex;
// 	justify-content: flex-end;
// 	z-index: 1;
// 	width: 100%;
// 	box-shadow: 0px -2px 4px rgba(20, 20, 43, 0.12);
// 	align-items: center;
// 	align-content: center;
// `;

// export const TableWrapper2 = styled.div`
// 	&:hover {
// 		box-shadow: none !important;
// 	}
// 	.ui-table-body-row {
// 		will-change: background-color;
// 		transition: background-color 0.1s linear;
// 		background-color: #f9f9f9;
// 		color: #333333;
// 	}
// 	.ui-table-body.ui-table-body-row:hover {
// 		background-color: red !important;
// 	}
// 	.ui-table-body-row {
// 		&.can-select {
// 			cursor: pointer !important;
// 		}
// 		&.selected {
// 			.ui-table-body-row {
// 				background-color: red !important;
// 			}
// 		}
// 	}
// 	.ui-table-head-cell {
// 		font-size: 13px !important;
// 		font-weight: 500 !important;
// 		color: #356efd !important;
// 		padding-right: 0px !important;
// 		padding-left: 5px !important;
// 	}
// 	&.ui-table-body-row:hover {
// 		border: 1px solid red;
// 	}
// `;

// export const TabHeader = styled.div`
// 	display: flex;
// 	flex-direction: row;
// 	font-weight: 400;
// 	font-size: 13px;
// 	padding-left: 18px;
// 	align-items: center;
// 	justify-content: flex-start;
// `;

// export const StyledLoading = styled(Loading)`
// 	height: 100px !important;
// `;

// export const StyledBackButton = styled(Button)`
// 	margin-right: 5px;
// 	background-color: #db4634;
// 	border-radius: 4px !important;
// 	border: none !important;
// 	color: #ffffff;

// 	&.prevBtn {
// 		text-decoration: none;
// 		padding: 8px 16px !important;
// 		margin: 0;
// 	}
// 	&.primary {
// 		background-color: #ffffff !important;
// 		color: #db4634 !important;
// 	}
// 	&.secondary {
// 		background-color: #db4634 !important;
// 		color: #ffffff !important;
// 		&.disableBtn {
// 			background-color: #e8afa8 !important;
// 		}
// 	}
// `;

// export const SelectRow = styled(Row)`
// 	display: flex;
// 	align-items: center !important;
// 	justify-content: flex-end !important;
// `;

// export const EndAlignDiv2 = styled.div`
// 	display: flex;
// 	justify-content: flex-end;
// 	margin-right: 10px;
// `;

// export const StyledTag2 = styled(Tag)`
// 	background-color: #356efd;
// 	color: white !important;
// 	font-size: 12px !important;
// `;
// export const DivFlex = styled.div`
// 	display: flex;
// `;
// export const DivRow = styled.div`
// 	display: flex;
// 	padding: 18px;
// `;
// export const Dot = styled.div`
// 	width: 15px;
// 	height: 15px;
// 	border-radius: 50px;
// 	background: ${({ color }) => (color ? '#e67f1e' : '#e0e0e0;')};
// 	border: ${({ color }) => (color ? '2px solid #e67f1e' : '2px solid #e0e0e0;')};
// `;
// export const Label = styled.div`
// 	color: ${({ color }) => (color ? '#e67f1e' : '#b7b7b8')};
// 	font-size: 12px;
// 	font-weight: 500;
// `;
// export const Line = styled.div`
// 	width: 75px;
// 	height: 0px;
// 	margin-top: 5px;
// 	border: ${({ color }) => (color ? '1px solid #e67f1e' : '1px solid #e0e0e0')};
// `;
// export const StyledDiv = styled.div`
// 	display: flex;
// 	align-items: flex-start;
// 	margin-bottom: 15px;
// `;

// export const ProductIcn = styled.div`
// 	margin-right: 8px;
// 	svg {
// 		vertical-align: middle;
// 	}
// `;

// export const Div = styled.div`
// 	display: flex;
// 	align-items: center;
// 	align-content: center;
// 	padding: 2px;
// `;
