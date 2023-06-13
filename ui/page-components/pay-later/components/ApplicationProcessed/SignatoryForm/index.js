import { Button } from '@cogoport/components';

import FormTitleAndDescription from '../../../common/FormTitleAndDescription';

import Signatory from './Signatory';
import SignatoryDetails from './SignatoryDetails';
import SignatoryMethod from './SignatoryMethod';
import styles from './styles.module.css';

const DETAILS_ARRAY = ['method', 'signatory'];

function SignatoryForm({ getCreditRequestResponse }) {
	const { signatories = [] } = getCreditRequestResponse || {};

	const signatoriesUpdated = signatories?.length > 0;

	const formMapping = {
		method    : SignatoryMethod,
		// signatory : signatoriesUpdated ? SignatoryDetails : Signatory,
		signatory : signatoriesUpdated ? Signatory : SignatoryDetails,

	};

	return (
		<div>
			{DETAILS_ARRAY.map((details) => {
				const FormFields = formMapping[details];
				return (
					<div>
						<div className={styles.wrapper}>
							<div className={styles.form_description}>
								<FormTitleAndDescription details={details} />
							</div>
							<div className={styles.form}>
								<FormFields getCreditRequestResponse={getCreditRequestResponse} />
							</div>
						</div>
					</div>

				);
			})}
			<div className={styles.button_wrapper}>
				<Button>
					Next
				</Button>
			</div>
		</div>

	);
}

export default SignatoryForm;
