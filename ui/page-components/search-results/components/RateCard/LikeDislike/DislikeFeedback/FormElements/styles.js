import styled from '@cogoport/front/styled';

export const Container = styled.div`
	height: 360px;
	overflow-y: scroll;

	.ui-core-checkbox-root.checked {
		background-color: #356efd;
		border: none;
	}
	.business-checkbox-label {
		font-weight: 500;
		font-size: 12px;
		color: #828282;
	}
`;

export const Group = styled.div`
	margin-bottom: 12px;
`;

export const Label = styled.div`
	font-weight: 500;
	font-size: 12px;
	line-height: 14px;
	margin-bottom: 4px;
`;

export const Price = styled.div`
	display: flex;

	.core-ui-select-root.core-ui-select__container.size-md {
		max-width: 100px;
		margin-right: 12px;
	}
`;
