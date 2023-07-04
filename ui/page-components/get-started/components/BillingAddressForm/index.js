import { Button, Checkbox } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useCreateBillingAddress from '../../hooks/useCreateBillingAddress';

import styles from './styles.module.css';

import { InputController, useForm, UploadController } from '@/packages/forms';

function BillingAddress({ orgId, setInviteTeam }) {
	const { t } = useTranslation(['common', 'getStarted']);
	const {
		handleSubmit, control, formState: { errors }, watch,
	} = useForm();

	const [isSez, setIsSez] = useState(false);

	const {
		onClickCreateBillingAddress,
		createBillingAddressLoading,
	} = useCreateBillingAddress({ isSez, orgId, setInviteTeam });

	const handleChange = () => {
		setIsSez(!isSez);
	};

	const formValues = watch();

	const { billing_address, gst_number, pincode } = formValues || {};

	const handleSkip = () => {
		setInviteTeam(true);
	};

	const is_disabled = !(!isSez ? ((billing_address || '').length > 0 && (gst_number || '').length > 0
	&& (pincode || '').length > 0) : ((billing_address || '').length > 0 && (gst_number || '').length > 0
	&& (pincode || '').length > 0 && formValues?.sez_proof?.finalUrl));

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<span className={styles.header_container_bold}>
					{t('getStarted:rightPanel_get_started_billing_address_text_1')}
				</span>
				{t('getStarted:rightPanel_get_started_billing_address_text_2')}
			</div>
			<div className={styles.total_container}>
				<form className={styles.form_container} onSubmit={handleSubmit(onClickCreateBillingAddress)}>
					<div className={styles.input_container}>
						<InputController
							control={control}
							name="gst_number"
							type="text"
							placeholder="GST/Tax number"
							rules={{ required: 'GST is required.' }}
						/>

						{errors.gst_number && (
							<span className={styles.errors}>
								{errors.gst_number.message}
							</span>
						)}
					</div>
					<div className={styles.input_container}>
						<InputController
							control={control}
							name="billing_address"
							type="text"
							placeholder="Billing Address"
							rules={{ required: 'Billing Address is required.' }}
						/>

						{errors.billing_address && (
							<span className={styles.errors}>
								{errors.billing_address.message}
							</span>
						)}
					</div>
					<div className={styles.input_container}>
						<InputController
							control={control}
							name="pincode"
							type="text"
							placeholder="Pincode"
							rules={{ required: 'Pincode is required.' }}
						/>

						{errors.pincode && (
							<span className={styles.errors}>
								{errors.pincode.message}
							</span>
						)}
					</div>
					<div className={styles.checkbox_container}>
						<Checkbox value={isSez} onChange={handleChange} />
						The above address is SEZ
					</div>
					{
						isSez && (
							<>
								<div className={styles.file_uploader}>
									Sez Proof:
									<UploadController
										control={control}
										name="sez_proof"
										rules={{ required: 'sez_proof is required.' }}
									/>
								</div>
								<div className={styles.file_uploader}>
									Tax Number Document:
									<UploadController
										control={control}
										name="tax_document_proof"
									/>
								</div>
							</>
						)
				}
					<div
						className={styles.add_button_container}
					>
						<Button type="submit" loading={createBillingAddressLoading}>
							{t('getStarted:rightPanel_get_started_add_button_label')}
						</Button>
					</div>
					<div className={styles.button_container}>
						<Button className={styles.button} themeType="accent" onClick={handleSkip}>
							{t('getStarted:rightPanel_get_started_skip_button_label')}
						</Button>
						<Button className={styles.button} themeType="accent" disabled={is_disabled}>
							{t('getStarted:rightPanel_get_started_next_button_label')}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default BillingAddress;
