import styles from './styles.module.css';

import getCountryDetails from '@/ui/commons/utils/getCountryDetails';

function NewEmptyState({ importer_exporter_country_id = '' }) {
	const countryDetails = getCountryDetails({
		country_id: importer_exporter_country_id,
	});

	const stepsMapping = {
		Step1 : `Add an Invoicing Party registered in ${countryDetails?.name} and Submit.`,
		Step2 : 'Additional Services -> Add Cargo Insurance',
	};

	return (
		<div className={styles.main_div}>
			<div className={styles.info_container}>
				<div className={styles.info_text}>
					Note:- You have selected Cargo Insurance service for shipment. To
					continue, please select an invoicing party registered in
					{' '}
					{countryDetails?.name}
					{' '}
					for this service.
				</div>

				<div className={styles.steps_text}>Steps to add Cargo Insurance Service :- </div>

				{Object.keys(stepsMapping).map((steps) => (
					<div className={styles.steps_text} key={steps}>
						{steps}
						:
						{stepsMapping[steps]}
					</div>
				))}
			</div>
		</div>
	);
}
export default NewEmptyState;
