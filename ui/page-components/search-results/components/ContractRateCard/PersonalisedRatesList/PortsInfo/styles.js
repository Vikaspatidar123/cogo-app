import styled from '@cogoport/front/styled';

export const Container = styled.div`
	&.ports-info__container {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 8px;
	}

	& .ports-info__port-name {
		margin: 0;
		color: #393f70;
		font-size: 14px;
		font-weight: 500;
		line-height: 12px;
		margin-top: 4px;

		@media (min-width: 768px) {
			max-width: 200px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	& .ports-info__ports-separator__container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		& .ports-connection-svg {
			width: 50px;
			height: 50px;
		}

		& .ports-direction-svg {
			width: 150px;
			height: 20px;
		}
	}

	.way {
		text-align: center;
		font-weight: 300;
		font-size: 12px;
		color: #333333;
	}
`;

export const PortNameTooltip = styled.span`
	font-size: 12px;
	font-weight: 400;
`;
