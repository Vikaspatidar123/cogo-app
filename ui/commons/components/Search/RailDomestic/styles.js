import { Grid } from '@cogoport/front/components';
import styled from '@cogoport/front/styled';

const { Row, Col } = Grid;

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
`;

export const FormInputsContainerRow = styled(Row)``;

export const ButtonContainer = styled.div`
	margin: 0 16px;
	padding: 0 8px;

	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
`;

export const RouteContainerCol = styled(Col)`
	margin-bottom: 16px;

	@media (min-width: 768px) {
		margin-bottom: 0;
	}
`;

export const CargoAndLoadDetailsContainerCol = styled(Col)``;
