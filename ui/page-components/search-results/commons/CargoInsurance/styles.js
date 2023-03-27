import styled from '@cogoport/front/styled';
import { IcMInfo } from '@cogoport/icons-react';

export const Container = styled.div`
	.core-ui-radio-root {
		margin-top: 16px;
		display: flex;
		align-items: flex-start;
	}

	.core-ui-radio-label {
		color: #000;
	}

	.core-ui-radio-radio-container {
		flex-shrink: 0;
		margin-top: 4px;
	}

	.core-ui-input-root {
		padding: 2px 8px;

		&:focus-within {
			box-shadow: 0px 0px 0px 1px #333;
		}
	}

	.size-md {
		height: 32px !important;
	}
`;

export const BtnWrap = styled.div`
	display: flex;
	justify-content: center;
	margin-top: ${(props) => (props.secondary ? '20px' : '40px')};
`;

export const CancelBtnWrap = styled.div`
	.core-ui-button-root {
		margin-right: 20px;
		background: #ffffff;
		color: #000000;
	}
`;

export const Text = styled.div`
	font-size: 20px;
	font-weight: 700;
	margin-bottom: 10px;
`;

export const Rate = styled.div`
	display: flex;
	justify-content: space-between;

	&.final {
		border-bottom: 1px solid rgb(242 226 195);
	}
`;

export const TooltipContainer = styled.div`
	max-width: 250px;
	font-weight: 300;
	font-size: 12px;
`;

export const InfoIcon = styled(IcMInfo)`
	margin-left: 5px;
	width: 10px;
	height: 10px;
	align-items: center;
	cursor: pointer;
`;
