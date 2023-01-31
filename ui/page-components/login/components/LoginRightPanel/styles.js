import styled from '@cogoport/front/styled';

export const Container = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;

	&& .core-ui-button-root {
		background: #ed3726 !important;
		border-color: #ed3726;
	}

	.ui-tabs-list-container.active {
		border-bottom: 3px solid #ed3726;
	}

	@media (min-width: 768px) {
		align-items: flex-start;
	}
`;

export const FormContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	@media (min-width: 567px) {
		max-width: 400px;
	}
`;

export const TroubleText = styled.a`
	margin-top: 12px;
	font-weight: 400;
	font-size: 14px;
	line-height: 15px;
	color: #000000;

	.email {
		font-weight: 500;
		text-decoration: underline;
		cursor: pointer;
	}
`;
