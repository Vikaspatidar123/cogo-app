import { Button } from '@cogoport/components';
import React from 'react';
import { useForm } from 'react-hook-form';

import FieldArray from '../../../common/FieldArray';
import { financialReportControls } from '../../../configurations/getFinanceControls';

import styles from './styles.module.css';

function FinancialReport({
	setUpdatedValues = () => { },
}) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({});
	const saveValues = (values) => {
		setUpdatedValues((prev) => ({ ...prev, ...values }));
	};
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Financial Report</div>
			<div className={styles.sub_heading}>Add & View Financial Details</div>
			<div className={styles.finance_container}>
				{financialReportControls().map((item) => (
					<FieldArray
						{...item}
						control={control}
						name={item.name}
						error={errors?.[item.name]}
					/>
				))}
				<div className={styles.footer_container}>
					<Button onClick={handleSubmit(saveValues)}>Save</Button>
				</div>
			</div>
		</div>
	);
}

export default FinancialReport;
