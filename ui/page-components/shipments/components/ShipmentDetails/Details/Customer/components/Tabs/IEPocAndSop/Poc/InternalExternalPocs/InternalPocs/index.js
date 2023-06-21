import { Button } from '@cogoport/components';
import { useState } from 'react';

import InternalStakeholder from './InternalStakeholder';
import EditStakeHolder from './InternalStakeholder/Stakeholder/EditStakeHolder';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import getGeoConstants from '@/ui/commons/constants/geo';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const geo = getGeoConstants();

function InternalPocs({
	stakeholderListRefetch = () => {},
	internalStakeHoldersList = [],
	internalStakeHoldersLoading: loading,
	shipment_data = {},
}) {
	const { partner } = useSelector(({ profile }) => ({
		partner: (profile || {}).partner || {},
	}));

	const canEditStakeholders = partner?.user_role_ids?.some((ele) => [
		geo.uuid.super_admin_id,
		geo.uuid.tech_support_role_id,
		geo.uuid.prod_process_owner,
		geo.uuid.admin_id,
		geo.uuid.prod_so_2_manager,
		geo.uuid.so_2_manager_ams_desk,
		geo.uuid.so_1_manager,
		geo.uuid.tech_super_admin_id,
		GLOBAL_CONSTANTS.vietnam_admin_id,
	].includes(ele));

	const canAddStakeholders = partner?.user_role_ids?.some((ele) => [
		geo.uuid.super_admin_id,
		geo.uuid.admin_id,
		geo.uuid.tech_super_admin_id,
		GLOBAL_CONSTANTS.vietnam_admin_id,
	].includes(ele));

	const stakeholdersList = {};
	internalStakeHoldersList?.forEach((item) => {
		const key = `${item?.stakeholder_type}:${item?.service_type}:${item?.trade_type}`;
		stakeholdersList[key] = stakeholdersList[key] || item;
	});

	const [editStakeHolder, setEditStakeHolder] = useState({
		modal_check : false,
		data        : {},
	});

	return (
		<div className={styles.container}>
			<div className={styles.company_details}>
				<div className={styles.details}>Internal: Cogoport</div>
				{canAddStakeholders ? (
					<Button
						className="primary sm"
						onClick={() => setEditStakeHolder({ modal_check: true, data: {} })}
					>
						+ Add POC
					</Button>
				) : null}

				{editStakeHolder?.modal_check ? (
					<EditStakeHolder
						stakeholderListRefetch={stakeholderListRefetch}
						editStakeHolder={editStakeHolder}
						setEditStakeHolder={setEditStakeHolder}
						handleClose={() => setEditStakeHolder({ modal_check: false, data: {} })}
					/>
				) : null}
			</div>

			{!loading ? (
				<div className={styles.poc_list}>
					{(internalStakeHoldersList || [])
						.map((stakeholders) => Object.keys(stakeholders)?.map((objectKey) => (
							<InternalStakeholder
								objectKey={objectKey}
								item={stakeholders[objectKey]}
								stakeholderListRefetch={stakeholderListRefetch}
								canEditStakeholders={canEditStakeholders}
								shipment_data={shipment_data}
							/>
						)))}
				</div>
			) : null}
		</div>
	);
}

export default InternalPocs;
