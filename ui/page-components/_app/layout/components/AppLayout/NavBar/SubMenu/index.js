import styles from './styles.module.css';
import SubMenuItem from './SubMenuItem';

function NavBarSubMenu({ options, unPrefixedPath, setShowPopover }) {
	return (
		<div className={styles.menu}>
			{options.map((option) => (
				<SubMenuItem
					key={option.title}
					item={option}
					unPrefixedPath={unPrefixedPath}
					setShowPopover={setShowPopover}
				/>
			))}
		</div>
	);
}

export default NavBarSubMenu;
