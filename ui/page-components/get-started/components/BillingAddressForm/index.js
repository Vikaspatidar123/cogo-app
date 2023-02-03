import { Button, Checkbox, FileSelect } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

import { InputController, useForm } from '@/packages/forms';

function BillingAddress() {
	const {
		handleSubmit, control, formState: { errors }, watch,
	} = useForm();

	const [isSez, setIsSez] = useState(false);
	const [sezfileValue, setSezFileValue] = useState();
	const [taxDocumnet, setTaxDocument] = useState();

	const handleChange = () => {
		setIsSez(!isSez);
	};

	const formValues = watch();

	const { billing_Address, GST_number, Pincode } = formValues || {};

	const is_disabled = !(!isSez ? ((billing_Address || '').length > 0 && (GST_number || '').length > 0
	&& (Pincode || '').length > 0) : ((billing_Address || '').length > 0 && (GST_number || '').length > 0
	&& (Pincode || '').length > 0 && sezfileValue && taxDocumnet));

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<span className={styles.header_container_bold}>Billing Address Details</span>
				Add your billing address now to fast track bookings
			</div>
			<div className={styles.total_container}>
				<form className={styles.form_container} onSubmit={handleSubmit()}>
					<div className={styles.input_container}>
						<InputController
							control={control}
							name="GST_number"
							type="text"
							placeholder="GST/Tax number"
							rules={{ required: 'GST is required.' }}
						/>

						{errors.country_id && (
							<span className={styles.errors}>
								{errors.country_id.message}
							</span>
						)}
					</div>
					<div className={styles.input_container}>
						<InputController
							control={control}
							name="billing_Address"
							type="text"
							placeholder="Billing Address"
							rules={{ required: 'Billing Address is required.' }}
						/>

						{errors.country_id && (
							<span className={styles.errors}>
								{errors.country_id.message}
							</span>
						)}
					</div>
					<div className={styles.input_container}>
						<InputController
							control={control}
							name="Pincode"
							type="text"
							placeholder="Pincode"
							rules={{ required: 'Pincode is required.' }}
						/>

						{errors.country_id && (
							<span className={styles.errors}>
								{errors.country_id.message}
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
									<FileSelect value={sezfileValue} onChange={setSezFileValue} />
								</div>
								<div className={styles.file_uploader}>
									Tax Number Document:
									<FileSelect value={taxDocumnet} onChange={setTaxDocument} />
								</div>
							</>
						)
				}
					<div>
						<Button>ADD</Button>
					</div>
					<div className={styles.button_container}>
						<Button className={styles.button} themeType="accent">
							SKIP
						</Button>
						<Button className={styles.button} themeType="accent" disabled={is_disabled} type="submit">
							NEXT
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default BillingAddress;
