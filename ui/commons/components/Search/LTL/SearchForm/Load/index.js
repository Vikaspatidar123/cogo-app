import React, { useState, forwardRef, useEffect } from 'react';
import { Popover } from '@cogoport/front/components/admin';

import { Container, Label, Main, ErrorMsg } from './styles';
import AddCargo from './AddCargo';

import ShowCargoInfo from './ShowCargoInfo';

const Load = (props, ref) => {
	const { searchData = {}, error } = props;
	const { detail = {} } = searchData || {};
	const { service_details = {} } = detail || {};

	const [showPopover, setShowPopover] = useState(false);

	const [loadData, setLoadData] = useState(() => {
		return {
			sub_active_tab: 'per_package',

			per_package_details: {
				packages: [
					{
						packing_type: 'pallet',
						packages_count: 1,
						package_weight: 1,
						dimensions: {
							length: 1,
							width: 1,
							height: 1,
						},
						handling_type: 'stackable',
					},
				],
			},
		};
	});

	const { packages, volume } =
		(Object.values(service_details) || [])?.[0] || {};

	useEffect(() => {
		if (Object.keys(detail).length > 0) {
			if (detail?.load_selection_type === 'cargo_gross') {
				const grossPrefill = (packages || []).map((package_data) => ({
					...package_data,
					volume,
				}))[0];

				setLoadData({
					gross_details: grossPrefill,
					sub_active_tab: 'gross',
				});
			} else if (detail?.load_selection_type === 'cargo_per_package') {
				setLoadData({
					per_package_details: packages,
					sub_active_tab: 'per_package',
				});
			}
		}
	}, [searchData]);

	const content = () => {
		return (
			<Main>
				<AddCargo
					setLoadData={setLoadData}
					setShowPopover={setShowPopover}
					ref={ref}
					loadData={loadData}
				/>
			</Main>
		);
	};

	const renderPopoverContent = () => {
		return (
			<ShowCargoInfo
				loadData={loadData}
				setShowPopover={setShowPopover}
				showPopover={showPopover}
			/>
		);
	};

	return (
		<Container>
			<Label>Load</Label>

			<Popover
				animation="shift-away"
				theme="light"
				content={content()}
				onClickOutside={() => setShowPopover(false)}
				interactive
				visible={showPopover}
			>
				<div>
					{renderPopoverContent()}
					{error ? <ErrorMsg>Loads are required</ErrorMsg> : null}
				</div>
			</Popover>
		</Container>
	);
};

export default forwardRef(Load);
