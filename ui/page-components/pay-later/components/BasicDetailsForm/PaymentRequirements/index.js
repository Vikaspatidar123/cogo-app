import { Button, Pill } from '@cogoport/components';

import { paymentRequirementsControl } from '../../../configurations/paymentRequirementsControls';
import useUpdateOrganizationCreditRequirementDetails from
	'../../../hooks/useUpdateOrganizationCreditRequirementDetails';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function PaymentRequirements({ getCreditRequestResponse = {}, refetch = () => { } }) {
	const { customer_credit_requirements = {} } = getCreditRequestResponse || {};
	const { credit_amount = '', credit_days = '' } = customer_credit_requirements || {};

	const { control, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			credit_days,
			credit_amount,
		},
	});

	const {
		updateCreditRequirementDetails = () => { },
		loading = false,
	} = useUpdateOrganizationCreditRequirementDetails({ refetch, getCreditRequestResponse });

	const submit = (values) => {
		updateCreditRequirementDetails({ values });
	};

	return (
		<div>
			<form>
				{(paymentRequirementsControl || []).map((item) => {
					const Element = getField(item?.type);
					return (
						<div className={styles.field}>
							<div className={styles.field_name}>
								{item.label}
								{customer_credit_requirements?.[item.name] && <Pill color="green">Completed</Pill>}
							</div>
							<Element {...item} control={control} />
							<div className={styles.error_text}>
								{errors?.[item.name]?.message
									|| errors?.[item.name]?.type}
							</div>
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
