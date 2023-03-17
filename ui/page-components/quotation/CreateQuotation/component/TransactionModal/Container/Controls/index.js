import { cl, Toggle } from '@cogoport/components';
import { useEffect, useState } from 'react';

import iconUrl from '../../../../../utils/iconUrl.json';

import styles from './styles.module.css';

const FLAGMAPPING = {
	N : <img src={iconUrl?.greenFlag} alt="green flag" />,
	Y : <img src={iconUrl?.redFlag} alt="red flag" />,
	M : <img src={iconUrl?.yellowFlag} alt="yellow flag" />,
};

function Controls({ controls }) {
	const [labeledValue, setLabeledValue] = useState('Import');
	const doc = (controls || []).filter((x) => x.tradeType === labeledValue);
	const [mapDoc, setMapDoc] = useState(doc);

	useEffect(() => {
		if (doc) setMapDoc(doc);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [labeledValue]);

	return (
		<>
			<div className={cl`${styles.flex_box} ${styles.title_container}`}>
				<div className={styles.flex_box}>
					<img
						className={styles.image}
						src={iconUrl?.ieControls}
						alt="icon"
					/>
					Import/Export Controls
				</div>
				<div className={styles.toggle}>
					<Toggle
						offLabel="Import"
						onLabel="Export"
						value={labeledValue}
						onChange={(e) => {
							if (e.target.checked) setLabeledValue('Export');
							else setLabeledValue('Import');
						}}
					/>
				</div>
			</div>
			<div className={styles.container}>
				{controls?.length > 0 ? (
					<div className={styles.section}>
						{mapDoc?.length > 0 && (
							mapDoc || []).map(({ description, status }) => (
								<div className={styles.flex_box} style={{ margiTop: '20px' }}>
									<div className="controlName">{description}</div>
									<div className="flag">{FLAGMAPPING(status)}</div>
								</div>
						))}
						{mapDoc?.length === 0 && (
							<div className={styles.flex_box} style={{ height: '70px' }}>
								<div className={styles.sorry}>No data here</div>
							</div>
						)}
					</div>
				) : (
					<div className={styles.flex_box} style={{ height: '70px' }}>
						<div className={styles.sorry}>Not Subscribed</div>
					</div>
				)}

			</div>
		</>

	);
}
export default Controls;
