import { cl, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Cards({ stats, loading }) {
	const {
		earned,
		expired,
		balance,
		provisional,
		locked,
		cogostore_redeemable = 0,
	} = stats || {};
	const items = [
		{
			heading      : 'Lifetime Cogopoints',
			value        : earned || 0,
			footer       : `${expired || 0} Cogopoints Expired`,
			footer_color : 'red',
		},
		{
			heading     : 'Earned Cogopoints',
			value       : balance || 0,
			value_color : 'green',
		},
		{
			heading : 'To be Collected Points',
			value   : provisional + locked || 0,
		},
		{
			heading : 'Cogostore Redeemable',
			value   : cogostore_redeemable || 0,
			info    : 'Use upto 40% of your Cogopoints balance to purchase Cogostore products',
		},
	];
	return (
		<div className={styles.card}>
			{items?.map((item) => (
				<div
					key={item.heading}
					className={styles.content}
				>
					<div className={styles.heading}>
						{item.heading}
						{item.info && (
							<Tooltip content={item.info} placement="bottom">
								<IcMInfo className={styles.info_icon} />
							</Tooltip>
						)}
					</div>
					{loading ? (
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
							alt="loading"
							width={50}
							height={40}
						/>
					) : (
						<div className={cl`${styles.value} ${styles[item.value_color]}`}>
							{item.value}
						</div>
					)}

					<div className={`${styles.footer} ${styles[item.footer_color]}`}>
						{item.footer}
						{item.svg ? (
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Vector 647 (Stroke).svg"
								alt="stroke img"
							/>
						) : (
							''
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default Cards;
