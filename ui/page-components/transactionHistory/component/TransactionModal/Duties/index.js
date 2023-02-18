import { useEffect } from 'react';

// import getField from '../../../../../common/form/components';
// import FormItem from '../../../../../common/ui/FormItem';
import getControls from '../configuration';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';

function Duties({
	isMobile,
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
					<>1234</>,
					// <Row xs={isMobile ? 12 : item.span || 3} style={{ margin: 0 }}>
					// 	<FormItem label={item?.label} className={item?.name}>
					// 		<Element
					// 			className="element"
					// 			{...fields[item.name]}
					// 			placeholder={item.placeholder}
					// 			style={{ width: '100%' }}
					// 		/>
					// 	</FormItem>
					// </Row>
				))}
			</div>
			<div className={styles.hr} />
		</div>
	);
}
export default Duties;
