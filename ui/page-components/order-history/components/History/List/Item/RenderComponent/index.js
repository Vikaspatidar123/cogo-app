import { Tooltip } from '@cogoport/components';
import { IcMServices } from '@cogoport/icons-react';
import { useState } from 'react';

import DetailsModal from '../../../../../common/DetailsModal';

import styles from './styles.module.css';

function RenderComponent({ itemData = {}, isMobile = false }) {
	const [modal, setModal] = useState(false);
	return (
		<>
			{!isMobile ? (
				<Tooltip placement="bottom" content="service" theme="light">
					<div>
						<IcMServices width={19} height={19} onClick={() => setModal(true)} />
					</div>
				</Tooltip>
			) : (
				<u onClick={() => setModal(true)} role="presentation">
					View Details
				</u>
			)}
			<div className={styles.modalContainer}>
				{modal && (
					<DetailsModal
						itm={itemData}
						modal={modal}
						setModal={setModal}
						isMobile={isMobile}
					/>
				)}
			</div>
		</>
	);
}

export default RenderComponent;
