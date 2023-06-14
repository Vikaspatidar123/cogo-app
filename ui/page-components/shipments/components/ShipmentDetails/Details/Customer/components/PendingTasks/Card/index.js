import { Button } from '@cogoport/components';
import { IcMTaskCompleted } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import DetailsComp from './DetailsComp';
import styles from './styles.module.css';

function Card({ item, onClick }) {
	let buttonText = 'Update';
	if (item?.task_type === 'upload_document') {
		buttonText = 'Upload';
	}

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.item_head}>
					<IcMTaskCompleted />

					<p className={styles.heading}>{startCase(item?.task)}</p>

					{item?.deadline ? (
						<p className={styles.sub_heading}>
							{`(Deadline: ${format(item?.deadline, 'dd MMM yyyy')}`}
						</p>
					) : null}

					{item?.status === 'completed' ? (
						<p className={`${styles.heading} ${styles.rv}`}>
							{`(Completed On: ${format(item?.updated_at, 'dd MMM yyyy')}`}
						</p>
					) : null}
				</div>

				<div className={styles.details}>
					<DetailsComp task={item} />
				</div>
			</div>

			<div className={styles.button}>
				<Button onClick={onClick}>{buttonText}</Button>
			</div>
		</div>
	);
}

export default Card;
