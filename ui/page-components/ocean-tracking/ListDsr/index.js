import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import DsrModal from './components/DsrModal';
import ReportsTable from './components/ReportsTable';
import useFetchDsr from './hooks/useFetchDsr';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ListDsr() {
	const { back } = useRouter();
	const { loading, refetch, dsrs, setDsrs } = useFetchDsr();
	const [isDsrModalOpen, setDsrModal] = useState(false);
	const [dsrModalInfo, setDsrModalInfo] = useState(null);

	const handleDsrModal = (info) => {
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
			<div className={styles.dektop_header}>
				<div role="presentation" className={styles.back} onClick={back}>

					<IcMArrowBack width={30} height={30} />
					<div>Go Back</div>
				</div>
				<div className={styles.heading_container}>
					<h2 className={styles.heading}>Schedule Status Reports to Contacts</h2>
					<div className={styles.button}>
						<Button size="md" onClick={handleDsrModal}>
							NEW STATUS REPORT
						</Button>
					</div>
				</div>
			</div>
			<ReportsTable loading={loading} dsrList={dsrs} handleDsrModal={handleDsrModal} setDsrs={setDsrs} />
			{darModal}
		</div>
	);
}

export default ListDsr;
