import { Popover } from '@cogoport/components';

import styles from '../styles.module.css';

import SubNavigation from './SubNavigation';

import { useRouter } from '@/packages/next';

function Navigation({
	setShowPopover = () => {},
	item,
	setIsOpen,
	isOpen,
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
				onClickOutside={() => setIsOpen(!isOpen)}
				interactive
				trigger="click"
			>
				<div className={styles.subscription_container}>
					{item.icon && <div style={{ marginRight: '12px' }}>{item.icon}</div>}
					<div className={styles.a_container} onClick={() => setIsOpen(!isOpen)} role="presentation">
						{item?.title}
					</div>
				</div>
			</Popover>
		) : (
			<div className={styles.subscription_container}>
				{item.icon && <div style={{ marginRight: '12px' }}>{item.icon}</div>}
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
