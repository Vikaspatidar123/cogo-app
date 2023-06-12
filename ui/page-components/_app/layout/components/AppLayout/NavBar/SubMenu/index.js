import styles from './styles.module.css';
import SubMenuItem from './SubMenuItem';

function NavBarSubMenu({ options, unPrefixedPath, getFindUrl }) {
	return (
		<div className={styles.menu}>
			{(options || []).map((option) => (
				<SubMenuItem key={option.title} item={option} unPrefixedPath={unPrefixedPath} getFindUrl={getFindUrl} />
			))}
		</div>
	);
}

export default NavBarSubMenu;
