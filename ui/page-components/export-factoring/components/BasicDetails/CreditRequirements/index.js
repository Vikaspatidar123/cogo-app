import { Button, Pill, Accordion } from '@cogoport/components';

import { getAccordianTitle } from '../../../common/utils';
import { creditRequirementsControls } from '../../../configurations/creditRequirementsControls';
import useUpdateCreditRequirement from '../../../hooks/useUpdateCreditRequirement';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function CreditRequirements({ getCreditRequestResponse = {}, refetch = () => { } }) {
	const { customer_credit_requirements = {} } = getCreditRequestResponse || {};
	const { credit_amount = '', credit_days = '' } = customer_credit_requirements || {};

	const { control, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			credit_days,
			credit_amount,
		},
	});

	const {
		updateCreditRequirement = () => { },
		loading = false,
	} = useUpdateCreditRequirement({ refetch, getCreditRequestResponse });

	const submit = (values) => {
		updateCreditRequirement({ values });
	};

	return (
		<div className={styles.container}>
			<form className={styles.form_container}>
				<Accordion
					title={getAccordianTitle({
						placeholder: 'Credit Requirements',
					})}
					type="form"
				>
					{(creditRequirementsControls || []).map((item) => {
						const Element = getField(item?.type);
						return (
							<div className={styles.field}>
								<Element {...item} control={control} />
								<div className={styles.error_text}>
									{errors?.[item.name]?.message
									|| errors?.[item.name]?.type}
								</div>
							</div>
						);
					})}
					<div className={styles.button_wrapper}>
						<Button themeType="secondary" onClick={handleSubmit(submit)} loading={loading}>
							Save
						</Button>
					</div>
				</Accordion>
			</form>

		</div>

	);
}

export default CreditRequirements;
