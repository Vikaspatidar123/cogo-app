// import getByKey from '@cogo/utils/getByKey';
// import React from 'react';

// import Status from '../Status';

// import Item from './Item';
// import { Container, Heading } from './styles';
import { getByKey } from '@cogoport/utils';

import Status from '../Status';

import Item from './Item';
import styles from './styles.module.css';

function Details({ heading, state, service_items_key, service_data }) {
	return (
		<div>
			<div className={styles.heading}>{heading}</div>

			<Status state={state} />

			{service_items_key?.map((element) => (getByKey(service_data, element.key) ? (
				<Item
					state={state}
					label={element.label}
					elementKey={element.key}
					detail={service_data}
				/>
			) : null))}
		</div>
	);
}

export default Details;
