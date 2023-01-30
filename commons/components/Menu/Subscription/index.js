import { Popover } from '@cogoport/components';
import { IcMServices } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from '../styles.module.css';

import SubNavigation from './SubNavigation';

function Subscription({ setShowPopover = () => { } }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Popover
			placement="bottom-start"
			animation="shift-away"
			content={
				<SubNavigation setShowPopover={setShowPopover} setIsOpen={setIsOpen} />
			}
			theme="light"
			visible={isOpen}
			onClickOutside={() => setIsOpen(false)}
			interactive
		>
			<div className={styles.subscription_container}>
				<IcMServices style={{ marginRight: '12px' }} />
				<div className={styles.A} as="button" onClick={() => setIsOpen(!isOpen)}>
					Subscription
				</div>
			</div>
		</Popover>
	);
}

export default Subscription;
