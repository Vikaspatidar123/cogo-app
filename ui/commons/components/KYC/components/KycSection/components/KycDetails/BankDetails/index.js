import { Button } from '@cogoport/components';
import React from 'react';

import useBankDetails from './hooks/useBankDetails';
import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function BankDetails(props) {
	const {
		control,
		controls = [],
		formProps = {},
		errors = {},
		onSubmit = () => {},
		createBankDetailsApiLoading = false,
		isFormSaved = false,
	} = useBankDetails(props);
	const { handleSubmit = () => {} } = formProps;

	return (
		<div className={styles.container}>
			<div className={styles.form} onSubmit={handleSubmit(onSubmit)}>

				<div className={styles.layout}>
					{controls.map((item) => {
						const Element = getField(item.type);
						return (
							<div className={styles.field}>
								<div className={styles.lable}>{item.label}</div>
								<Element {...item} control={control} />
								{errors && (
									<div className={styles.errors}>
										{errors[item?.name]?.message}
									</div>
								)}
							</div>
						);
					})}
				</div>

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
