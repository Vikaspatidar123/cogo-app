import { cl, Toggle } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import iconUrl from '../../../../../utils/iconUrl.json';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const FLAG_MAPPING = {
	N : <Image src={GLOBAL_CONSTANTS.image_url.iec_green_flag} width={18} height={18} alt="green flag" />,
	Y : <Image src={GLOBAL_CONSTANTS.image_url.iec_red_flag} width={18} height={18} alt="red flag" />,
	M : <Image src={GLOBAL_CONSTANTS.image_url.iec_yellow_flag} width={18} height={18} alt="yellow flag" />,

};

function Controls({ controls }) {
	const [labeledValue, setLabeledValue] = useState('IMPORT');
	const [controlVal, setControlVal] = useState({
		importControls : [],
		exportControls : [],
	});

	const { importControls, exportControls } = controlVal;

	const TAB_MAPPING = {
		IMPORT : importControls,
		EXPORT : exportControls,
	};

	useEffect(() => {
		if (!isEmpty(controls)) {
			const impControls = [];
			const expControls = [];

			(controls || []).forEach((control) => {
				if (control?.tradeType === 'IMPORT') {
					impControls.push(control);
				} else {
					expControls.push(control);
				}
			});

			setControlVal({
				importControls : impControls,
				exportControls : expControls,
			});
		}
	}, [controls]);

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
							setLabeledValue(e.target.checked ? 'EXPORT' : 'IMPORT');
						}}
					/>
				</div>
			</div>
			<div className={styles.container}>
				{!isEmpty(controls) ? (
					<div className={styles.section}>
						{!isEmpty(TAB_MAPPING?.[labeledValue]) ? (
							TAB_MAPPING[labeledValue].map((ele, index) => {
								const { description, status } = ele || {};
								return (
									<div
										key={`${index + 1}_${description}_${status}`}
										className={styles.flex_box}
										style={{ marginTop: '20px' }}
									>
										<div>{description}</div>
										<div>{FLAG_MAPPING[status]}</div>
									</div>
								);
							})
						) : (
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
