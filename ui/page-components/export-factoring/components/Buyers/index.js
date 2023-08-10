import { Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import AddBuyerModal from './components/AddBuyerModal';
import BuyersList from './components/BuyersList';
import styles from './styles.module.css';

function Buyers({
	refetch,
	getCreditRequestResponse = {},
}) {
	const [openAddBuyer, setOpenAddBuyer] = useState(false);
	const { buyer_details = [] } = getCreditRequestResponse || {};
	return (
		<div>
			<div className={styles.header_div}>
				<div className={styles.header}>
					Buyers Information (
					{buyer_details?.length}
					)
				</div>
				<Button
					type="button"
					size="lg"
					onClick={() => setOpenAddBuyer((pv) => !pv)}
				>
					<IcMPlus />
					Add Buyer
				</Button>
			</div>
			{!isEmpty(buyer_details) && buyer_details?.map((buyers, index) => (
				<BuyersList
					key={buyers?.id}
					refetch={refetch}
					buyers={buyers}
					index={index}
					getCreditRequestResponse={getCreditRequestResponse}
				/>
			))}

			{openAddBuyer && (
				<AddBuyerModal
					refetch={refetch}
					openAddBuyer={openAddBuyer}
					setOpenAddBuyer={setOpenAddBuyer}
					getCreditRequestResponse={getCreditRequestResponse}
				/>
			)}
		</div>
	);
}

export default Buyers;
