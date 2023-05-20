import { startCase } from '@cogoport/utils';

import Summary from '../Summary';

import styles from './styles.module.css';

function Details({
	createDraft = () => {},
	loading = false,
	formDetails = {},
	serviceRates = {},
	quotaDetails = {},
	quotaAvailableStats,
	payment,
	address,
	setAddress,
}) {
	const { formValues = {}, countryDetails = {} } = formDetails || {};
	return (
		<div className={styles.container}>
			<div className={styles.row_wrapper_formdata}>
				{(
					Object.keys(formValues)?.filter(
						(item) => item !== 'countryId',
					) || []
				).map((item) => (
					<div
						className={`${styles.column} ${
							item !== 'name' && styles.element_style
						}`}
						key={item}
					>
						{formValues[item] && (
							<div className={styles.label}>
								{startCase(item)}
							</div>
						)}
						{formValues[item] && (
							<div className={styles.value}>
								{startCase(formValues[item])}
							</div>
						)}
					</div>
				))}
				{(
					Object.keys(countryDetails)?.filter(
						(item) => item !== 'countryCode',
					) || []
				).map((item) => (
					<div className={styles.column} key={item}>
						{countryDetails[item] && (
							<div className={styles.label}>
								{startCase(item)}
							</div>
						)}
						{countryDetails[item] && (
							<div className={styles.value}>
								{countryDetails[item]}
							</div>
						)}
					</div>
				))}
			</div>
			<div className={styles.row_wrapper}>
				<Summary
					serviceRates={serviceRates}
					quotaDetails={quotaDetails}
					createDraft={createDraft}
					loading={loading}
					formDetails={formDetails}
					quotaAvailableStats={quotaAvailableStats}
					payment={payment}
					address={address}
					setAddress={setAddress}
				/>
			</div>
		</div>
	);
}
export default Details;
