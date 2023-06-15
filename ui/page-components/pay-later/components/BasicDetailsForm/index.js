import { Button } from '@cogoport/components';

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
							<FormFields getCreditRequestResponse={getCreditRequestResponse} refetch={refetch} />
						</div>
					</div>
				);
			})}
			<div className={styles.button_wrapper}>
				<Button onClick={() => proceedToPay()} loading={loading}>
					Proceed to pay
				</Button>
			</div>
		</div>
	);
}

export default BasicDetailsForm;
