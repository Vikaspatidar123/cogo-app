import React from 'react';

import styles from '../../styles.module.css';

import { useRouter } from '@/packages/next';

const options = [
	{ label: 'Manage Subscriptions', suffix: 'manage-subscriptions' },
	{ label: 'Balance History', suffix: 'balance-history' },
];

function SubNavigation({ setIsOpen, setShowPopover }) {
	const { push } = useRouter();
	const handleClick = async (suffix) => {
		push(
			`/saas/cogo-subscriptions/${suffix}`,
			`/saas/cogo-subscriptions/${suffix}`,
			true,
		);
		setShowPopover(false);
		setIsOpen(false);
	};
	return (
		<div className={styles.flex}>
			{options.map(({ label, suffix }) => (
				<div
					className={styles.A}
					as="button"
					className="sub-navlink"
					onClick={() => handleClick(suffix)}
				>
					{label}
				</div>
			))}
		</div>
	);
}

export default SubNavigation;
