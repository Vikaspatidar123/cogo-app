import { Button, Modal } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';

import styles from './styles.module.css';

function DeleteModal({ show = false, setShow, quoteId = '', deleteQuote, deleteLoading = false }) {
	const deleteHandler = async () => {
		await deleteQuote(quoteId);
		setShow(false);
	};

	return (
		<Modal show={show} onClose={() => setShow(false)} closeOnOuterClick>
			<Modal.Header title="Are you sure?" />
			<Modal.Body>
				<div className={styles.icon_container}>
					<IcMDelete width={50} height={50} />
				</div>
				<h2 className={styles.text}>This would delete quotation permanently...</h2>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.footer}>
					<Button
						themeType="secondary"
						onClick={() => setShow(false)}
						disabled={deleteLoading}
					>
						No

					</Button>
					<Button
						className={styles.btn}
						themeType="accent"
						onClick={deleteHandler}
						loading={deleteLoading}
					>
						Yes

					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteModal;
