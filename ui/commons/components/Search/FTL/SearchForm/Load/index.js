import { Popover, Tabs, TabPanel } from '@cogoport/components';
import React, { useState, forwardRef, useEffect } from 'react';

import AddCargo from './AddCargo';
import AddTruck from './AddTrucks';
import ShowCargoInfo from './ShowCargoInfo';
import ShowTruckInfo from './ShowTruckInfo';
import styles from './styles.module.css';

import getEntityOptions from '@/ui/commons/utils/getEntityOptions';

const TabContent = forwardRef(
	(
		{
			activeTab,
			setActiveTab,
			loadData,
			setLoadData,
			location,
			setShowPopover,
		},
		ref,
	) => {
		const handleTabChange = (tab) => {
			setActiveTab(tab);
		};

		return (
			<Tabs
				activeTab={activeTab}
				onChange={handleTabChange}
			>
				<TabPanel
					name="truck"
					title="Add Truck"
					id="Add Truck"
					className="horizontal two"
					setLoadData={setLoadData}
				>
					<AddTruck
						setLoadData={setLoadData}
						ref={ref}
						loadData={loadData}
						setShowPopover={setShowPopover}
						location={location}
					/>
				</TabPanel>

				<TabPanel
					name="cargo"
					title="Add Cargo Details"
					id="Add Cargo Details"
					className="horizontal two"
				>
					<AddCargo
						setLoadData={setLoadData}
						setShowPopover={setShowPopover}
						ref={ref}
						loadData={loadData}
					/>
				</TabPanel>
			</Tabs>
		);
	},
);

function Load(props, ref) {
	const { searchData = {}, error, typeOfJourney = '', location } = props;
	const { origin = {} } = location;
	const { country_id = '' } = origin;

	const geo = getEntityOptions({ country_id });

	const { detail = {} } = searchData || {};

	const { service_details = {} } = detail || {};

	const [showPopover, setShowPopover] = useState(false);

	const [loadData, setLoadData] = useState(() => ({
		active_tab    : 'truck',
		truck_details : [
			{
				trucks_count : 1,
				truck_type   : '',
			},
		],
	}));

	const [activeTab, setActiveTab] = useState();

	useEffect(() => {
		setActiveTab(loadData.active_tab === 'truck' ? 'truck' : 'cargo');
	}, [loadData]);

	const truckDetails = (Object.values(service_details) || [])
		.filter((element) => element.service_type === 'ftl_freight')
		.map((truck_data) => ({
			truck_type   : truck_data.truck_type,
			trucks_count : truck_data.trucks_count,
		}));

	const { packages, volume } = (Object.values(service_details) || [])?.[0] || {};

	useEffect(() => {
		setLoadData((prev) => ({
			...prev,
			truck_details: [
				{
					trucks_count : 1,
					truck_type   : geo.options.country_truck_type,
				},
			],
		}));
	}, [location]);

	useEffect(() => {
		if (Object.keys(detail).length > 0) {
			if (detail.load_selection_type === 'truck') {
				setLoadData({
					active_tab    : 'truck',
					truck_details : truckDetails,
				});
			} else if (detail.load_selection_type === 'cargo_gross') {
				const grossPrefill = (packages || []).map((package_data) => ({
					...package_data,
					volume,
				}))[0];

				setLoadData({
					gross_details  : grossPrefill,
					active_tab     : 'cargo',
					sub_active_tab : 'gross',
				});
			} else if (detail.load_selection_type === 'cargo_per_package') {
				setLoadData({
					per_package_details : packages,
					active_tab          : 'cargo',
					sub_active_tab      : 'per_package',
				});
			}
		}
	}, [searchData]);

	const content = () => (
		<div className={styles.main}>
			<TabContent
				ref={ref}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				loadData={loadData}
				setLoadData={setLoadData}
				location={location}
				setShowPopover={setShowPopover}
			/>
		</div>
	);

	const renderPopoverContent = () => (loadData.active_tab === 'cargo' ? (
		<ShowCargoInfo
			loadData={loadData}
			setShowPopover={setShowPopover}
			showPopover={showPopover}
		/>
	) : (
		<ShowTruckInfo
			loadData={loadData}
			setShowPopover={setShowPopover}
			showPopover={showPopover}
		/>
	));
	return (
		<div className={styles.container}>
			<div className={styles.label}>Load</div>

			<Popover
				placement="bottom"
				animation="shift-away"
				content={content()}
				onClickOutside={() => setShowPopover(false)}
				interactive
				visible={showPopover && typeOfJourney !== 'round'}
			>
				<div
					style={{
						pointerEvents: typeOfJourney === 'round' ? 'none' : null,
					}}
				>
					{renderPopoverContent()}
					{error ? <div className={styles.error_msg}>Loads are required</div> : null}
				</div>
			</Popover>
		</div>
	);
}

export default forwardRef(Load);
