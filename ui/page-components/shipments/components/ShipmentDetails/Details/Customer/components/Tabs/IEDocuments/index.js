// import { Tabs } from '@cogoport/front/components/admin';
// import TabPanel from '@cogoport/front/components/admin/Tabs/TabPanel';
// import { upperCase } from '@cogoport/front/utils';
import { TabPanel, Tabs } from '@cogoport/components';
import { upperCase } from '@cogoport/utils';
import { useState, useContext } from 'react';

import { ShipmentDetailContext } from '../../../../../common/Context';
import useGetpendingTasks from '../../../../../hooks/useGetpendingTasks';
import useGetShipmentDocuments from '../../../../../hooks/useGetShipmentDocuments';

import Filters from './Filters';
import PendingDocuments from './PendingDocuments';
// import { ShipmentDetailContext } from '../../../../commons/Context';
// import useGetpendingTasks from '../../../hooks/useGetPendingDocs';
// import useGetShipmentDocuments from '../../../hooks/useGetShipmentDocuments';
// import Filters from '../Filters';
// import Pending from '../PendingDocuments';
// import UploadedDocuments from '../UploadedDocuments';

// import { Container } from './styles';
import styles from './styles.module.css';
import UploadedDocuments from './UploadedDocuments';

function IEDocuments() {
	const [activeTab, setActiveTab] = useState('uploaded_documents');
	const [contextValues] = useContext(ShipmentDetailContext);
	const { primary_service, shipment_data } = contextValues || {};

	const { shipment_type } = shipment_data;

	const service = upperCase(primary_service?.service_type?.split('_')[0]);

	const {
		shipmentFilters,
		shipmentDocuments,
		shipmentDocumentsTotal,
		shipmentDocumentsPage,
		shipmentDocumentsLoading,
		shipmentDocumentsHookSetters,
	} = useGetShipmentDocuments({ contextValues });
	const {
		pendingTasks,
		pendingTaskTotal,
		pendingTaskLoading,
		pendingTaskHookSetter,
		// pendingTaskFilters,
		refetch,
	} = useGetpendingTasks({ shipment_type });

	return (
		<div className={styles.container}>
			{/* <Header>
				{activeTab === 'uploaded_documents'
					? `${shipmentDocumentsTotal} Download/s`
					: `${pendingTaskTotal} Pending Upload/s`}{' '}
			</Header> */}

			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
				className="horizontal one"
			>
				<TabPanel
					name="uploaded_documents"
					title="Uploaded Documents"
					className="horizontal one"
					badge={`(${shipmentDocumentsTotal})`}
				>
					<div
						style={{
							boxShadow : '0px 1px 6px rgba(169, 188, 218, 0.65)',
							padding   : '12px',
						}}
					>
						<Filters
							isShow={false}
							hookSetters={shipmentDocumentsHookSetters}
							shipmentFilters={shipmentFilters}
							shipmentDocuments={shipmentDocuments}
						/>

						<UploadedDocuments
							service={service}
							shipmentDocuments={shipmentDocuments}
							shipmentDocumentsTotal={shipmentDocumentsTotal}
							shipmentDocumentsPage={shipmentDocumentsPage}
							shipmentDocumentsHookSetters={shipmentDocumentsHookSetters}
							shipmentFilters={shipmentFilters}
							shipmentDocumentsLoading={shipmentDocumentsLoading}
						/>
					</div>
				</TabPanel>

				<TabPanel
					name="pending_documents"
					title="Pending Documents"
					className="horizontal one"
					badge={`(${pendingTaskTotal})`}
				>
					<PendingDocuments
						pendingTaskTotal={pendingTaskTotal}
						pendingTasks={pendingTasks}
						pendingTaskLoading={pendingTaskLoading}
						refetch={refetch}
						pendingTaskHookSetter={pendingTaskHookSetter}
					/>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default IEDocuments;
