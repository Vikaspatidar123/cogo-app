import { startCase } from '@cogoport/utils';

// import { Column, RowWrapper, Label, Value, Container, Wrapper } from './styles';
import Summary from '../Summary';

import styles from './styles.module.css';

function Details({
	createDraft = () => {},
	loading = false,
	formDetails = {},
	serviceRates = {},
	quotaDetails = {},
}) {
	const { formValues = {}, countryDetails = {} } = formDetails || {};
	return (
		<div className={styles.container}>
			<div className={styles.row_wrapper}>
				{(Object.keys(formValues)?.filter((item) => item !== 'countryId') || []).map(
					(item) => (
						<div className={styles.column} xs={item === 'name' ? 12 : 6} key={item}>
							{formValues[item] && <div className={styles.label}>{startCase(item)}</div>}
							{formValues[item] && <div className={styles.value}>{startCase(formValues[item])}</div>}
						</div>
					),
				)}
				{(
					Object.keys(countryDetails)?.filter((item) => item !== 'countryCode') || []
				).map((item) => (
					<div className={styles.column} xs={12} key={item}>
						{countryDetails[item] && <div className={styles.label}>{startCase(item)}</div>}
						{countryDetails[item] && <div className={styles.value}>{countryDetails[item]}</div>}
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
				/>
			</div>
		</div>
	);
}
export default Details;
