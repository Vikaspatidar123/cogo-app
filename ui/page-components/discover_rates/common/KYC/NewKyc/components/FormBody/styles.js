import styled from '@cogo/styled';

export const ButtonDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 26px;
	@media (max-width: 768px) {
		width: 100%;
	}
`;
export const FormData = styled.div`
	margin-left: -8px;
`;
export const Container = styled.div`
	&.otp {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}
`;

export const FormWrapper = styled.div`
	max-width: 100%;
	@media (max-width: 768px) {
		max-width: 100%;
	}
`;
