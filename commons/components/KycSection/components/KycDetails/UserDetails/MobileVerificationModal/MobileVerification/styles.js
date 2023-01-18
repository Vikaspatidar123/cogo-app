import styled from '@cogoport/front/styled';
import { Button as CogoButton } from '@cogoport/front/components/admin';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 16px;
`;

export const Title = styled.div`
	color: #333333;
	font-size: 16px;
	font-weight: 500;
	margin-bottom: 16px;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;

	& .form-item-container .form-item-label {
		all: unset;
		margin-bottom: 8px;
		color: #858484;
		font-size: 12px;
		font-weight: 400;
	}

	.core-ui-select__indicators {
		height: 40px;
	}
`;

export const Button = styled(CogoButton)`
	width: 100%;
	margin-top: 16px;
	padding: 8px;
`;

export const OtpContainer = styled.div`
	margin: 16px 0;
`;
