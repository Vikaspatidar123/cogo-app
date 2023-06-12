import { cl, Modal } from '@cogoport/components';
import { IcACarriageInsurancePaidTo } from '@cogoport/icons-react';

import CargoInsurance from '../../../commons/CargoInsurance';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function CargoInsurancePillContainer({
	uniq_services_list,
	importer_exporter_country_code,
	search_type,
	addCargoInsurance,
	setAddCargoInsurance,
	allowCargoInsurance,
	data,
	refetch,
	origin_country_id,
	destination_country_id,
	trade_type,
	user_id,
	service_type,
	checkout_id,
	spot_search_id,
	importer_exporter_id,
	importer_exporter,
	setOpenAddServiceModal,
	setShowCargoInsuranceIP,
}) {
	if (
		uniq_services_list.includes('cargo_insurance')
		|| !(
			GLOBAL_CONSTANTS.cargo_insurance[importer_exporter_country_code] || []
		).includes(search_type)
	) {
		return null;
	}

	return (
		<>
			<div className={styles.line} style={{ marginTop: '8px' }} />

			<div className={styles.text} style={{ marginBottom: '8px' }}>Cargo Insurance</div>

			<div
				role="presentation"
				className={cl`${styles.pill} ${styles.inactive}`}
				onClick={() => setAddCargoInsurance(true)}
				id="search_results_additional_service_cargo_insurance"
			>
				<div className={styles.flex} style={{ maxWidth: '90%' }}>
					<IcACarriageInsurancePaidTo />
					<div className={styles.services}>Cargo Insurance</div>
				</div>

				<div className={cl`${styles.add} ${styles.services_icon}`}> + </div>
			</div>

			{addCargoInsurance ? (
				<Modal
					show={addCargoInsurance}
					onClose={() => setAddCargoInsurance(false)}
					placement={!allowCargoInsurance ? '' : 'top-right'}
					width={!allowCargoInsurance ? 500 : 350}
					scroll={false}
				>
					<CargoInsurance
						setAddCargoInsurance={setAddCargoInsurance}
						data={data}
						refetch={refetch}
						origin_country_id={origin_country_id}
						destination_country_id={destination_country_id}
						trade_type={trade_type}
						user_id={user_id}
						service_type={service_type}
						checkout_id={checkout_id}
						spot_search_id={spot_search_id}
						importer_exporter_id={importer_exporter_id || importer_exporter?.id}
						importer_exporter={importer_exporter}
						allowCargoInsurance={allowCargoInsurance}
						setOpenAddServiceModal={setOpenAddServiceModal}
						setShowCargoInsuranceIP={setShowCargoInsuranceIP}
					/>
				</Modal>
			) : null}
		</>
	);
}

export default CargoInsurancePillContainer;
