/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import styles from '../../styles.module.css';

import { useRouter } from '@/packages/next';

// const options = [
// 	{ label: 'Manage Subscriptions', suffix: 'manage-subscriptions' },
// 	{ label: 'Balance History', suffix: 'balance-history' },
// ];

function SubNavigation({ setIsOpen, setShowPopover, subscriptionNav }) {
	const { options } = subscriptionNav || {};
	const { push } = useRouter();
	const handleClick = async (href, as) => {
		push(
			href,
			as,
			true,
		);
		setShowPopover(false);
		setIsOpen(false);
	};
	return (
		<div>
			{options.map(({ title, href, as }) => (
				<div
					className={`${styles.a_container}`}
					onClick={() => handleClick(href, as)}
				>
					{title}
				</div>
			))}
		</div>
	);
}

export default SubNavigation;
