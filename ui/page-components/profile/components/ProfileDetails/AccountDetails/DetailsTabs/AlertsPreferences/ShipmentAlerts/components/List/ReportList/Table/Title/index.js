import { Select, Popover } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { isEmpty, upperCase } from '@cogoport/utils';
import { useState } from 'react';

import useEditColsPopOver from '../../../../../hooks/useEditColsPopOver';

import RenderPopOver from './RenderPopOver';
import styles from './styles.module.css';

function Title({ serviceName, options, props }) {
	const { isEdit } = props || {};
	const {
		show = false,
		setShow = () => {},
		insideList = [],
		onSelect = () => {},
		setInsideList,
	} = useEditColsPopOver({
		colsList: options,
		props,
		serviceName,
	});
	const selectedShipmentColumns = (insideList || []).filter(
		(item) => item?.isChecked,
	).length;
	return (
		<div className={styles.container}>
			<div>
				{upperCase(serviceName)}
				{' '}
				Shipments
			</div>
			{!isEdit ? (
				<div>
					20 of 20 Data Points Visible
				</div>
			)
				: (
					<div className={styles.container}>
						<div className={styles.edit}>Edit Columns</div>
						<Popover
							visible={show}
							placement="bottom-end"
							interactive
							onClickOutside={() => setShow(false)}
							content={(
								<RenderPopOver
									insideList={insideList}
									onSelect={onSelect}
									setShow={setShow}
									setInsideList={setInsideList}
									props={props}
									serviceName={serviceName}
								/>
							)}
						>
							<div
								role="presentation"
								className={`${styles.select}`}
								onClick={() => setShow(!show)}
							>
								{!selectedShipmentColumns > 0 ? <div>Selected Columns</div>
									: (
										<div className={styles.selected}>
											{selectedShipmentColumns}
											{' '}
											Selected
										</div>
									)}
								<IcMArrowRotateDown />
							</div>
						</Popover>
						{/* <Select
							size="sm"
							style={{ width: '250px' }}
							options={options}
						/> */}
					</div>
				)}
		</div>
	);
}

export default Title;
