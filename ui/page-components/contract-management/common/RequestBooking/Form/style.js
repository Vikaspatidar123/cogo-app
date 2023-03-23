import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	& .ui-single-date-picker-input-container {
		border-radius: 4px;
	}
`;

export const Box = styled.div`
	width: 100%;
	padding: 16px;
	margin-bottom: 16px;

	background: #ffffff;
	border-radius: 4px;

	@media (min-width: 768px) {
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
	}
`;

export const ContainerDetails = styled.div`
	& .search-form-container {
		padding: 0;
	}

	& .search_form_route_container_col,
	& .search_form_search_btn_container_col {
		display: none;
	}

	& .search_form_cargo_details_add_services_button {
		display: none;
	}

	& .search_form_options_container_col {
		width: 100% !important;
		flex: 0 0 100% !important;
		max-width: 100% !important;
	}

	& .search_form_options_container_col__label {
		font-size: 12px;
		font-weight: 500;
		color: #333;
		text-transform: capitalize;
		margin-bottom: 2px;
	}

	& .search_form_cargo_details_sub_container.small {
		margin-top: 0;
	}
`;
