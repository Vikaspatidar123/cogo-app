import { Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React, { useState } from 'react';

import AddBuyerModal from './components/AddBuyerModal';
import BuyersList from './components/BuyersList';
import styles from './styles.module.css';

function Buyers() {
	const [openAddBuyer, setOpenAddBuyer] = useState(false);
	return (
		<div>
			<div className={styles.header_div}>
				<div className={styles.header}>
					Buyers Information (1)
				</div>
				<Button
					type="button"
					size="md"
					onClick={() => setOpenAddBuyer((pv) => !pv)}
				>
					<IcMPlus />
					Add Buyer
				</Button>
			</div>
			<BuyersList />
			{openAddBuyer && (
				<AddBuyerModal openAddBuyer={openAddBuyer} setOpenAddBuyer={setOpenAddBuyer} />
			)}
		</div>
	);
}

export default Buyers;
