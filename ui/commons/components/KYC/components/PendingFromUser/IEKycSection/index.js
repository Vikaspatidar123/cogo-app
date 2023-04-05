import { Button, Modal, Toast } from '@cogoport/components';
import { useEffect } from 'react';

import controls from './controls';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import patterns from '@/ui/commons/configurations/patterns';

const { INDIA_COUNTRY_ID } = global;

function IEKycSection({ organizationData, onClose, source }) {
	const {
		general: { scope = '' },
	} = useSelector((state) => state);

	const { country_id, registration_number, preferred_languages } = organizationData;

	const [{ loading }, submitKycAPI] = useRequest(
		{
			url    : '/submit_organization_kyc',
			method : 'post',
		},
		{ manual: true },
	);

	const { handleSubmit, formState, setValue, watch, control } = useForm();

	const { errors = {} } = formState;

	useEffect(() => {
		setValue('country_id', country_id);
		setValue('registration_number', registration_number);
		setValue('preferred_languages', preferred_languages);
	}, [country_id, preferred_languages, registration_number]);

	const countryId = watch('country_id');

	const newFields = {};
	controls.forEach((key, index) => {
		let newField = controls[index];

		if (key === 'registration_number') {
			if (countryId === INDIA_COUNTRY_ID) {
				newField = {
					...newField,
					maxLength : 10,
					rules     : {
						...newField.rules,
						pattern: {
							value   : patterns.PAN_NUMBER,
							message : 'Please enter a valid PAN',
						},
					},
				};
			} else {
				newField = {
					...newField,
					rules: {
						required: true,
					},
				};

				delete newField.maxLength;
			}
		}

		newFields[key] = newField;
	});

	const onSubmit = async (values) => {
		const body = {
			country_id                : values.country_id,
			id                        : organizationData?.id,
			preferred_languages       : values.preferred_languages,
			utility_bill_document_url : values.utility_bill_document_url,
			registration_number       : values.registration_number,
			kyc_submitted_from        : source,
		};
		try {
			const res = await submitKycAPI({ data: body });

			if (!res.hasError) {
				Toast.success('Kyc submitted successfully!');
			}

			onClose();
		} catch (e) {
			Toast.error(getApiErrorString(e.data));
		}
	};

	return (
		<div className={styles.layout_container}>
			<Modal.Body>
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
			</Modal.Body>
			<Modal.Footer>
				<Button disabled={loading} onClick={handleSubmit(onSubmit)}>
					Submit KYC
				</Button>
			</Modal.Footer>
		</div>
	);
}

export default IEKycSection;
