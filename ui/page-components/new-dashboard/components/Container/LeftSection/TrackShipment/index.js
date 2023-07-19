import { Input, Button, Select } from '@cogoport/components';
import { IcMTracking } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';

import styles from './styles.module.css';

import useGetMapRoute from '@/ui/page-components/new-dashboard/hooks/useGetMapRoute';
import useTrackShipment from '@/ui/page-components/new-dashboard/hooks/useTrackShipment';

const MapComp = dynamic(() => import('@/ui/commons/components/CogoMaps'), {
	ssr: false,
});
function TrackShipment() {
	const { data } = useTrackShipment();
	const { list } = data || {};
	const { loading, allRoute } = useGetMapRoute({ trackingInfo: list, type: 'ocean' });
	console.log(allRoute, 'allRoute');
	return (
		<div className={styles.main_container}>
			<MapComp height="270px" plotPoints={allRoute} type="ocean" />
			{/* <div className={styles.line} /> */}
			<div className={styles.input_box}>
				<div>
					<div className={styles.text}>Track your shipment!</div>

					<Input size="sm" className={styles.input_container} placeholder="Search here" />
					<Select size="sm" className={styles.input_container} placeholder="Select shipping line" />
					<Button size="md" themeType="secondary" className={styles.button_container}>
						Track Now
						<IcMTracking />
					</Button>
				</div>
			</div>
		</div>
	);
}
export default TrackShipment;
