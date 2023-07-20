import { cl, Modal, Button } from '@cogoport/components';
import { IcMEyeopen, IcMDelete } from '@cogoport/icons-react';
import { useState } from 'react';

import useDeleteDocument from '../../../../hooks/useDeleteDocument';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

export default function UploadedDoc({
	uploadedDoc = {},
	refetch = () => {},
}) {
	const [show, setShow] = useState(false);

	const onClose = () => {
		setShow(false);
	};

	const {
		deleteDocument,
		loading,
	} = useDeleteDocument({ refetch });

	const handleDelete = () => {
		deleteDocument({ item: uploadedDoc });
	};

	return (
		<div className={styles.success_container}>
			<div style={{ display: 'flex', width: '88%' }}>
				<div className={styles.success_info_doc}>
					Document Number :
					{' '}
					<span className={styles.info}>
						{uploadedDoc?.data?.document_number}
					</span>
				</div>

				<div className={styles.success_info}>
					Valid Till :
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
					Uploaded on :
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

			<div>
				<IcMEyeopen
					onClick={() => window.open(uploadedDoc?.image_url, '_blank')}
					className={styles.icon}
				/>

				<IcMDelete
					className={cl`${styles.icon} ${loading ? styles.loading : null}`}
					onClick={() => setShow(true)}
				/>
			</div>

			<Modal size="md" show={show} onClose={onClose} placement="center">
				<Modal.Header title="Are you sure?" />

				<Modal.Body>
					Do you wish to delete the document?
				</Modal.Body>

				<Modal.Footer>
					<div className={styles.modal_body}>
						<Button
							style={{ margin: '0 8px 0 0' }}
							themeType="secondary"
							onClick={onClose}
							loading={loading}
						>
							Cancel
						</Button>

						<Button
							themeType="primary"
							onClick={handleDelete}
							loading={loading}
						>
							Save
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
