import { RadioGroup, Button, Tooltip } from '@cogoport/components';
import { IcMInfo, IcMPdf, IcMClock, IcCFtick } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect, useMemo } from 'react';

import { getAddBankControls } from '../../../../configurations/getAddBankControls';
import useSubmitBankDetails from '../../../../hooks/useSubmitBankDetails';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import PdfViewer from '@/ui/page-components/export-factoring/common/PdfViewer';

const excludedKeys = ['documents', 'rejection_reason', 'exporter_bank_account_id', 'account_type', 'approval_status'];

const STATUS_FILTER = ['VERIFIED', 'REJECTED', 'VERIFICATION_PENDING'];

const STATUS_MAPPING = {
	REJECTED: {
		title     : 'Details Rejected',
		subtitle  : 'Your bank details are rejected. Please enter accurate data',
		icon      : IcMInfo,
		color     : '#BF291E',
		iconColor : '#BF291E',
	},
	VERIFICATION_PENDING: {
		title     : 'Awaiting Final Review',
		subtitle  : 'We are checking the documents to make sure everything is in place This may take upto 10 Hours',
		icon      : IcMClock,
		color     : '#221F20',
		iconColor : '#FCDC00',
	},
	VERIFIED: {
		title     : 'Verification Successful',
		subtitle  : 'Your bank details are successfully verified',
		icon      : IcCFtick,
		color     : '#221F20',
		iconColor : '#849E4C',
	},
};

function CommentBox({ comment = '' }) {
	return (
		<div className={styles.commentContainer}>
			<div className={styles.textHead}>Remarks : &nbsp;</div>
			<div className={styles.commentText}>{comment}</div>
		</div>
	);
}

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

function BankVerification({ refetch, getCreditRequestResponse = {} }) {
	const { exporter_account_infos = [] } = getCreditRequestResponse || {};

	const banksDetails = useMemo(() => exporter_account_infos?.[0] || {}, [exporter_account_infos]);

	const {
		exporter_bank_account_id = '',
		account_type = '',
		aba_routing_number = '',
		account_holder_name = '',
		account_number = '',
		approval_status = '',
		bank_name = '',
		corresponding_bank_name = '',
		corresponding_swift_code = '',
		currency = '',
		ifsc_number = '',
		swift_code = '',
		rejection_reason = [],
	} = banksDetails || {};

	const [accountType, setAccountType] = useState(account_type);
	const addBankControls = getAddBankControls({ accountType });
	const {
		control, setValue, handleSubmit, formState: { errors },
	} = useForm();

	useEffect(() => {
		if (banksDetails) {
			setValue('currency', currency);
			setValue('account_holder_name', account_holder_name);
			setValue('account_number', account_number);
			setValue('aba_routing_number', aba_routing_number);
			setValue('bank_name', bank_name);
			setValue('corresponding_bank_name', corresponding_bank_name);
			setValue('corresponding_swift_code', corresponding_swift_code);
			setValue('ifsc_number', ifsc_number);
			setValue('swift_code', swift_code);
			setValue('corresponding_bank_name', corresponding_bank_name);
		}
	}, [banksDetails, currency, account_number, aba_routing_number, bank_name, corresponding_bank_name,
		corresponding_swift_code, ifsc_number, swift_code, setValue, account_holder_name]);

	const { onSubmit, loading } = useSubmitBankDetails({
		accountType,
		refetch,
		exporter_bank_account_id,
		getCreditRequestResponse,

	});

	const ContentComponent = STATUS_MAPPING[approval_status];

	return (
		<div>
			<div className={styles.header}>
				Bank Details
			</div>
			{STATUS_FILTER.includes(approval_status) && (
				<div className={styles.flexDiv}>
					<div>
						<div className={styles.title} style={{ color: ContentComponent?.color }}>
							{approval_status === 'REJECTED' ? (
								<Tooltip
									content={<CommentBox comment={rejection_reason?.[0]} />}
									placement="top"
									theme="light"
									interactive
								>
									<IcMInfo
										width="16px"
										height="16px"
										style={{ margin: '6px 3px 0px 0px' }}
										fill={ContentComponent?.iconColor}
									/>
								</Tooltip>
							) : (
								// eslint-disable-next-line react/jsx-pascal-case
								<ContentComponent.icon
									width="20px"
									height="20px"
									style={{ marginRight: '3px' }}
									fill={ContentComponent?.iconColor}
								/>
							)}
							{ContentComponent?.title}
						</div>

						<div className={styles.description}>
							{ContentComponent?.subtitle}
						</div>
					</div>
				</div>
			)}
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
					{isEmpty(exporter_account_infos) || approval_status === 'REJECTED'
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
								<div className={styles.subtitle}>
									{startCase(account_type)}
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
							{isEmpty(exporter_account_infos) || approval_status === 'REJECTED'
								? (
									<form>
										{addBankControls.map((item) => {
											const Element = getField(item?.type);
											return (
												item?.type
												&& (
													<div className={styles.field} key={item?.name}>
														<div className={styles.field_name}>{item?.label}</div>
														<Element control={control} {...item} />
														<div className={styles.error_text}>
															{errors?.[item?.name]?.message
																|| errors?.[item?.name]?.type}
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
														<div className={styles.subtitle}>
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
													<div className={styles.subtitle}>
														<Tooltip
															content={<PdfViewer url={item.document_url} width="100%" />}
															placement="top"
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
																{/* <IcMEyeopen height="20px" width="20px" /> */}
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
					{isEmpty(exporter_account_infos) || approval_status === 'REJECTED'
						? (
							<div className={styles.button_wrapper}>
								<Button
									themeType="primary"
									onClick={handleSubmit(onSubmit)}
									loading={loading}
									type="button"
									size="lg"
								>
									Confirm
								</Button>
							</div>
						) : (
							null
						)}
				</div>
			)}
		</div>
	);
}

export default BankVerification;
