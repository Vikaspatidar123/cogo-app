import { cl } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { useState } from 'react';

import Controls from './Controls';
import Documents from './Documents';
import LandedCost from './LandedCost';
import styles from './styles.module.css';

function Container({ item, resultCurrency, index }) {
	const [showDrill, setShowDrill] = useState(false);

	const {
		controls = [],
		documents = [],
		landedCost = [],
		hsNumber,
		productName,
	} = item || {};

	const description = (sectionDescription = '') => {
		if (showDrill) return sectionDescription;
		if (sectionDescription?.length > 40) { // mobile case
			return `${sectionDescription?.substring(0, 40)}....`;
		}
		if (sectionDescription?.length > 96) {
			return `${sectionDescription?.substring(0, 135)}....`;
		}
		return sectionDescription;
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				Product #
				{index + 1}
				:
				<div className={styles.hscode}>{hsNumber}</div>
			</div>

			<div
				className={cl`${styles.flex_box} ${styles.card_row}`}
				role="presentation"
				onClick={() => setShowDrill(!showDrill)}
			>
				<div className={cl`${styles.flex_box} ${styles.card_title}`}>
					{description(productName)}
				</div>
				<div className={styles.arrow_container}>
					<IcMArrowDown
						width={15}
						height={15}
						className={cl`${showDrill && styles.rotate_icon} ${styles.hyperlink_icon}`}
					/>
				</div>
			</div>

			{showDrill && (
				<div className={cl`${styles.card_body} ${showDrill && styles.display_drill}`}>
					<div className={styles.footer}>
						<div>
							<LandedCost landedCost={landedCost} resultCurrency={resultCurrency} />
						</div>
						<div>
							<Controls controls={controls} />
						</div>
						<div>
							<Documents documents={documents} hsNumber={hsNumber} />
						</div>

					</div>
				</div>
			)}
		</div>
	);
}

export default Container;
