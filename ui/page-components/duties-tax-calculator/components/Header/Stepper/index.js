import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import DotLine from './DotLine';
import styles from './styles.module.css';

function Stepper({
	stepper,
	setStepper,
	tradeEngineRespLength = 0,
	billId = '',
}) {
	const { t } = useTranslation(['dutiesTaxesCalculator']);

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
				subHeading={t('dutiesTaxesCalculator:stepper_title_transport')}
				isFirst
				isCompleted={transportDetails}
				isOngoing={ongoing === 'transportDetails'}
			/>
			<DotLine
				subHeading={t('dutiesTaxesCalculator:stepper_title_product')}
				isCompleted={productDetails}
				isOngoing={ongoing === 'productDetails'}
			/>
			<DotLine
				subHeading={t('dutiesTaxesCalculator:stepper_title_charge')}
				isCompleted={chargeDetails}
				isOngoing={ongoing === 'chargeDetails'}
			/>
			<DotLine
				subHeading={t('dutiesTaxesCalculator:stepper_title_result')}
				isLast
				isCompleted={payDetails}
				isOngoing={ongoing === 'payDetails'}
			/>
		</div>
	);
}

export default Stepper;
