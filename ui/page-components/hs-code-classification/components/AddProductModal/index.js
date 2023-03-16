import { Tooltip, Modal } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import ModalDetails from './ModalDetails';
import styles from './styles.module.css';

function AddProductModal({ data = {}, src = '' }) {
	const [show, setShow] = useState(false);
	return (
		<div>

			{data?.type === 'FINAL'
				&& (
					<>
						<div
							role="presentation"
							className={`${styles.text} ${styles.not_mobile_icon}`}
							onClick={() => {
								setShow(true);
							}}
						>
							Add to Catalogue
						</div>
						<div
							role="presentation"
							className={`${styles.icon_container} ${styles.is_mobile_icon}`}
							onClick={() => {
								setShow(true);
							}}
						>
							<IcMPlus width={10} height={10} />
						</div>
					</>
				)}

			{src === 'fav' && (
				<Tooltip theme="light" content="Add to Product Catalogue">
					<div
						role="presentation"
						className={`${styles.fav_icon}`}
						onClick={() => {
							setShow(true);
						}}
					>
						<IcMPlus width={25} height={25} />
					</div>
				</Tooltip>
			)}
			{show && (
				<Modal
					show={show}
					onClose={() => setShow(false)}
				>
					<ModalDetails data={data} setShow={setShow} />
				</Modal>
			)}
		</div>
	);
}

export default AddProductModal;
