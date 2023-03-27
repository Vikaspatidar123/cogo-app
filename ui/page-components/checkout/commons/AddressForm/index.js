import { Button, Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useAddressForm from './hooks/useAddressForm';
import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

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
 * @property {string} 		[registrationNumber]
 * @property {boolean}		[validateGst]
 */
function AddressForm(props) {
	const { submitButtonLabel, optionalButtons, loading, ...restProps } = props;
	const {
		loading: apiLoading,
		layouts,
		formProps,
		onSubmit,
		control,
		getFormattedValues,
		getCogoScoreTaxNumApi,
		watchPincode,
		watchGstList,
		isAddressRegisteredUnderGstChecked,
	} = useAddressForm(restProps);

	const { handleSubmit } = formProps;

	if (getCogoScoreTaxNumApi.loading) {
		return (
			<div className={styles.spinner_container}>
				<Loader themeType="primary" />
				<div className={styles.loading_text}>Kindly wait, fetching relevant information...</div>
			</div>
		);
	}

	return (
		<div className={styles.container} key={`${watchPincode}_${watchGstList}`}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div style={{ minHeight: '48vh', display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
					{Object.entries(layouts).map(([key, layout]) => {
						const { title, controls, showElements } = layout;

						if (isEmpty(controls)) {
							return null;
						}

						return (
							<div style={{ display: 'flex', flexDirection: 'column' }} key={key}>
								{title && (
									<div style={{ color: '#393f70', fontWeight: 500, marginTop: '16px' }}>
										{title}
									</div>
								)}

								<div className={styles.layout_container}>
									<div className={styles.layout}>
										{controls.map((item) => {
											const Controller = getField(item.type);
											const show = showElements[item.name];
											return (
												show && (
													<div className={styles.field}>
														<div className={styles.lable}>{item.label}</div>
														<Controller {...item} control={control} />
													</div>
												)
											);
										})}
									</div>

								</div>

								{key === 'registeredUnderGst'
									&& isAddressRegisteredUnderGstChecked && (
										<div style={{ color: '#cb6464', fontSize: '12px', margin: '10px 0 0' }}>
											Addresses not registered under GST will be added in
											&quot;Other Addresses&quot; for the organisation and
											{' '}
											<b>will not be available for GST Invoicing</b>
											.
										</div>
								)}
							</div>
						);
					})}
				</div>

				<div className={styles.btn_grp}>
					{(optionalButtons || []).map((optionButton) => {
						const { className, label, onClick } = optionButton;

						return (
							<Button
								type="button"
								className={`secondary ${className} md`}
								disabled={loading || apiLoading}
								onClick={(event) => {
									onClick?.({
										event,
										values: getFormattedValues(),
									});
								}}
								style={{ marginRight: '16px' }}
							>
								{label}
							</Button>
						);
					})}

					<Button
						type="submit"
						className="primary md"
						disabled={loading || apiLoading}
					>
						{submitButtonLabel || 'Submit'}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default AddressForm;
