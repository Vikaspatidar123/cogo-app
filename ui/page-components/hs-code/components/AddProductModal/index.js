/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Tooltip, Modal } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import ModalDetails from './ModalDetails';
import styles from './styles.module.css';

import isMobile from '@/packages/utils/isMobileAgent';

function AddProductModal({ data = {}, src = '' }) {
	const [show, setShow] = useState(false);
	// console.log(data, 'show');
	return (
		<div>

			{data?.type === 'FINAL'
				&& (
					<>
						<div
							className={`${styles.text} ${styles.not_mobile_icon}`}
							onClick={() => {
								setShow(true);
							}}
						>
							Add to Catalogue
						</div>
						<div
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
