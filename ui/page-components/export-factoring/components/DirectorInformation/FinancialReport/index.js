import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import FieldArray from '../../../common/FieldArray';
import FilePreview from '../../../common/FilePreview';
import { financialReportControls } from '../../../configurations/getFinanceControls';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

function FinancialReport({
	setUpdatedValues = () => { },
	updatedValues = {},
}) {
	const { financial_data = [] } = updatedValues;
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({});
	const saveValues = (values) => {
		setUpdatedValues((prev) => ({ ...prev, ...values }));
	};
	if (!isEmpty(financial_data)) {
		return (
			<div className={styles.container}>
				<div className={styles.heading}>Financial Report</div>
				{financial_data.map((item) => (

					<div key={item.select_year}>
						{item.select_year}
						<div className={styles.file_wrapper}>
							<FilePreview name="Finacial Report" url={item.financial_report} />
							<FilePreview name="ITR Report" url={item.itr} />
						</div>
					</div>

				))}
			</div>

		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Financial Report</div>
			<div className={styles.sub_heading}>Add & View Financial Details</div>
			<div className={styles.finance_container}>
				{financialReportControls().map((item) => (
					<FieldArray
						key={item.name}
						{...item}
						control={control}
						name={item.name}
						error={errors?.[item.name]}
					/>
				))}
				<div className={styles.footer_container}>
					<Button onClick={handleSubmit(saveValues)} type="button">Save</Button>
				</div>
			</div>
		</div>
	);
}

export default FinancialReport;
