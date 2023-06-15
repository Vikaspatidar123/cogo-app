import { Button } from '@cogoport/components';

import { paymentRequirementsControl } from '../../../configurations/paymentRequirementsControls';
import useUpdateOrganizationCreditRequirementDetails from
	'../../../hooks/useUpdateOrganizationCreditRequirementDetails';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function PaymentRequirements({ getCreditRequestResponse = {}, refetch = () => {} }) {
	const { customer_credit_requirements = {} } = getCreditRequestResponse || {};
	const { credit_amount = '', credit_days = '' } = customer_credit_requirements || {};

	const { control, handleSubmit } = useForm({
		defaultValues: {
			payment_days        : credit_days,
			payment_requirement : credit_amount,
		},
	});

	const {
		updateCreditRequirementDetails = () => {},
		loading = false,
	} = useUpdateOrganizationCreditRequirementDetails({ refetch, getCreditRequestResponse });

	const submit = (values) => {
		updateCreditRequirementDetails({ values });
	};

	return (
		<div>
			<form>
				{paymentRequirementsControl.map((item) => {
					const Element = getField(item?.type);
					return (
						<div className={styles.field}>
							<div className={styles.field_name}>{item.label}</div>
							<Element {...item} control={control} />
						</div>
					);
				})}
			</form>
			<div className={styles.button_wrapper}>
				<Button themeType="secondary" onClick={handleSubmit(submit)} loading={loading}>
					Save
				</Button>
			</div>
		</div>

	);
}

export default PaymentRequirements;
