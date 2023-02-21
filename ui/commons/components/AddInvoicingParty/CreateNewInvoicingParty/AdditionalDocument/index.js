import { Button } from '@cogoport/components';

import FieldArray from '../../FieldArray';
import useDocuments from '../hooks/useDocuments';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function FormElements({
	controls, control, errors, showElements = {},
}) {
	return (
		<div className={styles.flex_container}>
			{controls.map((controlItem) => {
				const el = { ...controlItem };
				const controlStyle = controlItem?.style;
				const Element = getField(el.type);

				const show =					!(controlItem.name in showElements) || showElements[controlItem.name];

				if (!show || !Element) {
					return null;
				}

				if (el.type === 'fieldArray') {
					return (
						<FieldArray
							{...controlItem}
							name={controlItem.name}
							control={control}
							key={`${el.name}_${el.type}`}
							showElements={showElements?.[controlItem.name]}
							error={errors?.[controlItem.name]}
						/>
					);
				}

				const finalProps = { ...controlItem };

				if (el.type === 'location-select') {
					delete finalProps.style;
				}
				if (el.type === 'file') {
					controlStyle.maxWidth = controlStyle.flexBasis;
				}

				return (
					<div className={styles.flex_item} style={{ ...controlStyle }}>
						<div>
							{controlItem.type !== 'checkbox' ? (
								<div className={styles.label}>{el.label}</div>
							) : null}
							<div>
								<Element
									{...finalProps}
									key={`${el.name}_${el.type}`}
									itemKey={`${el.name}_${el.type}`}
									control={control}
									id={`${el.name}`}
								/>

								<div className={styles.error_message}>
									{errors?.[el.name]?.message || errors?.[el.name]?.type}
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

function AdditionalDocument({
	tradePartyType = {},
	setShowModal = () => {},
	filledDetails = {},
	setFilledDetails = () => {},
	orgResponse = {},
	setCurrentStep = () => {},
	fetchOrganizationTradeParties = () => {},
	source,
}) {
	const {
		onSubmit = () => {},
		loading = false,
		documentControls = [],
		documentFormProps = {},
		t = () => {},
	} = useDocuments({
		filledDetails,
		setFilledDetails,
		orgResponse,
		tradePartyType,
		setShowModal,
		fetchOrganizationTradeParties,
		source,
	});

	const translationKey =		'common:components.addInvoicingParty.createNewInvoicingParty.additionalDocuments.';

	const {
		control = {},
		handleSubmit = () => {},
		watch = () => {},
		formState: { errors = {} },
	} = documentFormProps;

	const formValues = watch();

	const onClickBack = () => {
		setCurrentStep('bank_details');
		setFilledDetails({ ...filledDetails, documents: { ...formValues } });
	};

	return (
		<section className={styles.container}>
			<div className={styles.title}>{t(`${translationKey}title`)}</div>

			<div className={styles.layout_container}>
				<div>
					<FormElements
						controls={documentControls}
						control={control}
						errors={errors}
					/>
				</div>
			</div>

			<div className={styles.btn_grp}>
				<Button
					themeType="tertiary"
					onClick={() => onClickBack()}
					style={{
						marginRight: '8px',
					}}
					disabled={loading}
				>
					{t(`${translationKey}buttons.back`)}
				</Button>

				<Button disabled={loading} onClick={handleSubmit(onSubmit)}>
					{loading
						? t(`${translationKey}buttons.submit.1`)
						: t(`${translationKey}buttons.submit.2`)}
				</Button>
			</div>
		</section>
	);
}

export default AdditionalDocument;
