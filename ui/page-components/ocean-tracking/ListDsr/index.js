// import { useRouter } from '@cogo/next';
// import React, { useState } from 'react';

// import { useSaasState } from '../../common/context';
// import IconBack from '../../common/icons/back.svg';
// import IconLeft from '../../common/icons/left-arrow.svg';
// import Button from '../../common/ui/Button';
// import withConfig from '../../common/utils/withConfig';

// import DsrModal from './components/dsr-modal';
// import DsrModalMobile from './components/dsr-modal-mobile';
// import ReportsTable from './components/reports-table';
// import ReportsTableMobile from './components/reports-table-mobile';
// import useFetchDsr from './hooks/useFetchDsr';
// import { DesktopHeader, MobileHeader } from './styles';
import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import DsrModal from './components/DsrModal';
import useFetchDsr from './hooks/useFetchDsr';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ListDsr() {
	// const [dsrs, setDsrs] = useState([]);
	const { back } = useRouter();
	// const { isMobile } = useSaasState();
	const { loading, refetch, dsrs, setDsrs } = useFetchDsr();
	console.log(dsrs, 'dsrs');
	const [isDsrModalOpen, setDsrModal] = useState(false);
	const [dsrModalInfo, setDsrModalInfo] = useState(null);
	// const [dsrModalInfo, setDsrModalInfo] = useState({ type: "new", step: 1 });

	const handleDsrModal = (info = null) => {
		if (isDsrModalOpen === true) {
			refetch();
		}
		setDsrModal(!isDsrModalOpen);
		setDsrModalInfo(info);
	};

	let darModal = null;
	if (isDsrModalOpen) {
		darModal = (
			<DsrModal
				isOpen={isDsrModalOpen}
				handleModal={handleDsrModal}
				type={dsrModalInfo?.type}
				dsrId={dsrModalInfo?.id}
				initialStep={dsrModalInfo?.step}
				dsrs={dsrs}
				setDsrs={setDsrs}
			/>
		);
	}

	return (
		<div>
			{/* <MobileHeader>
				<IconBack style={{ height: 20, width: 20 }} onClick={back} />
				<h2 className="heading">Shipment Status Report</h2>
			</MobileHeader> */}
			<div className={styles.dektop_header}>
				<div role="presentation" className={styles.back} onClick={back}>

					<IcMArrowBack width={30} height={30} />
					<div>Go Back</div>
				</div>
				<div className={styles.heading_container}>
					<h2 className={styles.heading}>Schedule Status Reports to Contacts</h2>
					<Button size="lg" onClick={handleDsrModal}>
						NEW STATUS REPORT
					</Button>
				</div>
			</div>
			{/* {!isMobile ? (
				<ReportsTable loading={loading} dsrList={dsrs} handleDsrModal={handleDsrModal} />
			) : (
				<ReportsTableMobile
					loading={loading}
					dsrList={dsrs}
					handleDsrModal={handleDsrModal}
				/>
			)} */}
			{darModal}
		</div>
	);
}

export default ListDsr;
