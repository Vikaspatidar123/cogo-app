import FormLayout from '@/temp/form/FormLayout';
import { Flex, Text } from '@cogoport/front/components';
import Button from '@/commons/components/UI/Button';
import { isEmpty } from '@cogoport/front/utils';
import useAddressForm from './hooks/useAddressForm';
import { Container, BtnGrp } from './styles';

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
	const { submitButtonLabel, optionalButtons, loading, ...restProps } = props;

	const {
		loading: apiLoading,
		layouts,
		formProps,
		errors,
		onSubmit,
		getFormattedValues,
		getBusinessApi,
	} = useAddressForm(restProps);
	const { handleSubmit, fields } = formProps;

	return (
		<Container>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex direction="column">
					{Object.entries(layouts).map(([key, layout]) => {
						const { title, controls, showElements } = layout;

						if (isEmpty(controls)) {
							return null;
						}

						return (
							<Flex direction="column" key={key}>
								{title && (
									<Text color="#2C3E50" bold={500} marginTop={16}>
										{title}
									</Text>
								)}

								<FormLayout
									key={`${key}__${getBusinessApi.loading}`}
									controls={controls}
									fields={fields}
									errors={errors}
									showElements={showElements || {}}
								/>
							</Flex>
						);
					})}
				</Flex>

				<BtnGrp>
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
								style={{
									marginRight: '16px',
								}}
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
				</BtnGrp>
			</form>
		</Container>
	);
}

export default AddressForm;
