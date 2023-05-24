import { Placeholder } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import ReportStatus from '../ReportStatus';

import styles from './styles.module.css';

function ReportsTable({ loading, dsrList, handleDsrModal, setDsrs }) {
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
			{loading && [1, 2, 3, 4, 5].map(() => (
				<div className={styles.loading}>
					<Placeholder />
				</div>
			))}
			{!loading && dsrList?.map((list) => (
				<div>
					<div className={styles.item}>
						{loading && <Placeholder width="300px" />}
						{!loading && (
							<div className={styles.list_item}>
								{list?.poc_details?.name}
							</div>
						)}
						{loading && <Placeholder width="300px" />}
						{!loading && (
							<div className={styles.list_item}>
								{list?.schedule}
								<IcMEdit onClick={() => handleDsrModal({ type: 'update', step: 2, id: list?.id })} />
							</div>
						)}
						{loading && <Placeholder width="300px" />}
						{!loading && (
							<div className={styles.list_item}>
								{list?.shipments}
								<IcMEdit onClick={() => handleDsrModal({ type: 'update', step: 1, id: list.id })} />
							</div>
						)}
						{loading && <Placeholder width="300px" />}
						{!loading && (
							<div className={styles.list_item}>
								{list?.report_update
									? format(list.report_update, 'dd LLL yyyy')
									: ''}
							</div>
						)}
						{loading && <Placeholder width="300px" />}
						{!loading && (
							<div className={styles.list_item}>
								<div className={styles.status}>{list?.status}</div>
								<div className={styles.status}>
									<ReportStatus record={list} dsrId={list?.id} setDsrs={setDsrs} />
								</div>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default ReportsTable;
