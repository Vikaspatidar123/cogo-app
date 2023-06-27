import { Checkbox } from '@cogoport/components';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

export const COMPANY_DETAILS_CONTROLS = [
	{
		label       : 'PAN',
		name        : 'pan',
		type        : 'text',
		placeholder : 'PAN',
		showField   : true,
		disabled    : true,
		rules       : { required: true },
	},
	{
		label       : 'IEC',
		name        : 'iec',
		type        : 'text',
		placeholder : 'IEC',
		showField   : true,
		rules       : { required: true },
	},
	{
		label       : 'GST',
		name        : 'tax_number',
		type        : 'async_select',
		placeholder : 'GST',
		asyncKey    : 'tax_numbers',
		showField   : true,
		valueKey    : 'tax_number',
		labelKey    : 'label',
		initialCall : true,
		rules       : { required: true },
	},
];

function CompanyInfoForm({ getCreditRequestResponse }) {
	const { profile } = useSelector((state) => state);
	const [iecCheck, setIecCheck] = useState(false);
	const { organization = '' } = { ...profile, ...getCreditRequestResponse };
	const {
		control, watch, handleSubmit, formState: { errors }, setValue,
	} = useForm({
		defaultValues: {
			pan        : getCreditRequestResponse?.org_registration_number || organization?.registration_number,
			tax_number : getCreditRequestResponse?.tax_number,
		},
	});
	const allFields = watch();
	const handleIec = () => {
		setIecCheck((prev) => !prev);
		if (!iecCheck) {
			setValue('iec', allFields.pan);
		} else {
			setValue('iec', '');
		}
	};
	console.log(iecCheck);

	return (
		<div>
			{COMPANY_DETAILS_CONTROLS.map((item) => {
				const Element = getField(item?.type);
				return (
					item?.type && (
						<div className={styles.field}>
							<div className={styles.field_name}>{item?.label}</div>
							{item.name === 'iec'
								? (
									<>
										<Element control={control} {...item} />
										<Checkbox
											className={styles.checkboxContainer}
											label="Same As PAN"
											value={iecCheck}
											onChange={handleIec}
										/>
									</>
								)
								: <Element control={control} {...item} />}
							<div className={styles.error_text}>
								{errors?.[item?.name]?.message || errors?.[item?.name]?.type }
							</div>
						</div>
					)
				);
			})}
		</div>
	);
}

export default CompanyInfoForm;
