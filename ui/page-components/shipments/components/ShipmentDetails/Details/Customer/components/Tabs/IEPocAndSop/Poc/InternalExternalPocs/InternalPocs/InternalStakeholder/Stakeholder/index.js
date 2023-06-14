import { Tooltip } from '@cogoport/components';
import { IcMCall, IcMEdit, IcMEmail } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useContext } from 'react';

import EditStakeHolder from './EditStakeHolder';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import getGeoConstants from '@/ui/commons/constants/geo';
import { ShipmentDetailContext } from '@/ui/page-components/shipments/components/ShipmentDetails/common/Context';

const geo = getGeoConstants();

const displayStakeholders = {
	booking_agent : 'KAM',
	service_ops1  : 'Booking Desk',
	service_ops2  : 'Document Desk',
};

function Stakeholder({
	data = {},
	stakeholderListRefetch = () => {},
	canEditStakeholders,
	serviceName = '',
}) {
	const [{ shipment_data }] = useContext(ShipmentDetailContext);

	const { partner } = useSelector(({ profile }) => ({
		partner: (profile || {}).partner || {},
	}));

	const [editStakeHolder, setEditStakeHolder] = useState({
		modal_check : false,
		data        : {},
	});

	const editNotAllowed = ['credit_controller', 'sales_agent', 'user'].includes(
		data?.stakeholder_type,
	);

	const stakeholderType =		displayStakeholders[data?.stakeholder_type] || data?.stakeholder_type;

	if (data?.stakeholder_type === 'ckam') {
		return null;
	}

	let stakeholder = data?.user?.name;
	if (stakeholderType === 'KAM' && !isEmpty(shipment_data?.entity_manager)) {
		stakeholder = shipment_data?.entity_manager?.name;
	}

	let canEditStakeholder = !editNotAllowed && canEditStakeholders;
	if (
		['KAM', 'entity_manager'].includes(stakeholderType)
		&& partner?.user_role_ids?.includes(geo.uuid.cp_kam_owner)
	) {
		canEditStakeholder = true;
	} else if (
		stakeholderType === 'KAM'
		&& partner?.user_role_ids?.some((ele) => [geo.uuid.ie_owner_sme_demand, geo.uuid.prod_kam_es_manager].includes(
			ele,
		))
	) {
		canEditStakeholder = true;
	}

	const showStakeholder = true;

	return showStakeholder ? (
		<div>
			<div className={styles.poc_infocontainer}>
				<div>
					<span className="gray">
						{startCase(stakeholderType)}
						{' '}
						:
						{' '}
					</span>
					{stakeholder}
					{data?.transport_mode
						? ` (${startCase(data?.transport_mode)})`
						: null}
				</div>

				<div className={styles.icons}>
					{canEditStakeholder ? (
						<IcMEdit
							onClick={() => setEditStakeHolder({ modal_check: true, value: data })}
							size={2.5}
							style={{ cursor: 'pointer' }}
						/>
					) : (
						<div style={{ width: '14px' }} />
					)}

					{data?.user?.mobile_number ? (
						<Tooltip
							theme="light"
							interactive
							content={(
								<div style={{ fontSize: '10px' }}>
									{`${data?.user?.mobile_country_code}- ${data?.user?.mobile_number}`}
								</div>
							)}
							animation="shift-away"
							placement="bottom"
						>
							<div>
								<IcMCall style={{ cursor: 'pointer' }} />
							</div>
						</Tooltip>
					) : (
						<div style={{ width: '14px' }} />
					)}

					{data?.user?.email ? (
						<Tooltip
							theme="light"
							interactive
							content={
								<div style={{ fontSize: '10px' }}>{data?.user?.email}</div>
							}
							animation="shift-away"
							placement="bottom"
						>
							<div>
								<IcMEmail style={{ cursor: 'pointer' }} />
							</div>
						</Tooltip>
					) : (
						<div style={{ width: '14px' }} />
					)}
				</div>
			</div>

			{editStakeHolder?.modal_check ? (
				<EditStakeHolder
					stakeholderListRefetch={stakeholderListRefetch}
					editStakeHolder={editStakeHolder}
					setEditStakeHolder={setEditStakeHolder}
					handleClose={() => setEditStakeHolder(false)}
					displayServiceType={serviceName}
				/>
			) : null}
		</div>
	) : null;
}

export default Stakeholder;
