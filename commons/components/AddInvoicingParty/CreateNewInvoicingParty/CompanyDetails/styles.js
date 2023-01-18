import styled from '@cogoport/front/styled';

export const BtnGrp = styled.div`
	display: flex;
	justify-content: flex-end;
	background: #ffffff;
	padding: 16px;

	@media (min-width: 768px) {
		border-top: 1px solid #cddbff;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
	}
`;

export const Container = styled.div`
	& .form-item-label {
		color: #2c3e50;
		font-size: 12px !important;
		font-weight: 400 !important;
		margin: 16px 4px 4px !important;
	}

	& .core-ui-input-control.uppercase {
		text-transform: uppercase;
	}
`;

export const LayoutContainer = styled.div``;

export const Title = styled.div`
	color: #2c3e50;
	font-size: 16px;
	font-weight: 500;
	margin: 16px 0px 0px;
`;
