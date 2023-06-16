import { Button, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import FormTitleAndDescription from '../../common/FormTitleAndDescription';
import useApplyCreditRequestCouponCode from '../../hooks/useApplyCreditRequestCouponCode';

import CompanyDetailsForm from './CompanyDetailsForm';
import Coupons from './Coupons';
import PaymentRequirements from './PaymentRequirements';
import POCForm from './POCForm';
import styles from './styles.module.css';

const DETAILS_ARRAY = ['company_details', 'poc', 'requirements', 'coupons'];

const formMapping = {
	company_details : CompanyDetailsForm,
	poc             : POCForm,
	requirements    : PaymentRequirements,
	coupons         : Coupons,
};

function BasicDetailsForm({ getCreditRequestResponse = {}, refetch = () => {} }) {
	const { customer_credit_requirements = {}, poc_details = [] } = getCreditRequestResponse || {};

	const { proceedToPay, loading } = useApplyCreditRequestCouponCode({ getCreditRequestResponse, refetch });

	return (
		<div>
			{DETAILS_ARRAY.map((details) => {
				const FormFields = formMapping[details];

				return (
					<div className={styles.wrapper}>
						<div className={styles.form_description}>
							<FormTitleAndDescription details={details} />
						</div>
						<div className={styles.form}>
							<FormFields
								getCreditRequestResponse={getCreditRequestResponse}
								refetch={refetch}
							/>
						</div>
					</div>
				);
			})}
			<div className={styles.button_wrapper}>
				<Button
					onClick={() => (isEmpty(customer_credit_requirements)
						? Toast.error('Please fill all mandatory fields')
						: proceedToPay())}
					loading={loading}
					disabled={isEmpty(customer_credit_requirements) || isEmpty(poc_details)}
				>
					Proceed to pay
				</Button>
			</div>
		</div>
	);
}

export default BasicDetailsForm;
