import { Button, Tabs, TabPanel } from '@cogoport/components';
import { IcMTracking, IcMAppSearch, IcAAirTracking, IcAOceanTracking } from '@cogoport/icons-react';
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
	const { allRoute } = useGetMapRoute({ trackingInfo: list, type: 'ocean' });
	const {
		loading, formHook, trackingType, setTrackingType, controls,
		onSubmitHandler,
	} = useCreateTracker();

	const { control, handleSubmit, formState: { errors } } = formHook;

	return (
		<div className={styles.main_container}>
			<CogoMaps height="270px" allPoints={allRoute} type="ocean" />
			<div className={styles.input_box}>
				<div>
					<div className={styles.text}>{t('dashboard:track_shipment_text1')}</div>
					<div className={styles.tab_box}>
						<Tabs
							activeTab={trackingType}
							themeType="tertiary"
							onChange={setTrackingType}
						>
							<TabPanel name="ocean" title="ocean" />
							<TabPanel name="air" title="air" />
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
					{/* <InputController
						name="shipmentNumber"
						size="sm"
						className={styles.input_container}
						placeholder={t('dashboard:shipment_placeholder')}
						suffix={<IcMAppSearch style={{ marginRight: '10px' }} />}
						control={control}
						rules={shipment_rules}
					/>
					<p className={styles.errors}>{errors?.shipmentNumber?.message || errors?.shipmentNumber?.type}</p>
					<AsyncSelectController
						name="shippingLine"
						size="sm"
						className={styles.input_container}
						placeholder={t('dashboard:shippingline_placeholder')}
						control={control}
						asyncKey="shippingline_list"
						initialCall
						rules={rules}
					/> */}

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
