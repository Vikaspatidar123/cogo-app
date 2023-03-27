import styled from '@cogoport/front/styled';
import GlobalStyleJson from '../../../../project-partner/page-components/layout/components/AppLayout/Sidebar/GlobalStyleJson.json';

export const Container = styled.div`
	margin-right: 10px;
	height: 80px;
	width: calc(100% - ${GlobalStyleJson.container.width} - 20px);
	position: fixed;
	bottom: 0px;
	right: 0px;
	background: #ffffff;
	box-shadow: 0px 2px 23px rgba(0, 0, 0, 0.25);
	border-radius: 6px 6px 0px 0px;

	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 2;

	.core-ui-button-root {
		font-size: 12px;
		font-weight: 500;
		padding: 10px 20px;
		height: 34px;
	}

	@media (max-width: 768px) {
		left: 0px;
		width: 100%;
	}

	@media (max-width: 768px) {
		height: 100px;
	}
`;

export const ButtonWrap = styled.div`
	display: flex;

	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: flex-end;
	}
`;
