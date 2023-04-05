import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Card({ item, priority }) {
	const dataArr = Array.isArray(item?.data) ? item?.data : [item?.data];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.row}>
					<div className={styles.priority_text}>
						(
						{priority + 1}
						{' '}
						Priority)
						{' '}
					</div>
					<div className={`${styles.priority_text} ${styles.purple}`}>
						{`${startCase(item.source)} Booking Note`}
					</div>
				</div>
			</div>
			<div className={styles.body}>
				{(dataArr || []).map((dataObj) => (
					<div className={styles.space_between}>
						<div>
							<div className={styles.heading}>Supplier Name</div>
							<p className={styles.sub_heading}>
								{dataObj?.service_provider?.business_name}
							</p>
						</div>
						<div>
							<div className={styles.heading}>Shipping Line</div>
							<p className={styles.sub_heading}>{dataObj?.shipping_line?.business_name}</p>
						</div>
						<div>
							<div className={styles.heading}>Source of Rate</div>
							<p className={styles.sub_heading}>{startCase(item?.source)}</p>
						</div>
						<div>
							<div className={styles.heading}>Buy Rate</div>
							<p className={styles.sub_heading}>
								{dataObj?.buy_currency}
								{' '}
								{dataObj?.data?.buy_price || 'NA'}
							</p>
						</div>
						<div>
							<div className={styles.heading}>Sailing Date</div>
							<p className={styles.sub_heading}>
								{format(new Date(), 'dd MMM yyyy')}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Card;
