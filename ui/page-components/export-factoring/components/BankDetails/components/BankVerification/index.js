import { RadioGroup, Button } from '@cogoport/components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { getAddBankControls } from '../../../../configurations/getAddBankControls';
import useSubmitBankDetails from '../../../../hooks/useSubmitBankDetails';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

const OPTIONS = [
	{
		label : 'Current Account',
		value : 'current_account',
	},
	{
		label : 'EEFC Account',
		value : 'eefc_account',
	},
];

function BankVerification() {
	const [accountType, setAccountType] = useState('');
	const addBankControls = getAddBankControls({ accountType });
	const {
		control, watch, handleSubmit, formState: { errors },
	} = useForm();

	const { onSubmit, loading } = useSubmitBankDetails({ accountType });

	return (
		<div>
			<div className={styles.header}>
				Bank Details
			</div>
			{/* <div className={styles.subHeader}>
				This is not a mandatory step, this can be done later in the profile section.
			</div> */}
			<div className={styles.flexDiv}>
				<div>
					<div className={styles.title}>
						Bank Account Type
					</div>
					<div className={styles.description}>
						Select Bank Account Type
					</div>
				</div>
				<div className={styles.formDiv}>
					<RadioGroup
						options={OPTIONS}
						value={accountType}
						onChange={setAccountType}
					/>
					{/* <div className={styles.description}>
						Account Type
					</div>
					<div className={styles.title}>
						Current Account
					</div> */}
				</div>
			</div>
			{accountType && (
				<div>
					<div className={styles.flexDiv}>
						<div>
							<div className={styles.title}>
								Bank Details
							</div>
							<div className={styles.description}>
								Provide Bank Details
							</div>
						</div>
						<div className={styles.formDiv}>
							<form>
								{addBankControls.map((item) => {
									const Element = getField(item?.type);
									return (
										item?.type
									&& (
										<div className={styles.field}>
											<div className={styles.field_name}>{item?.label}</div>
											<Element control={control} {...item} />
											<div className={styles.error_text}>
												{errors?.[item?.name]?.message
												|| errors?.[item?.name]?.type }
											</div>
										</div>
									)
									);
								})}
							</form>
						</div>
					</div>
					<div className={styles.button_wrapper}>
						<Button
							themeType="primary"
							onClick={handleSubmit(onSubmit)}
							loading={loading}
							type="button"
						>
							Confirm
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default BankVerification;
