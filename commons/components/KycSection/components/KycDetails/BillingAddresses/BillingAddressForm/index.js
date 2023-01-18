import FormLayout from '@/temp/form/FormLayout';
import Checkbox from '@cogoport/front/components/admin/CheckBox';
import { Flex } from '@cogoport/front/components';
import Button from '@/commons/components/UI/Button';
import { isEmpty } from '@cogoport/front/utils';
import { getIndiaCountryId } from '@/commons/utils/getIndiaCountryId';
import DocIcon from '../icons/doc-icon.svg';
import {
	Form,
	FormContainer,
	InputsContainer,
	ButtonGroup,
	CheckboxContainer,
	DocContainer,
	DocText,
	LinkText,
	DocHeader,
} from './styles';
import useBillingAddressForm from './useBillingAddressForm';

const INDIA_COUNTRY_ID = getIndiaCountryId();

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

	const { formValues: organizationDetailsFormValues } =
		organizationDetails || {};
	const { country_id: countryId } = organizationDetailsFormValues || {};

	const isCountryIndia = countryId === INDIA_COUNTRY_ID;

	const { formValues: personaFormValues } = persona || {};
	const { supplyService: categoryTypes } = personaFormValues || {};

	const { addressDetails } = accountInformation || {};
	const { isTaxApplicable, formList } = addressDetails || {};

	const {
		userControls = [],
		formProps = () => {},
		errors = {},
		onSubmit = () => {},
		onClickCancelButton = () => {},
		showElements,
		loading = false,
	} = useBillingAddressForm({
		...props,
		countryId,
	});

	const handleOpenDocument = () => {
		const url =
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/a325c49eae661f3c61b984496537af11/Sample-Certificate-of-Exemption.pdf';

		window.open(url, '_blank');
	};

	const { fields = {}, handleSubmit = () => {} } = formProps;

	let isCheckboxVisible = false;
	if (categoryTypes.includes('trucking') || categoryTypes.includes('other')) {
		isCheckboxVisible = true;
	}

	if (
		isCheckboxVisible &&
		(!isCountryIndia || isTaxApplicable || !isEmpty(formList))
	) {
		isCheckboxVisible = false;
	}

	return (
		<FormContainer>
			<Form onSubmit={handleSubmit((values) => onSubmit({ values }))}>
				<InputsContainer>
					{isCheckboxVisible ? (
						<CheckboxContainer>
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
								I am not covered under GST.{' '}
							</span>{' '}
							<span className="knowMore">Know more</span>
						</CheckboxContainer>
					) : null}

					<FormLayout
						controls={userControls}
						fields={fields}
						errors={errors}
						showElements={showElements}
					/>

					{isGstApplicable ? (
						<>
							<DocHeader>Sample GST Exemption Proof</DocHeader>
							<DocContainer onClick={handleOpenDocument}>
								<Flex>
									<DocIcon style={{ marginRight: 8 }} />
									<DocText>Sample Tax Exemption Proof.pdf</DocText>
								</Flex>
								<Flex>
									<LinkText>View</LinkText>
								</Flex>
							</DocContainer>
						</>
					) : null}
				</InputsContainer>

				<ButtonGroup>
					{state.accountInformation?.addressDetails?.formList.length > 0 && (
						<Button
							className="secondary md"
							onClick={onClickCancelButton}
							style={{ marginRight: 16 }}
						>
							Cancel
						</Button>
					)}

					<Button type="sumbit" className="primary md" disabled={loading}>
						Add Address
					</Button>
				</ButtonGroup>
			</Form>
		</FormContainer>
	);
}

export default BillingAddressForm;
