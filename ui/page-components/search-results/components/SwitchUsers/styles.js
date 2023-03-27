import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	align-items: center;

	.demo-org {
		display: none;
	}

	@media (max-width: 768px) {
		align-items: flex-start;
		flex-direction: column;
	}

	.core-ui-select__control {
		@media (max-width: 768px) {
			width: 236px;
		}
	}
`;

export const Label = styled.p`
	font-size: 12px;
	margin: 0px 10px;
	white-space: nowrap;

	@media (max-width: 768px) {
		margin: 0px;
		margin-top: 10px;
	}
`;
