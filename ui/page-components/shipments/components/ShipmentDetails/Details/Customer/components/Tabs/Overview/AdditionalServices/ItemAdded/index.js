// import CancelAdditionalService from '@cogo/bookings/AdditionalServices/components/CancelAdditionalService';
// import { Popover, Button } from '@cogoport/front/components/admin';
// import { startCase } from '@cogoport/front/utils';
// import { IcMOverflowDot } from '@cogoport/icons-react';
import { Popover, Button } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

// import {
// 	Container,
// 	Heading,
// 	Tag,
// 	Row,
// 	NameType,
// 	SubContainer,
// 	ButtonText,
// } from './styles';
import styles from './styles.module.css';

const serviceCancelAllowed = [
	'requested_by_importer_exporter',
	'requested_for_importer_exporter',
	'quoted_by_service_provider',
	'amendment_requested_by_importer_exporter',
];

function ItemAdded({ item, actionButton, status, refetch = () => {} }) {
	const [show, setShow] = useState(false);
	const [showCancel, setShowCancel] = useState(false);

	const showMoreInfo = !!serviceCancelAllowed.includes(item?.state);

	return (
		<div className={`${styles.additional_service_item_container} ${styles.container}`}>
			<div className={styles.sub_container}>
				<div className={`${styles.row} ${styles.additional_service_item_row}`}>
					<div className={styles.name_type}>
						<div className={styles.heading}>
							{startCase(item.name)}
						</div>
					</div>

					<Button
						className="secondary text xl"
						style={{ marginLeft: 24, fontWeight: 'normal', fontSize: '24px' }}
					>
						{showMoreInfo ? (
							<Popover
								show={show}
								theme="light"
								interactive
								render={(
									<div
										role="presentation"
										className={styles.button_text}
										onClick={() => {
											setShow(false);
											setShowCancel(true);
										}}
									>
										Cancel
									</div>
								)}
							>
								<div>
									<IcMOverflowDot
										style={{ width: '10px', height: '10px', cursor: 'pointer' }}
										onClick={() => setShow(!show)}
									/>
								</div>
							</Popover>
						) : null}
					</Button>
				</div>

				<div className={`${styles.row} ${styles.status}`}>
					<div className={`${styles.tag} ${styles.status.status}`}>{status.statusName}</div>
					{actionButton}
				</div>

				{/* {showCancel ? (
					<CancelAdditionalService
						id={item?.id}
						showCancel={showCancel}
						setShowCancel={setShowCancel}
						setShow={setShow}
						refetch={refetch}
					/>
				) : null} */}
			</div>
		</div>
	);
}

export default ItemAdded;
