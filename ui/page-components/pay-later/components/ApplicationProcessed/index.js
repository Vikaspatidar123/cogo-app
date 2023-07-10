import { useState } from 'react';

import RegisteredWithUs from './RegisteredWithUs';
import SignatoryForm from './SignatoryForm';

function ApplicationProcessed({ getCreditRequestResponse = {}, refetch = () => { } }) {
	const {
		cogoscore_application_status = '',
		signatories,
	} = getCreditRequestResponse || {};

	const [showSignatory, setShowSignatory] = useState(
		cogoscore_application_status === 'approved' && signatories?.length > 0,
	);

	return (
		showSignatory ? (
			<SignatoryForm
				getCreditRequestResponse={getCreditRequestResponse}
				refetch={refetch}
			/>
		) : (
			<RegisteredWithUs
				getCreditRequestResponse={getCreditRequestResponse}
				setShowSignatory={setShowSignatory}
			/>
		)
	);
}

export default ApplicationProcessed;
