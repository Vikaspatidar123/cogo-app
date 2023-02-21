import { Button } from '@cogoport/components';

import FieldArray from '../../FieldArray';
import useBankAccount from '../hooks/useBankAccount';

import styles from './styles.module.css';

// import Spinner from '@/commons/components/Spinner';
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
							key={`${name}_${type}`}
							name={controlItem.name}
							control={control}
							showElements={showElements?.[controlItem.name]}
							error={errors?.[controlItem.name]}
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
					<div
						className={styles.flex_item}
						style={{ padding: '10px', ...controlStyle }}
					>
						<div>
							{controlItem.type !== 'checkbox' ? (
								<div className={styles.label}>{label}</div>
							) : null}
							<div>
								<Element
									{...finalProps}
									key={`${name}_${type}`}
									itemKey={`${name}_${type}`}
									control={control}
									id={`${name}`}
								/>

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

function BankAccount({
	setCurrentStep = () => {},
	filledDetails = {},
	setFilledDetails = () => {},
}) {
	const {
		onSubmit = () => {},
		bankAccountControls = [],
		bankAccountFormProps = {},
		t = () => {},
		bankDetailsLoading,
		onBlurIfscControl = () => {},
	} = useBankAccount({
		setCurrentStep,
		filledDetails,
		setFilledDetails,
	});

	const translationKey =		'common:components.addInvoicingParty.createNewInvoicingParty.bankAccount.';

	const {
		control = {},
		handleSubmit = () => {},
		watch = () => {},
		formState: { errors = {} },
	} = bankAccountFormProps;

	const formValues = watch();

	const newBankAccountControls = [];
	bankAccountControls.forEach((value) => {
		let newField = value || {};
		const controlName = value.name;

		if (controlName === 'ifsc_number') {
			newField = {
				...newField,
				onBlur: () => onBlurIfscControl({ code: formValues.ifsc_number }),
				...(bankDetailsLoading && {
					// suffix: (
					// 	<Spinner
					// 		size={20}
					// 		style={{ padding: '4px', margin: '16px' }}
					// 		spinBorderColor="#1444a1"
					// 		outerBorderColor="#e7efff"
					// 	/>
					// ),
				}),
			};
		}

		newBankAccountControls.push(newField);
	});

	const onClickBack = () => {
		setCurrentStep('billing_address');
		setFilledDetails({ ...filledDetails, bank_details: { ...formValues } });
	};

	return (
		<section className={styles.container}>
			<div className={styles.title}>{t(`${translationKey}title`)}</div>

			<div className={styles.layout_container}>
				<FormElements
					controls={newBankAccountControls}
					control={control}
					errors={errors}
				/>
			</div>

			<div className={styles.btn_grp}>
				<Button
					themeType="tertiary"
					onClick={() => onClickBack()}
					style={{ marginRight: '8px' }}
				>
					{t(`${translationKey}buttons.back`)}
				</Button>

				<Button onClick={handleSubmit(onSubmit)}>
					{t(`${translationKey}buttons.proceed`)}
				</Button>
			</div>
		</section>
	);
}

export default BankAccount;
