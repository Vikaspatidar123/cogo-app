import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import FieldArray from './FieldArray';
import useAddressForm from './hooks/useAddressForm';
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
							key={`${name}_${type}`}
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

/**
 * @typedef  {Object} 		[props]
 * @property {string} 		[organizationId]
 * @property {string} 		[tradePartyId]
 * @property {boolean}		[isAddressRegisteredUnderGst]
 * @property {Object} 		[addressData]
 * @property {string} 		[addressType]
 * @property {boolean} 		[showInvoiceTradeParty]
 * @property {function} 	[onSuccess]
 * @property {function} 	[onFailure]
 * @property {boolean}		[saveAddressData]
 * @property {boolean}		[showSavedPOC]
 * @property {Object}		[formState]
 * @property {string}		[submitButtonLabel]
 * @property {Array}		[optionalButtons]
 * @property {boolean}		[loading]
 * @property {string}		[registrationNumber]
 * @property {boolean}		[validateGst]
 */
function AddressForm(props) {
	const {
		submitButtonLabel, optionalButtons, loading, ...restProps
	} = props;

	const {
		loading: apiLoading,
		layouts,
		formProps,
		errors,
		onSubmit,
		getFormattedValues,
		getBusinessApi,
	} = useAddressForm(restProps);
	const { handleSubmit, control } = formProps;

	const { t } = useTranslation(['common']);

	const translationKey = 'common:components.addressForm';

	return (
		<section className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.flex_div}>
					{Object.entries(layouts).map(([key, layout]) => {
						const { title, controls, showElements } = layout;

						if (isEmpty(controls)) {
							return null;
						}

						return (
							<div className={styles.flex_div} key={key}>
								{title && <div className={styles.text}>{title}</div>}

								<FormElements
									key={`${key}__${getBusinessApi.loading}`}
									controls={controls}
									control={control}
									showElements={showElements}
									errors={errors}
								/>
							</div>
						);
					})}
				</div>

				<div className={styles.btn_grp}>
					{(optionalButtons || []).map((optionButton) => {
						const { label, onClick } = optionButton;

						return (
							<Button
								themeType="tertiary"
								disabled={loading || apiLoading}
								onClick={(event) => {
									onClick?.({
										event,
										values: getFormattedValues(),
									});
								}}
								style={{
									marginRight: '16px',
								}}
							>
								{label}
							</Button>
						);
					})}

					<Button type="submit" disabled={loading || apiLoading}>
						{submitButtonLabel
							|| t(`${translationKey}.buttons.submitButtonLabel`)}
					</Button>
				</div>
			</form>
		</section>
	);
}

export default AddressForm;
