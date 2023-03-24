import Layout from '@cogo/business-modules/form/Layout';
import global from '@cogo/commons/constants/global';
import { Flex } from '@cogoport/front/components';
import { Button } from '@cogoport/front/components/admin';
import Checkbox from '@cogoport/front/components/admin/CheckBox';
import { isEmpty } from '@cogoport/front/utils';
import React from 'react';

import DocIcon from '../icons/doc-icon.svg';

import styles from './styles.module.css';
import useBillingAddressForm from './useBillingAddressForm';

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

	const { formValues: organizationDetailsFormValues } =		organizationDetails || {};
	const { country_id: countryId } = organizationDetailsFormValues || {};

	const isCountryIndia = countryId === INDIA_COUNTRY_ID;

	const { formValues: personaFormValues } = persona || {};
	const { supplyService: categoryTypes = [] } = personaFormValues || {};

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

	const { fields = {}, handleSubmit = () => {} } = formProps;

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
								I am not covered under GST.
								{' '}
							</span>
							{' '}
							<span className="knowMore">Know more</span>
						</CheckboxContainer>
					) : null}

					<Layout
						controls={userControls}
						fields={fields}
						errors={errors}
						showElements={showElements}
					/>

					{isGstApplicable ? (
						<>
							<DocHeader>Sample GST Exemption Proof</DocHeader>
							<DocContainer>
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

					<Button
						type="sumbit"
						className="primary md"
						disabled={loading}
						style={{ border: '1px solid #393f70' }}
					>
						ADD ADDRESS
					</Button>
				</ButtonGroup>
			</Form>
		</FormContainer>
	);
}

export default BillingAddressForm;
