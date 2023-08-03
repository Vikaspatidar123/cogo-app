import { Button, Checkbox } from '@cogoport/components';
import React from 'react';

import FormCard from '../../common/FormCard';
import useApplyCreditRequestCouponCode from '../../hooks/useApplyCreditRequestCouponCode';

import CompanyInfoForm from './CompanyInfoForm';
import Coupons from './Coupons';
import CreditRequirements from './CreditRequirements';
import PointOfContacts from './PointOfContacts';
import styles from './styles.module.css';
import TradeDetails from './TradeDetails';

function BasicDetails({ active = {}, getCreditRequestResponse = {}, refetch = () => {}, loading = false }) {
	const {
		proceedToPay,
		loading:paymentLoding,
	} = useApplyCreditRequestCouponCode({ getCreditRequestResponse, refetch });

	const mappingComponent = [
		{
			title       : 'Company Details',
			description : 'Provide company information',
			Component   : CompanyInfoForm,
		},
		{
			title       : 'Point of Contact',
			description : 'Selected POC will be reflected on agreement',
			Component   : PointOfContacts,
		},
		{
			title       : 'Trade Details',
			description : 'Provide the exporting countries and payment terms',
			Component   : TradeDetails,

		},
	];
	if (Object.keys(getCreditRequestResponse?.default_application_fees_details || {}).length !== 0) {
		mappingComponent.push({
			title       : 'Apply Coupons',
			description : 'Demand team recommendation',
			Component   : Coupons,
		});
	}
	const validateProcess = () => {
		const { poc_details = [], trade_details = [] } = getCreditRequestResponse;
		if (trade_details?.length > 0 && poc_details?.length > 0) { return false; }
		return true;
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.header}>Basic information</div>

				<FormCard
					componentMapping={mappingComponent}
					active={active}
					getCreditRequestResponse={getCreditRequestResponse}
					refetch={refetch}
					loading={loading}
				/>
				{/* <div className={styles.terms_condition_div}>
				<Checkbox />
				<div className={styles.terms}>
					I accept the Cogoport
					{' '}
					<a
						href="https://www.cogoport.com/en-IN/terms-and-conditions"
						target="_blank"
						rel="noopener noreferrer"
					>
						Terms of Service
					</a>
					{' '}
					and
					{' '}
					<a
						href="https://www.cogoport.com/en-IN/privacy-policy"
						target="_blank"
						rel="noopener noreferrer"
					>
						Privacy Policy
					</a>
				</div>
			</div> */}

			</div>
			<div className={styles.button_wrapper}>
				<Button
					size="lg"
					disabled={validateProcess() || paymentLoding}
					themeType="primary"
					onClick={proceedToPay}
					loading={paymentLoding}
					type="button"
					className={styles.proceed_button}
				>
					Proceed
				</Button>
			</div>
		</>
	);
}

export default BasicDetails;
