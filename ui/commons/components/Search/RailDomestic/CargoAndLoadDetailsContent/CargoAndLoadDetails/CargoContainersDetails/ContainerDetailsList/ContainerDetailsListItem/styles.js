import styled from '@cogoport/front/styled';

export const Container = styled.section`
	display: flex;
	flex-direction: column;

	background-color: #f7f5fc;
	border: 1px solid #ded7fc;
	border-radius: 8px;
	padding: 16px;

	position: relative;

	@media (min-width: 768px) {
		transition: 0.5s;

		& .actions-button-container {
			transition: 0.5s;
		}

		&:hover {
			border: 1px solid #9b86f6;
			box-shadow: 0px 0px 6px rgba(155, 134, 246, 0.6);

			& .actions-button-container {
				border-left: 1.5px solid #9b86f6;
				border-bottom: 1.5px solid #9b86f6;
				box-shadow: 0px 0px 6px rgba(155, 134, 246, 0.6);
			}
		}
	}
`;

export const ActionsButtonContainer = styled.div`
	background-color: #f7f5fc;
	border-left: 1.5px solid #ded7fc;
	border-bottom: 1.5px solid #ded7fc;
	border-radius: 0 8px 0 8px;

	padding: 2px;

	position: absolute;
	top: 0;
	right: 0;

	& .icon-container {
		display: flex;
		flex-direction: row;

		cursor: pointer;
		padding: 4px;

		transition: 0.5s;

		&:hover {
			background-color: #ded7fc;
			border-radius: 4px;

			/* &.icon-container--edit svg {
				fill: #67c676;
			}

			&.icon-container--delete svg {
				fill: #cb6464;
			} */
		}

		&:active {
			transform: scale(0.8);
		}
	}
`;
