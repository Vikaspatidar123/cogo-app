import { Input, Button } from '@cogoport/components';
import { IcMTracking, IcMAppSearch } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';

import styles from './styles.module.css';

import { InputController, AsyncSelectController, useForm } from '@/packages/forms';
import useCreateTracker from '@/ui/page-components/new-dashboard/hooks/useCreateTracker';
import useGetMapRoute from '@/ui/page-components/new-dashboard/hooks/useGetMapRoute';
import useTrackShipment from '@/ui/page-components/new-dashboard/hooks/useTrackShipment';

const CogoMaps = dynamic(() => import('../../../../common/MapContainer/MapsComp'), { ssr: false });
const shipment_rules = {
	required: true,
	pattern: {
		value: '/^[A-Z]{4}\d{7}$/',
		message: 'Invalid AirLine Number',
	},

};
const rules = { required: true };

function TrackShipment() {
	const { data } = useTrackShipment();
	const { list } = data || {};
	const { allRoute } = useGetMapRoute({ trackingInfo: list, type: 'ocean' });
	const { formHook, onSubmitHandler } = useCreateTracker();
	const { control, handleSubmit, formState: { errors } } = formHook;
	return (
		<div className={styles.main_container}>
			<CogoMaps height="270px" allPoints={allRoute} type="ocean" />
			<div className={styles.input_box}>
				<div>
					<div className={styles.text}>Track your shipment!</div>
					<InputController
						name="shipmentNumber"
						size="sm"
						className={styles.input_container}
						placeholder="Search here"
						suffix={<IcMAppSearch style={{ marginRight: '10px' }} />}
						control={control}
						rules={shipment_rules}
					/>
					<p className={styles.errors}>{errors?.shipmentNumber?.message || errors?.shipmentNumber?.type}</p>
					<AsyncSelectController
						name="shippingLine"
						size="sm"
						className={styles.input_container}
						placeholder="Select shipping line"
						control={control}
						asyncKey="shippingline_list"
						initialCall
						rules={rules}
					/>
					<p className={styles.errors}>{errors?.shippingLine?.message || errors?.shippingLine?.type}</p>
					<div className={styles.button_container}>
						<Button
							size="md"
							onClick={handleSubmit(onSubmitHandler)}
							themeType="accent"
						>
							Track Now
							<IcMTracking />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default TrackShipment;
