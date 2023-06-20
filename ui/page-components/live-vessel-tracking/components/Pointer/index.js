import { L, Marker, FeatureGroup, Tooltip } from '@cogoport/maps';
import ReactDOMServer from 'react-dom/server';

import {
	ICON_ANCHOR_X, ICON_ANCHOR_Y, ICON_SIZE, TOOLTIP_MAPPING,
	TOOLTIP_OFFSET_X, TOOLTIP_OFFSET_Y, TIME_FORMAT, DATE_FORMAT,
} from '../../constant/pointer';
import formatDate from '../../utils/formatDate';
import { imageUrl } from '../../utils/imageUrl';

import styles from './styles.module.css';

import { Image } from '@/packages/next';

const ICON_MAPPING = {
	yellow : imageUrl.yellow_vessel,
	red    : imageUrl.red_vessel,
	black  : imageUrl.black_vessel,
};

const getData = ({ info, props }) => {
	if (info === 'last_updated_at') {
		return formatDate({
			date       : props?.last_updated_at,
			dateFormat : DATE_FORMAT,
			timeFormat : TIME_FORMAT,
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
