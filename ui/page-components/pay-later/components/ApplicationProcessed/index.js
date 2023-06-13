import { useState } from 'react';

import RegisteredWithUs from './RegisteredWithUs';
import SignatoryForm from './SignatoryForm';

function ApplicationProcessed({ getCreditRequestResponse = {} }) {
	const [showSignatory, setShowSignatory] = useState(false);

	const {
		cogoscore_application_status = '',
		credit_application_flow = '',
		signatories,
	} = getCreditRequestResponse || {};

	if ((cogoscore_application_status === 'approved'
    && credit_application_flow === 'agreement'
    && signatories?.length > 0) || showSignatory) {
		return <SignatoryForm getCreditRequestResponse={getCreditRequestResponse} />;
	}
	return <RegisteredWithUs getCreditRequestResponse={getCreditRequestResponse} setShowSignatory={setShowSignatory} />;
}

export default ApplicationProcessed;
