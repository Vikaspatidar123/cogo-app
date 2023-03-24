import { IcMPortArrow } from '@cogoport/icons-react';

import getInfo from '../../helpers/getInfo';
import AdditionalServices from '../AdditionalServices';

import LoadingCard from './LoadingCard';
import LocationData from './LocationData';
import RenderTags from './RenderTags';
import styles from './styles.module.css';

function Title({
	activePortPair,
	detail,
	portPairloading,
	searchParams = {},
}) {
	const { search_type } = searchParams || '';
	const containerSearchParam =		(searchParams || {})[`${search_type}_services_attributes`] || [];
	const tagData = getInfo(containerSearchParam[0] || {});

	return portPairloading ? (
		<LoadingCard />
	) : (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.port_container}>
					<div className={styles.index_container}>
						<div className={styles.index_list}>{activePortPair + 1}</div>
					</div>
					<LocationData
						locationData={detail?.origin_port || detail?.origin_airport}
					/>
					<IcMPortArrow className={styles.anchor_icon} />
					<LocationData
						locationData={
							detail?.destination_port || detail?.destination_airport
						}
					/>
				</div>
				<RenderTags tagData={tagData} />
			</div>
			<div className={styles.extra_service}>
				<AdditionalServices
					serviceDetails={detail?.service_details}
					type="titlecard"
				/>
			</div>
		</div>
	);
}

export default Title;
