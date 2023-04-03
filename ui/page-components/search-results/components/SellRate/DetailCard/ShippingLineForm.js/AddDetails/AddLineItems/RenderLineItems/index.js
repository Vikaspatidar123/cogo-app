import { Loader } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function RenderLineItems({ lineItems, deleteLineItem = () => {}, loading }) {
	const renderDeleteBtn = (item) => {
		if (loading) {
			return (
				<Loader />
			);
		}

		return (
			<div className={styles.col}>
				<div className={styles.delete_icon} role="presentation" onClick={() => deleteLineItem(item)}>
					<IcMDelete height="17px" width="17px" />
				</div>
			</div>
		);
	};

	return (
		<div className={styles.container}>
			{(lineItems || []).map((line_item) => (
				<div className={styles.detail_icon}>
					<div className={styles.row}>
						<div className={styles.col}>
							{startCase(line_item?.name)}
							{' '}
							(
							{line_item?.code}
							)
						</div>
						<div className={styles.col}>
							{startCase(line_item?.unit)}
						</div>
						<div className={styles.col}>
							{startCase(line_item?.currency)}
						</div>
						{/* <Col xs={12} md={12} lg={2} xl={2}>
								{line_item?.buy_price}
							</Col> */}
						<div className={styles.col}>
							{line_item?.price}
						</div>
						{line_item?.source === 'manual'
							? renderDeleteBtn(line_item)
							: null}
					</div>
				</div>
			))}
		</div>
	);
}

export default RenderLineItems;
