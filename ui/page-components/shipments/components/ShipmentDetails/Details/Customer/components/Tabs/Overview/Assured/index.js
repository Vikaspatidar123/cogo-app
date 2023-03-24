// import { IcCFtick } from '@cogoport/icons-react';
// import React from 'react';

// import {
// 	Container,
// 	Header,
// 	Text,
// 	AssuredDetails,
// 	Heading,
// 	IconWrapper,
// 	ItemLabel,
// 	FlexRow,
// } from './styles';
import { IcCFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Assured({ shipment_data = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-verifiedmark.svg"
					width={21}
					height={21}
					alt="verified"
				/>
				<div className={styles.text}>Assured By Cogoport</div>
			</div>

			<div className={styles.assuerd_detail}>
				{shipment_data?.cogo_assured_value_props?.map((element) => (
					<div className={styles.row}>
						<div className={styles.heading}>
							<div className={styles.icon_wrapper}>
								<IcCFtick />
							</div>

							<div className={styles.item_label}>{element}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Assured;
