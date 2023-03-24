import { cl } from '@cogoport/components';
import { IcMAirport, IcMFlcl, IcMShip } from '@cogoport/icons-react';

import getInfo from '../../../helpers/getInfo';
import getTagData from '../../../helpers/getTagData';
import AdditionalServices from '../../AdditionalServices';

import CommodityMapping from './CommodityMapping';
import Route from './Route';
import styles from './styles.module.css';

function LocationCard({
	index,
	selectedData,
	activePortPair,
	setActivePortPair,
	spotSearchId,
	source = '',
	item,
}) {
	const detail = item?.detail || {};
	const showTags = getTagData(item, source);
	const { search_type } = item || '';
	const containerSearchParam =		(item?.search_params || {})[`${search_type}_services_attributes`] || [];
	const tagData = getInfo(containerSearchParam[0] || {});

	const prefixIcon = {
		fcl_freight : <IcMShip fill="#436DF4" />,
		lcl_freight : <IcMFlcl fill="#436DF4" />,
		air_freight : <IcMAirport fill="#436DF4" />,
	};

	return (
		<div
			className={cl`${styles.container} ${activePortPair === index && styles.selected}`}
			role="presentation"
			onClick={() => setActivePortPair(index)}
		>
			<div className={styles.header}>
				<div className={styles.service_type}>
					<div className={styles.icon_container}>{prefixIcon[detail?.service_type]}</div>
					<div className={styles.service}>{detail?.service_type?.split('_')[0]}</div>
				</div>

				<div className={styles.tag_data}>
					{showTags.map((itm) => (
						<div className={styles.tagbg} style={{ color: itm.color, background: itm.bgcolor }}>
							{itm.valueText}
						</div>
					))}
				</div>
			</div>

			<Route
				selectedData={selectedData}
				spotSearchId={spotSearchId}
				index={index}
				activePortPair={activePortPair}
				detail={detail}
				source={source}
			/>
			<CommodityMapping tagData={tagData} />
			<AdditionalServices serviceDetails={detail?.service_details} />
		</div>
	);
}

export default LocationCard;
