import { Popover } from '@cogoport/components';

import styles from '../styles.module.css';

import SubNavigation from './SubNavigation';

import { useRouter } from '@/packages/next';

function Navigation({
	setShowPopover = () => { },
	item,
	setIsOpen,
}) {
	const { push } = useRouter();

	const handleClick = async (href, as) => {
		push(href, as, true);
		setShowPopover(false);
	};
	const renderBody = () => (
		<SubNavigation
			setShowPopover={setShowPopover}
			setIsOpen={setIsOpen}
			item={item}
		/>
	);
	return (
		item?.options ? (
			<Popover
				placement="left"
				content={renderBody()}
				onClickOutside={() => setIsOpen((prev) => !prev)}
				interactive
				trigger="click"
			>
				<div className={styles.subscription_container}>
					{item?.icon && <div className={styles.icon}>{item.icon}</div>}
					<div className={styles.a_container} onClick={() => setIsOpen((prev) => !prev)} role="presentation">
						{item?.title}
					</div>
				</div>
			</Popover>
		) : (
			<div className={styles.subscription_container}>
				{item?.icon && <div className={styles.icon}>{item.icon}</div>}
				<div
					className={styles.a_container}
					onClick={() => handleClick(item?.href, item?.as)}
					role="presentation"
				>
					{item?.title}
				</div>
			</div>
		)
	);
}

export default Navigation;
