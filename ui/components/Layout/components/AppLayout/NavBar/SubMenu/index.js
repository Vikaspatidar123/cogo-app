import styles from './styles.module.css';
import SubMenuItem from './SubMenuItem';

function NavBarSubMenu({ options }) {
	return (
		<div className={styles.menu}>
			{options.map((option) => (
				<SubMenuItem key={option.label} item={option} />
			))}
		</div>
	);
}

export default NavBarSubMenu;
