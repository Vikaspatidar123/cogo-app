import { useState } from 'react';

import RegisteredWithUs from './RegisteredWithUs';
import SignatoryForm from './SignatoryForm';

function ApplicationProcessed({ getCreditRequestResponse = {} }) {
	const {
		cogoscore_application_status = '',
		credit_application_flow = '',
		signatories,
	} = getCreditRequestResponse || {};

	const [showSignatory, setShowSignatory] = useState(
		cogoscore_application_status === 'approved'
		&& credit_application_flow === 'agreement' && signatories?.length > 0,
	);
	return (
		showSignatory ? (
			<SignatoryForm
				getCreditRequestResponse={getCreditRequestResponse}
			/>
		) : (
			<RegisteredWithUs
				getCreditRequestResponse={getCreditRequestResponse}
				setShowSignatory={setShowSignatory}
			/>
		)
	);
	// if ((cogoscore_application_status === 'approved'
	// && credit_application_flow === 'agreement'
	// && signatories?.length > 0) || showSignatory) {
	// 	return <SignatoryForm getCreditRequestResponse={getCreditRequestResponse} />;
	// }
	// return <RegisteredWithUs getCreditRequestResponse={getCreditRequestResponse}
	// setShowSignatory={setShowSignatory} />;
}

export default ApplicationProcessed;
