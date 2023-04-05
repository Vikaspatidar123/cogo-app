import { useState } from 'react';

import Poc from './Poc';
import Sop from './Sop';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function IEPocAndSop({ quickAction, setQuickAction = () => {} }) {
	const [sopTotal, setSopTotal] = useState(0);

	const scope = useSelector(({ general }) => general?.scope);

	return (
		<div className={styles.container}>
			<div className={styles.sop_div}>
				<div>
					SOP (
					{sopTotal}
					)
				</div>

				<Sop
					quickAction={quickAction}
					setSopTotal={setSopTotal}
					setQuickAction={setQuickAction}
				/>
			</div>

			<div className={styles.poc_div}>
				<div>POCs</div>

				<div className={styles.poc_container}>
					<Poc scope={scope} />
				</div>
			</div>
		</div>
	);
}

export default IEPocAndSop;
