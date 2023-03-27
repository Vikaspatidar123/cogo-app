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
	margin-left: 15px;
	margin-right: auto;

	@media (max-width: 768px){
		width: calc(100% - 16px);
	}

		.upload-container {
			margin-top: -12px;
			padding: 10px;
			flex-direction: column;
		}	

		.upload-area{
				padding: 5px;
    			display: flex;
    			flex-direction: column;
    			margin-top: -8px;
			}
	
`;
