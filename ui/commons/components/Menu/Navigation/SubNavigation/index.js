import React from 'react';

import styles from '../../styles.module.css';

import { useRouter } from '@/packages/next';

function SubNavigation({ setIsOpen, setShowPopover, item }) {
	const { options = [] } = item || {};
	const { push } = useRouter();
	const handleClick = async (href, as) => {
		push(href, as, true);
		setShowPopover(false);
		setIsOpen(false);
	};
	return (
		<div>
			{options.map(({ title, href, as }) => (
				<div
					className={`${styles.a_container}`}
					onClick={() => handleClick(href, as)}
					role="presentation"
					key={title}
				>
					{title}
				</div>
			))}
		</div>
	);
}

export default SubNavigation;
