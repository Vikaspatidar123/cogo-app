import styled from '@cogoport/front/styled';
import { Form as StyledForm } from '@/commons/styles/Form';

export const Container = styled.section`
	margin-top: 16px;
	background: #f9f9f9;
	border-radius: 10px;
	padding: 16px 32px 16px 32px;

	@media (max-width: 768px) {
		padding: 0 16px 16px;
	}
`;

export const Form = styled(StyledForm)`
	& .form-lower-label {
		color: #67c676;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
`;
