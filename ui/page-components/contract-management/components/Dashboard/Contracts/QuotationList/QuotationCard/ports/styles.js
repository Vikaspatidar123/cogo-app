import styled from '@cogoport/front/styled';
import { Grid } from '@cogoport/front/components';
import Button from '@cogoport/front/components/admin/Button';

const { Col, Row } = Grid;

export const Container = styled.div`
	display: flex;
	margin-top: 12px;
`;

export const StyledRow = styled(Row)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
`;

export const StyledCol = styled(Col)`
	padding: 10px;
	display: flex;
	align-items: center;
	@media (max-width: 768px) {
		border: 1px solid #f2f2f2;
		margin-top: 10px;
	}
`;

export const PortPairs = styled.div`
	display: flex;
	align-items: center;
	width: 86%;
`;

export const ViewMore = styled.div`
	color: #2c3e50;
	font-size: 14px;
	margin-bottom: 5px;
`;

export const Actions = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-left: 1px solid #f2f2f2;
`;
export const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 12px;
`;
export const RouteContainer = styled.div`
	padding: 6px;
	border-bottom: 1px solid #e0e0e0;

	&:last-child {
		border: none;
	}
`;

export const ViewMoreBtn = styled(Button)`
	color: #221f20;
	margin-bottom: 10px;
	width: 125px;
	height: 30px;
`;
