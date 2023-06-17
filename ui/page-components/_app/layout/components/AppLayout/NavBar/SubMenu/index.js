import styles from './styles.module.css';
import SubMenuItem from './SubMenuItem';

function NavBarSubMenu({ options, unPrefixedPath }) {
	return (
		<div className={styles.menu}>
			{options.map((option) => (
				<SubMenuItem
					key={option.title}
					item={option}
					unPrefixedPath={unPrefixedPath}
				/>
			))}
		</div>
	);
}

export default NavBarSubMenu;
