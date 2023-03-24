import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/front/components/admin';
import React from 'react';

import useBankDetails from './hooks/useBankDetails';
// import { ButtonContainer, Form, Container } from './styles';
import styles from './styles.module.css';

function BankDetails(props) {
	const {
		controls = [],
		formProps = {},
		errors = {},
		onSubmit = () => {},
		createBankDetailsApiLoading = false,
		isFormSaved = false,
	} = useBankDetails(props);
	const { handleSubmit = () => {}, fields = {} } = formProps;

	return (
		<div className={styles.container}>
			<div className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Layout controls={controls} fields={fields} errors={errors} />

				<div className={styles.button_container}>
					<Button
						type="submit"
						className="primary md"
						disabled={createBankDetailsApiLoading || isFormSaved}
					>
						{createBankDetailsApiLoading ? 'Submitting' : 'Submit'}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default BankDetails;
