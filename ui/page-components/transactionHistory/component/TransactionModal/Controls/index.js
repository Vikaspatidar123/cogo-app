import { Toggle } from '@cogoport/components';
import {
	IcCGreenCircle, IcCRedCircle, IcCYelloCircle, IcMAccountSettings,
} from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

const MAPPING = {
	N : <IcCGreenCircle height={20} width={20} />,
	Y : <IcCRedCircle height={20} width={20} />,
	M : <IcCYelloCircle height={20} width={20} />,
};
function Control({ controls }) {
	const [labeledValue, setLabeledValue] = useState('IMPORT');
	const doc = (controls || []).filter((x) => x.tradeType === labeledValue);
	const [mapDoc, setMapDoc] = useState(doc);
	useEffect(() => {
		if (doc) setMapDoc(doc);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [labeledValue]);

	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<div className="name">
					<IcMAccountSettings width={20} height={20} />
					Import/Export Controls
				</div>
				<div className="toggle">
					<Toggle
						offLabel={{ label: 'Import', value: 'IMPORT' }}
						onLabel={{ label: 'Export', value: 'EXPORT' }}
						value={labeledValue}
						onChange={setLabeledValue}
					/>
				</div>
			</div>
			{controls?.length > 0 ? (
				<div className={styles.section2}>
					{(mapDoc || []).map(({ description, status }) => (
						<div className={styles.row} key="">
							<div className="controlName">{description}</div>
							<div className="flag">{MAPPING[status]}</div>
						</div>
					))}
				</div>
			) : (
				<div className={styles.section3}>
					<div className={styles.text_total}>Not Subscribed</div>
				</div>
			)}
		</div>
	);
}
export default Control;
