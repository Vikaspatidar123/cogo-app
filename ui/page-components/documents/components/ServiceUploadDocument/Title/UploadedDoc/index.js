import { cl, Modal, Button } from '@cogoport/components';
import { IcMEyeopen, IcMDelete } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useDeleteDocument from '../../../../hooks/useDeleteDocument';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

export default function UploadedDoc({
	uploadedDoc = {},
	refetch = () => {},
}) {
	const { t } = useTranslation(['documents']);

	const [show, setShow] = useState(false);

	const {
		deleteDocument,
		loading,
	} = useDeleteDocument({ refetch });

	const handleDelete = () => {
		deleteDocument({ item: uploadedDoc });
	};

	return (
		<div className={styles.success_container}>
			<div style={{ display: 'flex', width: '100%' }}>
				<div className={styles.success_info_doc}>
					{t('documents:document_number')}
					{' '}
					<span className={styles.info}>
						{uploadedDoc?.data?.document_number}
					</span>
				</div>

				<div className={styles.success_info}>
					{t('documents:valid_till')}
					{' '}
					<span className={styles.info}>
						{formatDate({
							date       : (uploadedDoc?.data.document_validity),
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</span>
				</div>

				<div className={styles.success_info}>
					{t('documents:uploaded_on')}
					{' '}
					<span className={styles.info}>
						{formatDate({
							date       : (uploadedDoc?.created_at),
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</span>
				</div>
			</div>

			<div className={styles.icon_wrap}>
				<IcMEyeopen
					onClick={() => window.open(uploadedDoc?.image_url, '_blank')}
					className={styles.icon}
				/>

				<IcMDelete
					className={cl`${styles.icon} ${loading ? styles.loading : null}`}
					onClick={() => setShow(true)}
				/>
			</div>

			{show ? (
				<Modal size="md" show={show} onClose={() => setShow(false)} placement="center">
					<Modal.Header title={t('documents:delete_confirmation_title')} />

					<Modal.Body>
						{t('documents:delete_confirmation')}
					</Modal.Body>

					<Modal.Footer>
						<div className={styles.modal_body}>
							<Button
								style={{ margin: '0 8px 0 0' }}
								themeType="secondary"
								onClick={() => setShow(false)}
								loading={loading}
							>
								{t('documents:cancel_btn')}
							</Button>

							<Button
								themeType="primary"
								onClick={handleDelete}
								loading={loading}
							>
								{t('documents:save_btn')}
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}
