import styled from '@cogo/styled';

export const ButtonDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 85px;
	@media (max-width: 768px){
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
	width: 360px;
	margin-left: auto;
	margin-right: auto;

	@media (max-width: 768px){
		width: calc(100% - 16px);
	}

	.aws {

		.upload-area {
			padding: 16px 40px !important;
			height: auto !important;
		}
	}
`;
