import { Modal } from '@cogoport/components';
import { getByKey } from '@cogoport/utils';

import Status from '../Status';

import Item from './Item';
import styles from './styles.module.css';

function Details({ heading, state, service_items_key, service_data }) {
	return (
		<div>
			<div className={styles.heading}>{heading}</div>

			<Status state={state} />
			<Modal.Body>
				{service_items_key?.map((element) => (getByKey(service_data, element.key) ? (
					<Item
						state={state}
						label={element.label}
						elementKey={element.key}
						detail={service_data}
					/>
				) : null))}
			</Modal.Body>
		</div>
	);
}

export default Details;
