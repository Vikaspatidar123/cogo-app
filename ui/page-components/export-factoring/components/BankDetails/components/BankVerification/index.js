import { RadioGroup, Button, Tooltip } from '@cogoport/components';
import { IcMEyeopen, IcMPdf } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { getAddBankControls } from '../../../../configurations/getAddBankControls';
import useSubmitBankDetails from '../../../../hooks/useSubmitBankDetails';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import PdfViewer from '@/ui/page-components/export-factoring/common/PdfViewer';

const excludedKeys = ['documents', 'rejection_reason', 'exporter_bank_account_id', 'account_type'];

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

function BankVerification({ getCreditRequestResponse = {} }) {
	const { exporter_account_infos = [] } = getCreditRequestResponse || {};

	const banksDetails = exporter_account_infos?.[0] || {};

	const [accountType, setAccountType] = useState('');
	const addBankControls = getAddBankControls({ accountType });
	const {
		control, handleSubmit, formState: { errors },
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
					{isEmpty(exporter_account_infos)
						? (
							<RadioGroup
								options={OPTIONS}
								value={accountType}
								onChange={setAccountType}
							/>
						)
						: (
							<>
								<div className={styles.description}>
									Account Type
								</div>
								<div className={styles.title}>
									Current Account
								</div>
							</>
						)}
				</div>
			</div>
			{(accountType || !isEmpty(exporter_account_infos)) && (
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
							{isEmpty(exporter_account_infos)
								? (
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
								) : (
									<>
										{Object.keys(banksDetails)?.map((key) => {
											if (!excludedKeys.includes(key) && !isEmpty(banksDetails?.[key])) {
												return (
													<div key={key} className={styles.field}>
														<div className={styles.description}>{startCase(key)}</div>
														<div className={styles.title}>
															{startCase(banksDetails?.[key])}
														</div>
													</div>
												);
											}
											return null;
										})}

										<div>
											{banksDetails?.documents?.map((item) => (
												<div key={item?.document_type} className={styles.field}>
													<div className={styles.description}>
														{startCase(item?.document_type)}
													</div>
													<div className={styles.title}>
														<Tooltip
															content={<PdfViewer url={item.document_url} width="100%" />}
															placement="right"
															interactive
														>
															<div className={styles.docContainer}>
																<div style={{ display: 'flex' }}>
																	<div>
																		<IcMPdf height="20px" width="20px" />
																	</div>
																	<div>
																		{startCase(item?.document_type)}
																	</div>
																</div>
																<IcMEyeopen height="20px" width="20px" />
															</div>
														</Tooltip>
													</div>
												</div>
											))}
										</div>
									</>
								)}
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
