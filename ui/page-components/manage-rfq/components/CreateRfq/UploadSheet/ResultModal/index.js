import { cl, Modal, Button } from '@cogoport/components';
import { IcCFtick, IcMError } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ResultModal({ showResult, setShowResult, setValue }) {
	const { push } = useRouter();
	return (
		<Modal closable={false} show={showResult.showModal}>
			<div className={styles.container}>
				{showResult.isSuccess ? (
					<div className={styles.success_icon}>
						<IcCFtick />
					</div>
				) : (
					<div className={styles.error_icon}>
						<IcMError />
					</div>
				)}

				<div className={styles.label}>
					{showResult.isSuccess
						? 'File Uploaded Successfully'
						: 'Failed to upload file'}
				</div>
				{showResult?.errorText ? (
					<div className={styles.error}>{showResult?.errorText.split(' ').slice(1).join(' ')}</div>
				) : (
					<div className={styles.sublabel}>
						Your Request has been submitted succesfully
					</div>
				)}
				<div className={cl`${styles.btn_container} ${showResult.isSuccess && styles.isSuccess}`}>
					{!showResult.isSuccess && (
						<Button
							themeType="secondary"
							onClick={() => {
								setValue('file_url', '');
								setShowResult({
									showModal : false,
									isSuccess : false,
									errorText : '',
								});
							}}
						>
							Re Upload
						</Button>
					)}
					<Button themeType="accent" onClick={() => push('/manage-rfq')}>
						Go to dashboard
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default ResultModal;
