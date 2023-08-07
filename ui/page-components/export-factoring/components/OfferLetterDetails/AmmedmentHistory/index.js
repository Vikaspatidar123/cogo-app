import { Button, Modal } from '@cogoport/components';
import React from 'react';

import FilePreview from '../../../common/FilePreview';

import styles from './styles.module.css';

function AmmedmentHistory({ showAmmedmentView, setShowAmmedmentView = () => {}, getCreditRequestResponse }) {
	const {
		documents = {}, comments = {},
	} = getCreditRequestResponse;

	return (
		<Modal size="lg" show={showAmmedmentView} onClose={() => setShowAmmedmentView((prev) => !prev)} closable>
			<Modal.Header title="Request History" />
			<Modal.Body>
				<div className={styles.container}>
					<div className={styles.doc_container}>
						{(documents?.offer_letter?.rejected_on_review
						|| documents?.offer_letter?.active) && (
							<div className={styles.file_container}>
								<div className="old">Old Version</div>
								<FilePreview
									name="OFFER LETTER"
									url={documents?.offer_letter?.rejected_on_review
										? documents?.offer_letter?.rejected_on_review?.document_url
										: documents?.offer_letter?.active?.document_url}
								/>
							</div>
						)}
						{documents?.offer_letter?.rejected_on_review
						&& documents?.offer_letter?.active && (
							<div className={styles.file_container}>
								<div className="new">
									Latest Version
								</div>
								<FilePreview
									name="OFFER LETTER"
									url={documents?.offer_letter?.active
										? documents?.offer_letter?.active?.document_url
										: documents?.offer_letter?.rejected_on_review
											?.document_url}
								/>

							</div>
						)}
					</div>

					<div className={styles.offer_container}>
						<div className={styles.heading}>Amendment request</div>
						{comments?.offer_letter.splice(1).map((x) => (x?.user_type === 'user' ? (
							<div className={styles.main_container}>
								<div className={`${styles.comment_box} user`}>

									{x?.body}
								</div>
								<div className={styles.user_date_wrap}>
									<div className={styles.user_text}>{x?.updated_at.slice(0, 10)}</div>
									<div className={styles.user_text}>{x?.user_name}</div>
								</div>
							</div>
						) : (
							<div className={styles.content_div}>
								<div className={`${styles.comment_box} `}>{x?.body}</div>
								<div className={styles.date_wrap}>
									<div className={styles.user_text}>{x?.updated_at.slice(0, 10)}</div>
									<div className={styles.user_text}>CredFinix</div>
								</div>
							</div>
						)))}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					style={{ marginRight: '10px' }}
					themeType="secondary"
					onClick={() => setShowAmmedmentView((prev) => !prev)}
					type="button"
				>
					close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AmmedmentHistory;
