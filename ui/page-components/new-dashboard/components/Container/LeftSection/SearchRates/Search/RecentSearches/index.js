import { IcALocation, IcMPortArrow } from '@cogoport/icons-react';

import { airValueKeys, seaValueKeys } from '../../../../../../constant';

import styles from './styles.module.css';

const reverseArray = (arr) => arr?.map((_, idx) => arr[arr.length - 1 - idx]);

export function RecentSeaSearch({ arr, onClick }) {
	return reverseArray(arr)?.map((data, i) => (
		// eslint-disable-next-line react/no-array-index-key
		<div key={i} className={styles.search_tab} role="presentation" onClick={() => onClick(arr.length - i - 1)}>
			<div className={styles.search_detail_box}>
				<div className={styles.od_box}>
					<span className={styles.origin_dest}>
						<IcALocation className={styles.location_icon} />
						<span>{data.originDisplayName}</span>
					</span>
					<IcMPortArrow className={styles.port_arrow} />
					<span className={styles.origin_dest}>
						<IcALocation className={styles.location_icon} />
						<span>{data.destinationDisplayName}</span>
					</span>

				</div>
				<div className={styles.secondary_div}>
					<span className={styles.secondary_span}>{data.time}</span>
					<span className={styles.secondary_span}>{seaValueKeys[data.tabValue]}</span>
					<span className={styles.secondary_span}>{data.count}</span>
					<span className={styles.secondary_span}>{seaValueKeys[data.size]}</span>
				</div>
			</div>
		</div>
	));
}

export function RecentAirSearch({ arr, onClick }) {
	return reverseArray(arr)?.map((data, i) => (
		// eslint-disable-next-line react/no-array-index-key
		<div key={i} className={styles.search_tab} role="presentation" onClick={() => onClick(arr.length - i - 1)}>
			<div className={styles.search_detail_box}>
				<div className={styles.od_box}>
					<span className={styles.origin_dest}>
						<IcALocation className={styles.location_icon} />
						<span>{data.originDisplayName}</span>
					</span>
					<IcMPortArrow className={styles.port_arrow} />
					<span className={styles.origin_dest}>
						<IcALocation className={styles.location_icon} />
						<span>{data.destinationDisplayName}</span>
					</span>
				</div>
				<div className={styles.secondary_div}>
					<span className={styles.secondary_span}>{data.time}</span>
					<span
						style={{ width: '50px' }}
						className={styles.secondary_span}
					>
						{airValueKeys[data.tabValue]}

					</span>
					<span className={styles.secondary_span}>{data.amount}</span>
					<span className={styles.secondary_span}>{data.count}</span>
					<span className={styles.secondary_span}>{airValueKeys[data.type]}</span>
				</div>
			</div>
		</div>
	));
}
