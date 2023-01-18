import styled from '@cogoport/front/styled';
import DeleteIcon from './icons/deleteIcon.svg';
import ArrowIcon from './icons/arrowIcon.svg';
import { Form as StyledForm } from '../../../../../styles/Form';

export const SpinnerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Container = styled.div`
	border-radius: 6px;

	.title {
		font-weight: 400;
		font-size: 14px;
		line-height: 130%;
		letter-spacing: -0.02em;
		color: #333333;
	}

	.tradeLaneHeader {
		margin: 12px 0;

		font-weight: 500;
		font-size: 14px;
		line-height: 130%;
		letter-spacing: -0.02em;
		color: #333333;
	}
`;

export const Form = styled(StyledForm)`
	width: 100%;
	margin-top: 16px;
	z-index: 10;

	& .core-ui-select__placeholder {
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		display: flex;
		align-items: center;
		letter-spacing: 0.02em;
		color: #858383;
	}
`;

export const FormContainer = styled.div`
	position: relative;

	.custom-select-input-chipcontainer {
		height: inherit;
	}
`;

export const TradeLanesContainer = styled.div`
	width: 100%;
	padding: 0 16px;
	border-radius: 6px;
	border: 1px solid #bdbdbd;

	max-height: 250px;
	overflow-y: auto;

	font-weight: 400;
	font-size: 12px;
	color: #333333;

	background: #ffffff;

	.origin {
		flex: 3;
		display: flex;
		justify-content: flex-start;

		display: flex;
		align-items: center;
	}

	.destination {
		flex: 3;
		display: flex;
		justify-content: flex-start;
	}

	.teu {
		flex: 3;
		display: flex;
		justify-content: center;
	}
`;

export const LoadingStateContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export const AddedTradelanesContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	min-height: 60px;

	${(props) => props.showBorderBottom && `border-bottom: 1px solid #bdbdbd;`}
`;

export const StyledArrowIcon = styled(ArrowIcon)`
	flex: 2;
`;

export const StyledDeleteIcon = styled(DeleteIcon)`
	cursor: pointer;
	width: 20px;
	height: 20px;
`;

export const ButtonContainer = styled.div`
	width: auto;
	height: 40px;

	z-index: 0;

	margin-top: 12px;
	display: flex;
	justify-content: flex-end;
`;

export const CardContainer = styled.div`
	padding: 12px;
	border-radius: 10px;

	background: #f9f9f9;
`;
