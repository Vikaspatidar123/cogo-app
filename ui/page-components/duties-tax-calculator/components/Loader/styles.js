// import styled from '@cogoport/front/styled';

export const LoaderContainer = styled.div`
	z-index: 10000;
	width: 100%;
	height: 100%;
	.modal {
		position: absolute;
		z-index: 1000;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(6px);
	}

	.cogoloader {
		position: fixed;
		z-index: 10000;
		left: 50%;
		top: 50%;
		width: 100px !important;
		height: 100px !important;
	}

	@media screen and (max-width: 767px) {
		.cogoloader {
			left: 40%;
		}
	}
`;
