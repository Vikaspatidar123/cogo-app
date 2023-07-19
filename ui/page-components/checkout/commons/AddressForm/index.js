import { Button, Loader, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import getWidth from '../../utils/getWidth';
import FieldArray from '../FieldArray';

import useAddressForm from './hooks/useAddressForm';
import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import getGeoConstants from '@/ui/commons/constants/geo';

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
	const { submitButtonLabel, optionalButtons, loading, organizationCountryId, ...restProps } = props;

	const geo = getGeoConstants();
	const REGISTRATION_LABEL = geo.others.registration_number.label;

	const {
		loading: apiLoading,
		layouts,
		formProps,
		errors,
		onSubmit,
		control,
		getFormattedValues,
		getCogoScoreTaxNumApi,
		watchPincode,
		watchGstList,
		isAddressRegisteredUnderGstChecked,
	} = useAddressForm({ ...restProps, organizationCountryId });

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
				<Modal.Body>
					<div style={{ minHeight: '48vh', display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
						{Object.entries(layouts).map(([key, layout]) => {
							const { title, controls, showElements = {} } = layout;
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
												if (item?.type === 'fieldArray') {
													return (
														<FieldArray
															{...item}
															name={item.name}
															control={control}
															showElements={showElements}
															error={errors?.[item.name]}
														/>
													);
												}
												const Controller = getField(item.type);
												const show = !(item?.name in showElements)
												|| showElements?.[item?.name];
												const { span, name } = item || {};
												return (
													show && (
														<div className={styles.field} style={{ width: getWidth(span) }}>
															<div className={styles.lable}>{item.label}</div>
															<Controller
																{...item}
																control={control}
															/>
															<div className={styles.errors}>
																{errors?.[name]?.message}
															</div>
														</div>
													)
												);
											})}
										</div>

									</div>

									{key === 'registeredUnderGst'
									&& isAddressRegisteredUnderGstChecked && (
										<div style={{ color: '#cb6464', fontSize: '12px', margin: '10px 0 0' }}>
											Addresses not registered under
											{' '}
											{REGISTRATION_LABEL}
											{' '}
											will be added in
											&quot;Other Addresses&quot; for the organisation and

											<b>
												will not be available for
												{' '}
												{REGISTRATION_LABEL}
												{' '}
												Invoicing
											</b>
											.
										</div>
									)}
								</div>
							);
						})}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.btn_grp}>
						{(optionalButtons || []).map((optionButton) => {
							const { className, label, onClick } = optionButton;

							return (
								<Button
									type="button"
									size="md"
									themeType="secondary"
									className={` ${styles[className]} md`}
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
				</Modal.Footer>
			</form>
		</div>
	);
}

export default AddressForm;
