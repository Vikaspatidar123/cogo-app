import { useEffect } from 'react';

import getControls from '../configuration';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import FormItem from '@/ui/commons/components/FormItem';
// import Element from '@/ui/page-components/hs-code/common/Item/Element';

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
		// formState: { errors },
	} = useForm(controls);
	useEffect(() => {
		setValues({
			incoterm,
			consignment : consignmentValue,
			result      : resultCurrency,
			applicable  : totalDutiesAndTaxes,
		});
	}, [transactionData]);
	return (
		<div className={styles.container}>
			<div className={styles.styled_row}>
				{(controls || []).map((item) => console.log(item, 'item')(
					<div className={styles.row} style={{ margin: 0 }}>
						<FormItem label={item?.label} className={item?.name}>
							{/* <Element
								className="element"
								{...fields[item.name]}
								placeholder={item.placeholder}
								style={{ width: '100%' }}
							/> */}
						</FormItem>
					</div>,
				))}
			</div>
			<div className={styles.hr} />
		</div>
	);
}
export default Duties;
