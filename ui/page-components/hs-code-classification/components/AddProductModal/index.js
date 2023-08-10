import { Tooltip, Modal } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import ModalDetails from './ModalDetails';
import styles from './styles.module.css';

function AddProductModal({ data = {}, src = '' }) {
	const { t } = useTranslation(['common', 'hsClassification']);
	const [show, setShow] = useState(false);
	return (
		<div>
			{data?.type === 'FINAL'
				? (
					<>
						<div
							role="presentation"
							className={`${styles.text} ${styles.not_mobile_icon}`}
							onClick={() => {
								setShow(true);
							}}
						>
							{t('hsClassification:hs_code_classification_add_to_catalogue_text')}
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
				) : null}
			{src === 'fav' ? (
				<Tooltip
					theme="light"
					content={t('hsClassification:hs_code_classification_add_to_product_catalogue_tooltip')}
				>
					<div
						role="presentation"
						className={styles.fav_icon}
						onClick={() => {
							setShow(true);
						}}
					>
						<IcMPlus width={25} height={25} />
					</div>
				</Tooltip>
			) : null}
			{show ? (
				<Modal
					show={show}
					onClose={() => setShow(false)}
				>
					<ModalDetails data={data} setShow={setShow} />
				</Modal>
			) : null}
		</div>
	);
}

export default AddProductModal;
