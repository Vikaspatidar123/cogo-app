import styled from '@cogoport/front/styled';

export const Count = styled.div`
	font-weight: bold;
	font-size: 14px;

	display: flex;
	align-items: center;
	text-align: center;

	border: 1px solid #828282;
	border-radius: 50%;
	color: #828282;
	margin-right: 8px;
	margin-left: 8px;
	padding: 2px 6px;

	&.active {
		background: #2c3e50;

		color: #ffffff;
		border: 1px solid #2c3e50;
	}

	&.inactive {
		background: #bdbdbd;
		color: #ffffff;
	}
`;

export const Title = styled.span`
	font-weight: normal;
	font-size: 14px;
	line-height: 140%;
	display: flex;
	align-items: center;
	letter-spacing: 0.02em;
	color: #828282;
	margin-right: 8px;
	cursor: pointer;
	min-width: fit-content;
	@media (max-width: 768px) {
		font-size: 9px;
		min-width: auto;
	}
`;

export const Line = styled.div`
	border: 1px solid #828282;
	height: 2px;
	display: flex;
`;
