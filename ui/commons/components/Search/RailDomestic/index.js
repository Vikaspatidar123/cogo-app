import { Button } from '@cogoport/front/components/admin';

import CargoAndLoadDetailsContent from './CargoAndLoadDetailsContent';
import RoutesSearch from './RoutesSearch';
import {
	Container,
	FormInputsContainerRow,
	ButtonContainer,
	RouteContainerCol,
	CargoAndLoadDetailsContainerCol,
} from './styles';
import useRailDomestic from './useRailDomestic';

function RailDomestic({
	data: searchData,
	importerExporterDetails,
	searchType,
	onPush,
}) {
	const {
		loading,
		imperativeHandleRef,
		onClickSearchRatesButton,
		isSearchRatesButtonClicked,
		formValues,
	} = useRailDomestic({
		importerExporterDetails,
		searchType,
		searchData,
		onPush,
	});

	return (
		<Container>
			<FormInputsContainerRow style={{ margin: '0 16px 16px 16px' }}>
				<RouteContainerCol xs={12} md={8}>
					<RoutesSearch
						ref={(r) => {
							imperativeHandleRef.current.routeSearch = r;
						}}
						importerExporterDetails={importerExporterDetails}
						searchType={searchType}
						formValues={formValues.routeSearch}
					/>
				</RouteContainerCol>

				<CargoAndLoadDetailsContainerCol xs={12} md={4}>
					<CargoAndLoadDetailsContent
						ref={(r) => {
							imperativeHandleRef.current.cargoAndLoadDetailsContent = r;
						}}
						isFormSubmitted={isSearchRatesButtonClicked}
						formValues={formValues.cargoAndLoadDetailsContent}
					/>
				</CargoAndLoadDetailsContainerCol>
			</FormInputsContainerRow>

			<ButtonContainer>
				<Button
					type="button"
					className="primary md"
					onClick={() => onClickSearchRatesButton()}
					disabled={loading}
				>
					Search Rates
				</Button>
			</ButtonContainer>
		</Container>
	);
}

export default RailDomestic;
