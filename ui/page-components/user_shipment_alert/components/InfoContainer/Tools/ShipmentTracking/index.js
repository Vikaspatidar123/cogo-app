import { Input, Button, Tabs, TabPanel, Select } from '@cogoport/components';
import { IcMTracking, IcAInternational, IcAShipAmber } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import useCreateTracker from '@/ui/page-components/new-dashboard/hooks/useCreateTracker';

const CogoMaps = dynamic(() => import('../../../../../../commons/components/CogoMaps'), { ssr: false });

function ShipmentTracking() {
	const {
		formHook, trackingType, setTrackingType, controls,
		onSubmitHandler,
	} = useCreateTracker();
	const { control, handleSubmit, formState: { errors } } = formHook;

	return (
		<div className={styles.container}>
			<div className={styles.text}>Track your shipment!</div>
			<CogoMaps height="300px" />
			<div className={styles.input_box}>
				<div>
					<Tabs
						activeTab={trackingType}
						themeType="tertiary"
						onChange={setTrackingType}
					>
						<TabPanel
							name="ocean"
							title="Ocean"
							icon={<IcAShipAmber width={15} height={15} />}
						/>
						<TabPanel
							name="air"
							title="Air"
							icon={<IcAInternational width={15} height={15} />}
						/>
					</Tabs>
					{/* <Input className={styles.input} size="sm" placeholder="Search by Ctr No/AWB No/BL No" />
					<Select className={styles.input} size="sm" placeholder="Select shipping line" /> */}
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
					<div className={styles.button}>
						<Button
							themeType="secondary"
							onClick={handleSubmit(onSubmitHandler)}
						>
							Track Now
							{' '}
							<IcMTracking />
						</Button>
					</div>
				</div>

			</div>

		</div>
	);
}

export default ShipmentTracking;
