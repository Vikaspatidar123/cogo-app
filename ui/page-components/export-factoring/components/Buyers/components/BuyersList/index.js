import { Accordion, Pill, Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';

import styles from './styles.module.css';
import PocDetails from '../PocDetails';
import { useState } from 'react';
import AddPocModal from '../AddPocModal';

const titleInfo = () => (
	<div className={styles.headerDiv}>
		<div className={styles.header}>
			Buyer-1
		</div>
		<Pill size="md" color="green">
			Verified
		</Pill>
	</div>
);

function BuyersList() {
	const [openAddPoc, setOpenAddPoc] = useState(false);

	return (
		<div>
			<Accordion
				type="text"
				title={titleInfo()}
				style={{ width: '100%' }}
			>
				<div className={styles.flexDiv}>
					<div className={styles.dataDiv}>
						<div className={styles.labelText}>
							Payment Terms
						</div>
						<div className={styles.valueText}>
							Open Account
						</div>
					</div>
					<div className={styles.dataDiv}>
						<div className={styles.labelText}>
							Address
						</div>
						<div className={styles.valueText}>
							Current Account
						</div>
					</div>
					<div className={styles.dataDiv}>
						<div className={styles.labelText}>
							Utilization
						</div>
						<div className={styles.valueText}>
							Current Account
						</div>
					</div>
				</div>
				<div className={styles.horizontalLine} />
				<div className={styles.flexDiv}>
					<div>POC Details (1)</div>
					<Button
						themeType="accent"
						type="button"
						size="sm"
						onClick={() => setOpenAddPoc((pv) => !pv)}

					>
						<IcMPlus />
						Add POC
					</Button>
				</div>
				<div>
					<PocDetails />
				</div>
			</Accordion>
			{openAddPoc && (
				<AddPocModal openAddPoc={openAddPoc} setOpenAddPoc={setOpenAddPoc} />
			)}
		</div>
	);
}

export default BuyersList;
