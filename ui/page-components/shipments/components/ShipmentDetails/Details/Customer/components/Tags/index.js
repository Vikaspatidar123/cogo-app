// import { Popover, Button } from '@cogoport/front/components/admin';
import { Popover, Button } from '@cogoport/components';
import { useState } from 'react';

import useDeleteTag from '../../../../hooks/useDeleteTag';

import styles from './styles.module.css';

function Tags({ tags = [], setOpen = () => {}, setTags, shipment_data }) {
	const [show, setShow] = useState(false);

	const { onDelete } = useDeleteTag({ shipment_data, setTags, tags });
	const renderPopoverContent = (
		<div className={styles.custom_tag}>
			{(tags || []).map((tag) => (
				<div className={styles.tag_container}>
					<p className={styles.tag}>{tag}</p>
					<div role="presentation" className={styles.delete_tag} onClick={() => onDelete(tag)}>x</div>
				</div>
			))}
		</div>
	);

	if (tags?.length <= 4) {
		return (
			<div className={styles.container}>
				<div className={styles.all_tag}>
					{(tags || []).map((tag) => (
						<div className={styles.tag_container}>
							<p className={styles.tag}>{tag}</p>
							<div role="presentation" className={styles.delete_tag} onClick={() => onDelete(tag)}>x</div>
						</div>
					))}
				</div>
				<div className={styles.button_wrap}>
					<Button className="secondary md" onClick={() => setOpen(true)}>
						+ Add Tag
					</Button>
				</div>
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<div className={styles.all_tag}>
				<div className={styles.tag_display}>
					{(tags || []).map((tag, idx) => {
						if (idx > 5) return null;
						return (
							<div className={styles.tag_container}>
								<p className={styles.tag}>{tag}</p>
								<div
									role="presentation"
									className={styles.delete_tag}
									onClick={() => onDelete(tag)}
								>
									x
								</div>
							</div>
						);
					})}
				</div>
				<Popover
					theme="light"
					show={show}
					placement="bottom"
					interactive
					onOuterClick={() => setShow(false)}
					render={(
						<div style={{ width: '160px', display: 'flex', flexWrap: 'wrap' }}>
							{renderPopoverContent}
						</div>
					)}
				>
					<p className={styles.view}>View All</p>
				</Popover>
			</div>
			<div className={styles.button_wrap}>
				<Button className="secondary md" onClick={() => setOpen(true)}>
					+ Add Tag
				</Button>
			</div>
		</div>
	);
}

export default Tags;
