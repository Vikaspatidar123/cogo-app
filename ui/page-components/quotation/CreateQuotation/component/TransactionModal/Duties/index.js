import { cl, Button } from '@cogoport/components';
import { useEffect } from 'react';

import transactionControl from '../../../configuration/transactionControl';
import useUpdateDuties from '../../../hooks/useUpdateDuties';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function Duties({
	quotationSetValue,
	setTransactionModal,
	transactionData = {},
	setShowSuccessModal,
}) {
	const {
		totalDutiesAndTaxes = '',
	} = transactionData;

	const { fetchUpdateDuties = () => {}, loading } = useUpdateDuties();
	const {
		control,
		setValue,
	} = useForm();
	const transactionDataLength = Object.keys(transactionData).length;

	useEffect(() => {
		if (transactionDataLength > 0) {
			const {
				incoterm = '',
				consignmentValue = '',
				resultCurrency,
				totalDutiesAndTaxes: dutiesTax = '',
			} = transactionData;
			setValue('incoterm', incoterm);
			setValue('consignment', consignmentValue);
			setValue('result', resultCurrency);
			setValue('applicable', dutiesTax);
			quotationSetValue('dutiesAndTaxes', dutiesTax);
		}
	}, [quotationSetValue, setValue, transactionData, transactionDataLength]);

	const handelSubmit = async () => {
		await fetchUpdateDuties(totalDutiesAndTaxes, transactionData?.quotationId);
		setTransactionModal(false);
		setShowSuccessModal(true);
	};

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{(transactionControl || []).map((field) => {
					const Element = getField(field?.type);
					return (
						<div
							key={field?.name}
							className={cl`${styles.col} ${styles?.[field?.className]}`}
							style={{ width: field?.width }}
						>
							<p className={styles.label}>{field?.label}</p>
							<Element {...field} control={control} className={styles.disabled} />
						</div>

					);
				})}

				<Button loading={loading} onClick={handelSubmit}>Apply</Button>
			</div>
			<div className={styles.line} />
		</div>
	);
}
export default Duties;
