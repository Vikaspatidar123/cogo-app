/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Popover } from '@cogoport/components';
import { IcMServices } from '@cogoport/icons-react';

import styles from '../styles.module.css';

import SubNavigation from './SubNavigation';

function Navigation({
	setShowPopover = () => {},
	subscriptionNav,
	setIsOpen,
	isOpen,
}) {
	const renderBody = () => (
		<SubNavigation
			setShowPopover={setShowPopover}
			setIsOpen={setIsOpen}
			subscriptionNav={subscriptionNav}
		/>
	);
	return (
		<Popover
			placement="left"
			content={renderBody()}
			onClickOutside={() => setIsOpen(!isOpen)}
			interactive
			trigger="mouseenter"
		>
			<div className={styles.subscription_container}>
				<IcMServices style={{ marginRight: '12px' }} />
				<div className={styles.a_container} onClick={() => setIsOpen(!isOpen)}>
					{subscriptionNav?.title}
				</div>
			</div>
		</Popover>
	);
}

export default Navigation;
