import { Button, Checkbox } from '@cogoport/components';
import { IcMDocument } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';
import useBillingAddressForm from './useBillingAddressForm';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

const { INDIA_COUNTRY_ID } = global;

function BillingAddressForm(props) {
	const {
		CONSTANTS,
		state,
		isGstApplicable = false,
		setIsGstApplicable = () => {},
	} = props;

	const {
		COMPONENT_KEYS: { ORGANIZATION_DETAILS, PERSONA, ACCOUNT_INFORMATION },
	} = CONSTANTS;

	const {
		[ORGANIZATION_DETAILS]: organizationDetails,
		[PERSONA]: persona,
		[ACCOUNT_INFORMATION]: accountInformation,
	} = state;

	const { formValues: organizationDetailsFormValues } = organizationDetails || {};
	const { country_id: countryId } = organizationDetailsFormValues || {};

	const isCountryIndia = countryId === INDIA_COUNTRY_ID;

	const { formValues: personaFormValues } = persona || {};
	const { supplyService: categoryTypes = [] } = personaFormValues || {};

	const { addressDetails } = accountInformation || {};
	const { isTaxApplicable, formList } = addressDetails || {};

	const {
		userControls = [],
		errors = {},
		onSubmit = () => {},
		onClickCancelButton = () => {},
		showElements,
		loading = false,
	} = useBillingAddressForm({
		...props,
		countryId,
	});

	const { handleSubmit = () => {}, control } = useForm();

	let isCheckboxVisible = false;
	if (categoryTypes.includes('trucking') || categoryTypes.includes('other')) {
		isCheckboxVisible = true;
	}

	if (
		isCheckboxVisible
    && (!isCountryIndia || isTaxApplicable || !isEmpty(formList))
	) {
		isCheckboxVisible = false;
	}

	return (
		<div className={styles.form_container}>
			<div
				className={styles.form}
				onSubmit={handleSubmit((values) => onSubmit({ values }))}
			>
				<div className={styles.inputs_container}>
					{isCheckboxVisible ? (
						<div className={styles.checkbox_container}>
							<Checkbox
								className="primary md"
								checked={isGstApplicable}
								onChange={() => setIsGstApplicable(!isGstApplicable)}
							/>
							<span
								aria-hidden
								className="checkboxLabel"
								onClick={() => setIsGstApplicable(!isGstApplicable)}
							>
								I am not covered under GST.
								{' '}
							</span>
							{' '}
							<span className="knowMore">Know more</span>
						</div>
					) : null}

					<div className={styles.layout}>
						{userControls.map((item) => {
							const Element = getField(item.type);
							const show = showElements[item.name];
							return (
								show && (
									<div className={styles.field}>
										<div className={styles.lable}>{item.label}</div>
										<Element {...item} control={control} />
										{errors && (
											<div className={styles.errors}>
												{errors[item?.name]?.message}
											</div>
										)}
									</div>
								)
							);
						})}
					</div>

					{isGstApplicable ? (
						<>
							<div className={styles.doc_header}>
								Sample GST Exemption Proof
							</div>
							<div className={styles.doc_container}>
								<div style={{ display: 'flex' }}>
									<IcMDocument style={{ marginRight: 8 }} />
									<div className={styles.doc_text}>
										Sample Tax Exemption Proof.pdf
									</div>
								</div>
								<div style={{ display: 'flex' }}>
									<div className={styles.link_text}>View</div>
								</div>
							</div>
						</>
					) : null}
				</div>

				<div className={styles.button_group}>
					{state.accountInformation?.addressDetails?.formList.length > 0 && (
						<Button
							className="secondary md"
							onClick={onClickCancelButton}
							style={{ marginRight: 16 }}
						>
							Cancel
						</Button>
					)}

					<Button
						type="sumbit"
						className="primary md"
						disabled={loading}
						style={{ border: '1px solid #393f70' }}
					>
						ADD ADDRESS
					</Button>
				</div>
			</div>
		</div>
	);
}

export default BillingAddressForm;
