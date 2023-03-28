import { IcMLocation } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function List({ rate, onClickResultRow, creatingAlternate }) {
	return (
		<div className={styles.container}>
			<div style={{ width: '45%' }}>
				<div className={`${styles.deviation} ${styles.icon_deviation}`}>
					<IcMLocation
						style={{
							width    : '30px',
							height   : '30px',
							margin   : '0 auto',
							display  : 'block',
							position : 'absolute',
							top      : '10px',
							left     : '6px',
						}}
					/>

					<IcMLocation
						style={{
							width    : '30px',
							height   : '30px',
							margin   : '0 auto',
							display  : 'block',
							position : 'absolute',
							top      : '10px',
							left     : '18px',
						}}
					/>
				</div>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className={styles.heading}>
					{(rate?.origin_port || rate?.origin_airport)?.name}
					{' '}
					to New
					{' '}
					{(rate?.destination_port || rate?.destination_airport)?.name}
				</div>

				<div className={styles.communicate}>
					Rates starting from:
					<strong style={{ marginLeft: '4px' }}>
						{formatAmount({
							amount   : rate.freight_price,
							currency : rate.freight_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 0,
							},
						})}
					</strong>
				</div>

				<div
					className={`${styles.view_result} ${creatingAlternate ? 'disable' : ''}`}
					onClick={
						!creatingAlternate
							? () => onClickResultRow({
								origin_port_id         : rate?.origin_port?.id,
								destination_port_id    : rate?.destination_port?.id,
								origin_airport_id      : rate?.origin_airport_id,
								destination_airport_id : rate?.destination_airport_id,
							})
							: null
					}
				>
					{creatingAlternate ? 'Getting results' : 'See results'}
				</div>
			</div>
		</div>
	);
}

export default List;
