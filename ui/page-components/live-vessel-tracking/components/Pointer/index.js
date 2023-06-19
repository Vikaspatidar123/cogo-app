import { L, Marker, FeatureGroup, Tooltip } from '@cogoport/maps';
import ReactDOMServer from 'react-dom/server';

import formatDate from '../../utils/formatDate';
import { imageUrl } from '../../utils/imageUrl';

import styles from './styles.module.css';

const DATE_FORMAT = 'dd/MM/yyyy';
const TIME_FORMAT = 'hh:mm aaa';

const ICON_MAPPING = {
	yellow : imageUrl.yellow_vessel,
	red    : imageUrl.red_vessel,
	black  : imageUrl.black_vessel,
};

const TOOLTIP_MAPPING = {
	vessel_name   : 'Name',
	latitude      : 'Latitude',
	longitude     : 'Longitude',
	lastUpdatedAt : 'Last Update',
};

function Pointer(props) {
	const {
		latitude: lat = '',
		longitude: lng = '',
		lastUpdatedAt = '',
		cog: direction,
		arrow = 'black',
	} = props;
	const icon = new L.DivIcon({
		html: ReactDOMServer.renderToString(
			<img
				src={ICON_MAPPING[arrow]}
				style={{
					transform : `rotate(${direction}deg)`,
					height    : '16px',
					width     : '8px',
				}}
				alt="ship"
			/>,
		),
		iconSize   : [24, 24],
		iconAnchor : [10, 12],
		className  : 'divIcon',
	});

	const getData = (key) => {
		if (key === 'lastUpdatedAt') {
			return formatDate({
				date       : lastUpdatedAt,
				dateFormat : DATE_FORMAT,
				timeFormat : TIME_FORMAT,
			});
		}
		return props?.[key];
	};
	return (
		<FeatureGroup key={lat}>
			<Marker position={[lat, lng]} icon={icon}>
				<Tooltip offset={[0, -10]}>
					<div className={styles.container}>
						{Object.keys(TOOLTIP_MAPPING).map((info) => (
							<div key={info}>
								<span className={styles.heading}>{TOOLTIP_MAPPING[info]}</span>
								<span className={styles.value}>{getData(info)}</span>
							</div>
						))}
					</div>
				</Tooltip>
			</Marker>
		</FeatureGroup>
	);
}

export default Pointer;
