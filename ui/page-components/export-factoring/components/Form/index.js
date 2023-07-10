import ApplicationProcess from '../ApplicationProcess';
import BasicDetails from '../BasicDetails';
import CompanyInformation from '../CompanyInformation';
import DirectorInformation from '../DirectorInformation';
import OfferLetterDetails from '../OfferLetterDetails';
import { OfferLetterWaiting } from '../WaitingScreens';

import styles from './styles.module.css';

const RENDERING_FORM = {
	awaiting_user_inputs  : BasicDetails,
	payment_success       : CompanyInformation,
	awaiting_offer_letter : OfferLetterDetails,
	offer_letter_complete : DirectorInformation,
	locked                : OfferLetterWaiting,
	processing            : ApplicationProcess,
	finance_assessment    : ApplicationProcess,
};

function Form({ active = {}, getCreditRequestResponse = {}, refetch = () => {}, loading }) {
	const { flags = {} } = getCreditRequestResponse;
	const Component = flags?.offer_letter === 'complete' && active === 'awaiting_offer_letter'
		? RENDERING_FORM.offer_letter_complete : RENDERING_FORM[active];

	return (
		<div className={styles.form}>
			<Component
				active={active}
				getCreditRequestResponse={getCreditRequestResponse}
				refetch={refetch}
				loading={loading}
			/>
		</div>
	);
}

export default Form;
