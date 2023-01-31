import dynamic from 'next/dynamic';

import Links from './Links';
import styles from './styles.module.css';

const UserDetails = dynamic(() => import('@/commons/components/UserDetails'), {
	ssr: false,
});

function RightPanel({
	activeComponentKey = '',
	panel = {},
	headerComponent = null,
}) {
	const { config = {}, component: mainComponent = null } = panel;

	const { layout = {}, components = {} } = config;

	if (!(activeComponentKey in components)) {
		return null;
	}

	const renderHeader = () => {
		const { header = {} } = layout;
		const {
			show = true,
			reDirectionLinks = [],
			showUserDetails = false,
		} = header;

		if (!show) {
			return null;
		}

		return (
			<div className={styles.right_panel__header}>
				<Links links={reDirectionLinks} />
				{showUserDetails && <UserDetails />}
			</div>
		);
	};

	const renderMain = () => <div className={styles.right_panel__main}>{mainComponent}</div>;

	return (
		<div
			className={styles.right_panel}
		// paddingTop={headerComponent ? '0' : '64px'}
		>
			{!headerComponent && renderHeader()}
			{renderMain()}
		</div>
	);
}

export default RightPanel;
