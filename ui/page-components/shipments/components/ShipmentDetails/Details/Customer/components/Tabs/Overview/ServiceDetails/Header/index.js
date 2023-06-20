import { Popover, Modal } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useState } from 'react';

import Details from '../Details';
import Status from '../Status';

import styles from './styles.module.css';

import getConfigs from '@/ui/page-components/shipments/components/ShipmentDetails/configurations/Supplier/get-configs';

function Header({
	serviceData = {},
	service_type = '',
	state = '',
	heading = '',
	similarServices = {},
}) {
	const [show, setShow] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	const service_items_key = getConfigs(service_type).details || {};

	const allServices = Object.keys(similarServices).length
		? similarServices
		: {
			services: [{ ...serviceData }],
		};

	const content = (
		<div className={styles.dialog_box}>
			<div
				role="presentation"
				className={styles.text}
				onClick={() => {
					setShowPopover(false);
					setShow(true);
				}}
			>
				View Details
			</div>
		</div>
	);

	return (
		<div className={`${styles.state} ${styles.container}`}>
			<div className={styles.header_wrapper}>
				<div className={`${styles.state} ${styles.heading}`}>{heading}</div>

				<Popover
					theme="light"
					render={content}
					className="primary_md"
					placement="bottom"
					interactive
					show={showPopover}
					onClickOutside={() => setShowPopover(false)}
				>
					<div
						role="presentation"
						className={styles.edit_cancel}
						onClick={() => setShowPopover(true)}
					>
						<IcMOverflowDot />
					</div>
				</Popover>
			</div>

			<Status state={state} />

			{show ? (
				<Modal
					width={450}
					show={show}
					onClose={() => setShow(false)}
					onOuterClick={() => setShow(false)}
				>
					{allServices?.services?.map((service) => (
						<Details
							heading={heading}
							state={state}
							service_items_key={service_items_key}
							service_data={service}
						/>
					))}
				</Modal>
			) : null}
		</div>
	);
}

export default Header;
