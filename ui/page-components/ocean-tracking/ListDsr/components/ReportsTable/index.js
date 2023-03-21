// import { Flex } from '@cogoport/front/components';
// import { formatDateToString } from '@cogoport/front/date';
// import React from 'react';
import { Table, Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import ReportStatus from '../ReportStatus';

// import IconEdit from '../../../../common/icons/edit.svg';
// import { Table, Button } from '../../../../common/ui';
// import ReportStatus from '../report-status';

// import { Card } from './styles';
import styles from './styles.module.css';

function ReportsTable({ loading, dsrList, handleDsrModal, setDsrs }) {
	console.log(dsrList, 'dsrList');

	return (
		<div className={styles.card}>
			<div className={styles.item}>
				<div className={styles.list_item}>
					NAME
				</div>
				<div className={styles.list_item}>
					SCHEDULE
				</div>
				<div className={styles.list_item}>
					SHIPMENTS
				</div>
				<div className={styles.list_item}>
					LAST SENT
				</div>
				<div className={styles.list_item}>
					STATUS
				</div>
			</div>
			{dsrList?.map((list) => (
				<div className={styles.item}>
					<div className={styles.list_item}>
						{list?.poc_details?.name}
					</div>
					<div className={styles.list_item}>
						{list?.schedule}
						<IcMEdit onClick={() => handleDsrModal({ type: 'update', step: 2, id: list?.id })} />
					</div>
					<div className={styles.list_item}>
						{list?.shipments}
						<IcMEdit onClick={() => handleDsrModal({ type: 'update', step: 1, id: list.id })} />
					</div>
					<div className={styles.list_item}>
						{list?.report_update
							? format(list.report_update, 'dd LLL yyyy')
							: ''}
					</div>
					<div className={styles.list_item}>
						{list?.status}
						<ReportStatus record={list} dsrId={list?.id} setDsrs={setDsrs} />
					</div>
				</div>
			))}
		</div>
	);
}

export default ReportsTable;
