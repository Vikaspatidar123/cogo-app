import styled from '@cogoport/front/styled';
import DeleteIcon from './icons/deleteIcon.svg';
import AddIcon from './icons/addIcon.svg';
import { Form as StyledForm } from '../../../../../styles/Form';

export const SpinnerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 30px 0;
`;

export const Container = styled.div`
	.tradeLaneHeader {
		margin: 6px 0;

		font-weight: 400;
		font-size: 16px;
		color: #333333;
	}
`;

export const Form = styled(StyledForm)`
	flex: 11;

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

export const StyledAddIcon = styled(AddIcon)`
	cursor: pointer;
	width: 28px;
	height: 28px;

	${(props) => props.useRelativePosition && `position: relative; bottom: 8px`}
`;

export const FormIconContainer = styled.div`
	display: flex;
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

	.serviceType {
		flex: 3;
		display: flex;
		justify-content: flex-start;

		display: flex;
		align-items: center;
	}

	.serviceTypeImport {
		padding: 2px 6px;
		border-radius: 5px;
		background: #dbeddb;
	}

	.serviceTypeExport {
		padding: 2px 6px;
		border-radius: 5px;
		background: #d3e5ef;
	}

	.locationName {
		flex: 3;
		display: flex;
		justify-content: flex-start;
	}

	.isAgentPresent {
		flex: 3;
		display: flex;
		justify-content: center;
	}
`;

export const AddedTradelanesContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	min-height: 60px;

	${(props) => props.showBorderBottom && `border-bottom: 1px solid #bdbdbd;`}
`;

export const LoadingStateContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export const StyledDeleteIcon = styled(DeleteIcon)`
	cursor: pointer;
	width: 20px;
	height: 20px;
`;

export const ButtonContainer = styled.div`
	width: 100%;
	margin-top: 12px;
	display: flex;
	justify-content: flex-end;
`;

export const CardContainer = styled.div`
	padding: 12px;
	border-radius: 10px;

	background: #f9f9f9;
`;
