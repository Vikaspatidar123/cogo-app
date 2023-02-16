import { Tooltip } from '@cogoport/components';
import { IcMServices } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from '../styles.module.css';

import SubNavigation from './SubNavigation';

function Subscription({
	setShowPopover = () => { }, subscriptionNav, setIsOpen, isOpen,
}) {
	const renderBody = () => <SubNavigation setShowPopover={setShowPopover} setIsOpen={setIsOpen} subscriptionNav={subscriptionNav} />;
	return (
		<Tooltip
			placement="bottom-start"
			animation="shift-away"
			content={renderBody()}
			theme="light"
			// visible={isOpen}
			onClickOutside={() => setIsOpen(!isOpen)}
			interactive
		>
			<div className={styles.subscription_container}>
				<IcMServices style={{ marginRight: '12px' }} />
				<div className={styles.A} as="button" onClick={() => setIsOpen(!isOpen)}>
					{subscriptionNav?.title}
				</div>
			</div>
		</Tooltip>
	);
}

export default Subscription;
