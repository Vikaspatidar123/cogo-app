import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function LineItems({ line_items = [] }) {
	return (
		<div className={styles.row_container}>
			{(line_items || []).map((item = {}) => {
				const {
					name = '',
					code = '',
					quantity = '',
					price = 0,
					currency = '',
					unit = '',
					total_price = 0,
				} = item || {};
				return (
					<div style={{ display: 'flex' }} key={name} className="line-item">
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div className={styles.charge_name}>
								{name}
								{' '}
								{code ? `(${code})` : ''}
							</div>
						</div>
						<div
							style={{
								textAlign     : 'right',
								display       : 'flex',
								flexDirection : 'column',
							}}
						>
							<div className={styles.cost_calculation}>
								<div className={styles.quantity}>{quantity}</div>
								<div className={styles.cross}>x</div>
								<div className={styles.price}>
									{formatAmount({
										amount  : price,
										currency,
										options : {
											style                 : 'currency',
											currencyDisplay       : 'symbol',
											maximumFractionDigits : 0,
										},
									})}
								</div>
								<div className={styles.unit}>
									/
									{unit?.replace('_', ' ')}
								</div>
							</div>
						</div>
						<div
							style={{
								textAlign     : 'right',
								display       : 'flex',
								flexDirection : 'column',
							}}
						>
							<div className={styles.total_price}>
								{formatAmount({
									amount  : total_price || 0,
									currency,
									options : {
										style                 : 'currency',
										currencyDisplay       : 'symbol',
										maximumFractionDigits : 0,
									},
								})}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default LineItems;
