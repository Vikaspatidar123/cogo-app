import styled from '@cogoport/front/styled';

export const DIV = styled.div`
	border: ${(props) =>
		`${props.borderWidth}px solid ${props.outerBorderColor}`};
	border-radius: 50%;
	border-top: ${(props) =>
		`${props.borderWidth}px solid ${props.spinBorderColor}`};
	width: ${(props) => `${props.size}px`};
	height: ${(props) => `${props.size}px`};
	-webkit-animation: spin 2s linear infinite;
	animation: spin 2s linear infinite;

	@-webkit-keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 100%;
`;
