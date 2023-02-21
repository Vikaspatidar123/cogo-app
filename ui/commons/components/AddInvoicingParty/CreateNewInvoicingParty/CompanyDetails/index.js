import { Button } from '@cogoport/components';

import FieldArray from '../../FieldArray';
import useCompanyDetails from '../hooks/useCompanyDetails';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function FormElements({
	controls, control, errors, showElements = {},
}) {
	return (
		<div className={styles.flex_container}>
			{controls.map((controlItem) => {
				const { name, type, label } = controlItem;
				const controlStyle = controlItem?.style;
				const Element = getField(type);

				const show =					!(controlItem.name in showElements) || showElements[controlItem.name];

				if (!show || !Element) {
					return null;
				}

				if (type === 'fieldArray') {
					return (
						<FieldArray
							{...controlItem}
							name={name}
							control={control}
							showElements={showElements?.[name]}
							error={errors?.[name]}
						/>
					);
				}

				const finalProps = { ...controlItem };

				if (type === 'location-select') {
					delete finalProps.style;
				}

				if (type === 'file' && controlStyle) {
					controlStyle.maxWidth = controlStyle?.flexBasis;
				}

				return (
					<div className={styles.flex_item} style={{ ...controlStyle }}>
						<div>
							{finalProps.type !== 'checkbox' ? (
								<div className={styles.label}>{label}</div>
							) : null}
							<div>
								{/* <Element
									{...finalProps}
									itemKey={`${name}_${type}`}
									control={control}
									id={`${name}`}
								/> */}

								<div className={styles.error_message}>
									{errors?.[name]?.message || errors?.[name]?.type}
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

function CompanyDetails({
	filledDetails = {},
	tradePartyType = {},
	setFilledDetails = () => {},
	setCurrentStep = () => {},
	showBackButton = false,
	onClickBack = () => {},
}) {
	const {
		errors = {},
		onSubmitOfCompanyDetails,
		companyDetailsFormProps = {},
		t = () => {},
		newCompanyDetailsControls,
	} = useCompanyDetails({
		filledDetails,
		setFilledDetails,
		setCurrentStep,
	});
	const { handleSubmit = () => {}, control } = companyDetailsFormProps;
	const translationKey =		'common:components.addInvoicingParty.createNewInvoicingParty.companyDetails.';

	const showElements = {};

	if (tradePartyType.value !== 'paying_party') {
		showElements.verification_document = false;
	}

	return (
		<section>
			<div className={styles.title}>{t(`${translationKey}title`)}</div>

			<div className={styles.layout_container}>
				<div>
					<FormElements
						controls={newCompanyDetailsControls}
						control={control}
						errors={errors}
						showElements={showElements}
					/>
				</div>
			</div>

			<div className={styles.btn_grp}>
				{showBackButton && (
					<Button
						themeType="tertiary"
						onClick={() => onClickBack()}
						style={{
							marginRight: '8px',
						}}
					>
						{t(`${translationKey}buttons.back`)}
					</Button>
				)}

				<Button onClick={handleSubmit(onSubmitOfCompanyDetails)}>
					{t(`${translationKey}buttons.proceed`)}
				</Button>
			</div>
		</section>
	);
}

export default CompanyDetails;
