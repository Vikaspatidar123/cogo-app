import { Button, Tooltip, Modal } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import ModalDetails from './ModalDetails';
import styles from './styles.module.css';

function AddProductModal({ data = {}, src = '' }) {
	const [show, setShow] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	return (
		<div>
			{data?.type === 'FINAL'
				&& (!isMobile ? (
					<div
						className={styles.text}
						onClick={() => {
							setShow(true);
						}}
					>
						Add to Catalogue
					</div>
				) : (
					<div
						className={styles.icon_container}
						onClick={() => {
							setShow(true);
						}}
					>
						<IcMPlus width={10} height={10} />
					</div>
				))}
			{src === 'fav' && (
				<Tooltip theme="light" content="Add to Product Catalogue">
					<div
						className={styles.fav_icon}
						onClick={() => {
							setShow(true);
						}}
					>
						<IcMPlus width={25} height={25} />
					</div>
				</Tooltip>
			)}
			<Modal
				show={show}
				onClose={() => setShow(false)}
				className="primary"
				width={!isMobile ? 600 : 400}
			>
				<ModalDetails data={data} setShow={setShow} />
			</Modal>
		</div>
	);
}

export default AddProductModal;
