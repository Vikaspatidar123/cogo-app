import { Toast, Button } from '@cogoport/components';
import { IcCPin, IcMPin } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useState, useRef } from 'react';
import { v1 as uuid } from 'uuid';

import useAddSopData from '../../../../../hooks/useAddSopData';
import useUpdateShipmentOperatingProcedure from '../../../../../hooks/useUpdateShipmentOperatingProcedure';

import ChildBlocks from './ChildBlocks';
import ShowConditions from './ShowConditions';
import styles from './styles.module.css';

import updateSopPayload from '@/ui/page-components/shipments/helpers/update-sop-details-payload';

function SopCard({
	details,
	reload,
	setReload = () => {},
	trade_partners_details,
}) {
	const [showActions, setShowActions] = useState(false);
	const sopData = details;
	const { instructions } = details || [];

	const initialBlocks = [];

	(instructions || []).forEach((obj, index) => {
		const instructionObject = {
			id       : `${index}_${uuid()}`,
			mainData : JSON.parse(JSON.stringify(obj)),
		};
		initialBlocks.push(instructionObject);
	});

	const [blocks, setBlocks] = useState([...initialBlocks]);
	const originalData = initialBlocks;

	const handleAddBlocks = () => {
		const newBlock = { id: `${blocks.length}_${uuid()}`, mainData: {} };
		setBlocks([...blocks, newBlock]);
	};

	const sopCardRef = useRef({});

	const { sopID, trigger, loading } = useAddSopData({
		formValues   : blocks,
		bookingRadio : false,
		api          : 'update',
		sopID        : details?.id,
		originalData,
	});

	const { upatePinnedStatus } = useUpdateShipmentOperatingProcedure({
		sopData,
		reload,
		setReload,
	});

	const cancel = () => {
		setReload(!reload);
	};
	const update = async () => {
		const { finalPayload, updatable } = await updateSopPayload({
			sopCardRef,
			blocks,
			originalData,
			sopID,
		});
		try {
			if (finalPayload.sop_instructions.length) {
				if (updatable) {
					const res = await trigger({ data: finalPayload });
					if (!res.hasError) {
						Toast.success('Succesfully updated');
						setReload(!reload);
					} else {
						Toast.error('Something went wrong');
					}
				} else {
					Toast.info('Instructions or Attachment atlest one is required');
				}
			} else {
				Toast.info('Nothing To Update..');
			}
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	return (
		<div className={styles.sop_container}>
			<div className={styles.haeder_container}>
				<div className={styles.condition_for}>
					<div style={{ display: 'flex' }}>
						{sopData?.shipment_id ? (
							<>For This Shipment</>
						) : (
							<>For Booking Party</>
						)}

						<div className={styles.conditions}>
							{!sopData?.shipment_id ? (
								<ShowConditions
									sopData={sopData}
									trade_partners_details={trade_partners_details}
								/>
							) : null}
						</div>
					</div>

					<div className={styles.edit_details}>
						Last Edited:
						{format(sopData?.updated_at, 'dd MMM yyyy')}
					</div>
				</div>

				<div
					role="presentation"
					className={styles.icon_container}
					onClick={upatePinnedStatus}
				>
					{sopData?.is_pinned ? <IcCPin fill="yellow" /> : <IcMPin />}
				</div>
			</div>

			<div className={styles.line} />

			<div className={styles.heading}>{sopData?.heading}</div>
			<div className={styles.heading_edit_detail}>
				Last Edited:
				{format(sopData?.updated_at, 'dd MMM yyyy')}
			</div>

			<span
				role="presentation"
				onMouseDown={() => setShowActions(true)}
			>
				<ol>
					{(blocks || []).map((obj) => (
						<ChildBlocks
							id={obj.id}
							mainData={obj?.mainData}
							sopData={sopData}
							blocks={blocks}
							setBlocks={setBlocks}
							ref={(r) => {
								sopCardRef.current[`${obj.id}`] = r;
							}}
						/>
					))}
				</ol>
			</span>

			{showActions ? (
				<div className={styles.action_buttons}>
					<Button
						disabled={loading}
						style={{ color: '#393F70', background: 'none' }}
						onClick={() => {
							handleAddBlocks();
						}}
					>
						+ Add More
					</Button>

					<div className={styles.button_wrapper}>
						<Button themeType="secondary" onClick={cancel}>
							Close
						</Button>
						<Button onClick={update} disabled={loading}>
							Update
						</Button>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default SopCard;
