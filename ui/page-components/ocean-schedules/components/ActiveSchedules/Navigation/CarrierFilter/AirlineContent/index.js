import { Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

import { Image } from '@/packages/next';

function AirlineContent(props) {
	const { list, events, value } = props;
	const handleChange = (item) => {
		events(item, value);
	};
	return (
		<div className={styles.flex}>
			<ul style={{ padding: '0px 10px 0px 10px' }}>
				{list?.map((item, i) => (
					<div className={styles.flex} key={item.id} style={{ alignItems: 'center' }}>
						<Checkbox
							checked={item.status}
							onChange={() => handleChange(item)}
							id={`${i}_active_air_sch_filter_dp`}
						/>
						<div className={styles.title}>
							<Image
								src={item?.logo_url}
								alt=""
								width={40}
								height={15}
							/>
							{item.name}
						</div>
					</div>
				))}
			</ul>
		</div>
	);
}

export default AirlineContent;
