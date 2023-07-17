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
		{
			title       : 'Credit Requirements',
			description : 'Demand team recommendation',
			Component   : CreditRequirements,
		},
		{
			title       : 'Apply Coupons',
			description : 'Demand team recommendation',
			Component   : Coupons,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.header}>Basic information</div>
			<FormCard
				componentMapping={mappingComponent}
				active={active}
				getCreditRequestResponse={getCreditRequestResponse}
				refetch={refetch}
				loading={loading}
			/>
			<div className={styles.terms_condition_div}>
				<Checkbox />
				<div className={styles.terms}>
					I accept the Cogoport
					<span onClick={() => window.open(
						'https://www.cogoport.com/en-IN/terms-and-conditions',
						'_blank',
					)}
					>
						{' '}
						Terms of Service
						{' '}

					</span>
					and
					<span onClick={() => window.open(
						'https://www.cogoport.com/en-IN/privacy-policy',
						'_blank',
					)}
					>
						Privacy Policy

					</span>
				</div>
			</div>
			<div className={styles.button_wrapper}>
				<Button
					onClick={proceedToPay}
					loading={paymentLoding}
					type="button"
				>
					Proceed to pay
				</Button>
			</div>
		</div>
	);
}

export default BasicDetails;
