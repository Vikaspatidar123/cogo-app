import styled from '@cogoport/front/styled';

export const Container = styled.div`
	width: 100%;
`;

export const IconContainer = styled.div`
	position: absolute;
	left: 16px;
	top: 25%;
`;

export const Header = styled.div`
	font-size: 24px;
	font-weight: 500;
	padding: 16px 0;
	position: relative;
	border-radius: 4px;
	text-align: center;
	background-color: rgba(223, 225, 229, 0.6);
`;

export const Section = styled.div`
	margin-top: 16px;

	.ui-tabs-list {
		::-webkit-scrollbar {
			display: none;
		}
		justify-content: space-between;

		p.ui-tabs-list-title.horizontal {
			font-size: 22px;
			letter-spacing: 0.8px;

			&.active {
				letter-spacing: 0;
			}
		}
	}
`;
