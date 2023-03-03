import { useState, useEffect } from 'react';

import DotLine from './DotLine';
import styles from './styles.module.css';

function Stepper({
	stepper,
	setStepper,
	tradeEngineRespLength = 0,
	billId = '',
}) {
	const [ongoing, setOngoing] = useState();
	const {
		transportDetails, productDetails, chargeDetails, payDetails,
	} = stepper || {};

	const stepperKey = Object.keys(stepper);
	const stepperValue = Object.values(stepper);

	useEffect(() => {
		const index = stepperValue.findIndex((ele) => !ele);
		if (index > 0) {
			setOngoing(stepperKey[index - 1]);
		} else if (tradeEngineRespLength === 0) {
			setOngoing('payDetails');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(stepper)]);

	useEffect(() => {
		if (tradeEngineRespLength > 0) {
			setOngoing('');
			setStepper({
				transportDetails : true,
				productDetails   : true,
				chargeDetails    : true,
				payDetails       : true,
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tradeEngineRespLength]);

	useEffect(() => {
		if (billId !== '') {
			setOngoing('payDetails');
			setStepper({
				transportDetails : true,
				productDetails   : true,
				chargeDetails    : true,
				payDetails       : true,
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
			<DotLine
				subHeading="Transportation Details"
				isFirst
				isCompleted={transportDetails}
				isOngoing={ongoing === 'transportDetails'}
			/>
			<DotLine
				subHeading="Product Details"
				isCompleted={productDetails}
				isOngoing={ongoing === 'productDetails'}
			/>
			<DotLine
				subHeading="Charge Details"
				isCompleted={chargeDetails}
				isOngoing={ongoing === 'chargeDetails'}
			/>
			<DotLine
				subHeading="Pay and Get Results"
				isLast
				isCompleted={payDetails}
				isOngoing={ongoing === 'payDetails'}
			/>
		</div>
	);
}

export default Stepper;
