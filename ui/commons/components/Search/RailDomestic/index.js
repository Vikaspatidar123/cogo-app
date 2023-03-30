import { Button } from '@cogoport/components';

import CargoAndLoadDetailsContent from './CargoAndLoadDetailsContent';
import RoutesSearch from './RoutesSearch';
import styles from './styles.module.css';
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
		<div className={styles.container}>
			<div className={styles.form_inputs_container_row} style={{ margin: '0 16px 16px 16px' }}>
				<div className={styles.route_container_col}>
					<RoutesSearch
						ref={(r) => {
							imperativeHandleRef.current.routeSearch = r;
						}}
						importerExporterDetails={importerExporterDetails}
						searchType={searchType}
						formValues={formValues.routeSearch}
					/>
				</div>

				<div className={styles.cargo_and_load_details_container_col}>
					<CargoAndLoadDetailsContent
						ref={(r) => {
							imperativeHandleRef.current.cargoAndLoadDetailsContent = r;
						}}
						isFormSubmitted={isSearchRatesButtonClicked}
						formValues={formValues.cargoAndLoadDetailsContent}
					/>
				</div>
			</div>

			<div className={styles.button_container}>
				<Button
					type="button"
					className="primary md"
					onClick={() => onClickSearchRatesButton()}
					disabled={loading}
				>
					Search Rates
				</Button>
			</div>
		</div>
	);
}

export default RailDomestic;
