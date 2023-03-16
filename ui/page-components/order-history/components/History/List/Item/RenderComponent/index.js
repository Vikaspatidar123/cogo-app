import { Tooltip } from '@cogoport/components';
import { IcMServices } from '@cogoport/icons-react';
import { useState } from 'react';

import DetailsModal from '../../../../../common/DetailsModal';

import styles from './styles.module.css';

function RenderComponent({ itemData = {} }) {
	const [modal, setModal] = useState(false);
	return (
		<>
			<div className={styles.web_view}>
				<Tooltip placement="bottom" content="service" theme="light">
					<div>
						<IcMServices width={19} height={19} onClick={() => setModal(true)} />
					</div>
				</Tooltip>
			</div>

			<u className={styles.mobile_view} onClick={() => setModal(true)} role="presentation">
				View Details
			</u>

			<div className={styles.modalContainer}>
				{modal && (
					<DetailsModal
						itm={itemData}
						modal={modal}
						setModal={setModal}
					/>
				)}
			</div>
		</>
	);
}

export default RenderComponent;
