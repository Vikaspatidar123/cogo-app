import styled from '@cogoport/front/styled';

export const Container = styled.section`
	&.sliding-tabs {
		filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
		overflow-x: hidden;
	}
`;

export const ContentsContainer = styled.div`
	&.sliding-tabs__contents-container {
		padding: 4px;
		background-color: #ffffff;
		border-radius: 4px;

		display: flex;
		flex-direction: row;

		position: relative;
	}
`;

export const Content = styled.div`
	&.sliding-tabs__content {
		min-width: 80px;
		height: 32px;

		padding: 8px;
		border-radius: 4px;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		transition: color 0.15s ease-in;
		z-index: 2;

		${(props) => {
			const { disabled = false, marginRight = 0, color = '#356EFD' } = props;

			return `
				cursor: ${disabled ? 'not-allowed' : 'pointer'};

				margin-right: ${marginRight}px;

				&:hover,
				&.sliding-tabs__content--active {
					& .sliding-tabs__content-label {
						color: ${color};
					}
				}
			`;
		}}
	}
`;

export const ContentIcon = styled.div`
	&.sliding-tabs__content-icon {
		margin-right: 8px;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
`;

export const ContentLabel = styled.span`
	&.sliding-tabs__content-label {
		color: #2c3e50;
		font-size: 12px;
		font-weight: 400;
		text-transform: capitalize;
	}
`;

export const Slider = styled.div`
	&.sliding-tabs__slider {
		position: absolute;

		min-width: 80px;
		border-radius: 4px;

		transition: 0.25s ease-out;
		z-index: 1;

		${(props) => {
			const {
				width = 80,
				height = 32,
				backgroundColor = '#E4F0FE',
				translateX = -80,
			} = props;

			return `
				width: ${width}px;
				height: ${height}px;
				background-color: ${backgroundColor};
				transform: translateX(${translateX}px);
			`;
		}};
	}
`;
