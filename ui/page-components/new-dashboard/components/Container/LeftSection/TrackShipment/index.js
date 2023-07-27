import { Button, Tabs, TabPanel } from '@cogoport/components';
import { IcMTracking } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import useCreateTracker from '@/ui/page-components/new-dashboard/hooks/useCreateTracker';
import useGetMapRoute from '@/ui/page-components/new-dashboard/hooks/useGetMapRoute';
import useTrackShipment from '@/ui/page-components/new-dashboard/hooks/useTrackShipment';

const CogoMaps = dynamic(() => import('../../../../common/MapContainer/MapsComp'), { ssr: false });

function TrackShipment() {
	const { t } = useTranslation(['dashboard']);

	const { data } = useTrackShipment();
	const { list } = data || {};
	const {
		formHook, trackingType, setTrackingType, controls,
		onSubmitHandler,
	} = useCreateTracker();
	const { allRoute } = useGetMapRoute({ trackingInfo: list, type: trackingType });

	const { control, handleSubmit, formState: { errors } } = formHook;

	return (
		<div className={styles.main_container}>
			<CogoMaps height="270px" allPoints={allRoute} type={trackingType} />

			<div className={styles.input_box}>
				<div>
					<div className={styles.text}>{t('dashboard:track_shipment_text1')}</div>
					<div className={styles.tab_box}>
						<Tabs
							activeTab={trackingType}
							themeType="tertiary"
							onChange={setTrackingType}
						>
							<TabPanel name="ocean" title="Ocean" />
							<TabPanel name="air" title="Air" />
						</Tabs>
					</div>

					{controls.map((controlItem) => {
						const { name, type } = controlItem;
						const Element = getField(type);

						return (
							<div key={name} className={styles.box}>
								<Element {...controlItem} control={control} className={styles.input_container} />
								<p className={styles.errors}>{errors?.[name]?.message || errors?.[name]?.type}</p>
							</div>
						);
					})}

					<div className={styles.button_container}>
						<Button
							size="md"
							onClick={handleSubmit(onSubmitHandler)}
							themeType="accent"
							type="button"
						>
							{t('dashboard:track_now_button_text')}
							<IcMTracking />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default TrackShipment;
