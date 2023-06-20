import { L, Marker, FeatureGroup, Tooltip } from '@cogoport/maps';
import ReactDOMServer from 'react-dom/server';

import {
	ICON_ANCHOR_X, ICON_ANCHOR_Y, ICON_SIZE, TOOLTIP_MAPPING,
	TOOLTIP_OFFSET_X, TOOLTIP_OFFSET_Y,
} from '../../constant/pointer';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import getGeoConstants from '@/ui/commons/constants/geo';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const geo = getGeoConstants();

const ICON_MAPPING = {
	yellow : GLOBAL_CONSTANTS.image_url.yellow_vessel,
	red    : GLOBAL_CONSTANTS.image_url.red_vessel,
	black  : GLOBAL_CONSTANTS.image_url.black_vessel,
};

const getData = ({ info, props }) => {
	if (info === 'last_updated_at') {
		return formatDate({
			date       : props?.last_updated_at,
			dateFormat : geo.formats.date.default,
			timeFormat : geo.formats.time['12hrs'],
			formatType : 'dateTime',
		});
	}
	return props?.[info];
};

function Pointer(props) {
	const {
		latitude: lat = '',
		longitude: lng = '',
		cog: direction,
		arrow = 'black',
	} = props;
	const icon = new L.DivIcon({
		html: ReactDOMServer.renderToString(
			<Image
				src={ICON_MAPPING[arrow]}
				width={8}
				height={16}
				style={{
					transform: `rotate(${direction}deg)`,
				}}
				alt="ship"
			/>,
		),
		iconSize   : [ICON_SIZE, ICON_SIZE],
		iconAnchor : [ICON_ANCHOR_X, ICON_ANCHOR_Y],
		className  : styles.divIcon,
	});

	return (
		<FeatureGroup key={lat}>
			<Marker position={[lat, lng]} icon={icon}>
				<Tooltip offset={[TOOLTIP_OFFSET_X, TOOLTIP_OFFSET_Y]}>
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
