import { useEffect } from 'react';

import Element from '../../../common/Element';
import getControls from '../configuration';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import FormItem from '@/ui/commons/components/FormItem';

function Duties({
	incoterm,
	consignmentValue,
	resultCurrency,
	totalDutiesAndTaxes,
	transactionData,
}) {
	const controls = getControls();
	const {
		fields,
		setValues,
	} = useForm(controls);
	useEffect(() => {
		setValues({
			incoterm,
			consignment : consignmentValue,
			result      : resultCurrency,
			applicable  : totalDutiesAndTaxes,
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transactionData]);
	return (
		<div className={styles.container}>
			<div className={styles.styled_row}>
				{(controls || []).map((item) => (
					<div className={styles.row} style={{ margin: 0 }}>
						<FormItem label={item?.label} className={item?.name}>
							<Element
								className="element"
								{...fields[item.name]}
								placeholder={item.placeholder}
								style={{ width: '100%' }}
							/>
						</FormItem>
					</div>
				))}
			</div>
			<div className={styles.hr} />
		</div>
	);
}
export default Duties;
