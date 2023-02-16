import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
`;

export const Value = styled.div`
	margin-top: 5px;
	font-weight: 300;
	font-size: 14px;
	color: #60708f;
	svg {
		width: 20px;
		height: 20px;
	}
	&.amount {
		font-size: 16px;
	}
	&.status {
		display: flex;
		font-size: 11px;
		align-items: center;
		background: #f3fff9;
		padding: 4px 8px;
		gap: 8px;
		border-radius: 4px;
		svg {
			width: 10px;
			height: 10px;
			margin-right: 4px;
		}
	}
`;
export const Label = styled.div`
	margin-top: 5px;
	font-weight: 500;
	font-size: 14px;
	color: #60708f;
`;

export const Div = styled.div`
	margin-top: 5px;
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 4px 16px;
	width: max-content;
	&.Amount {
		align-self: flex-end;
	}
`;

export const Icon = styled.div`
	position: absolute;
	right: 3%;
	top: 14px;
`;
