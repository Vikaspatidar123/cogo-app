import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function PanelsLayout({
	activeComponentKey = '',
	headerComponent,
	leftPanel = {},
	rightPanel = {},
	cogoportIcon,
}) {
	return (
		<div>
			{/* {headerComponent && (
				<div className={styles.onboarding_layout__header}>{headerComponent}</div>
			)} */}

			<div
				className={styles.onboarding_layout__main}
			// isHeaderComponentPresent={!!headerComponent}
			>
				<div>
					<LeftPanel
						cogoportIcon={cogoportIcon}
						activeComponentKey={activeComponentKey}
						panel={leftPanel}
						headerComponent={headerComponent}
					/>
				</div>

				<div className={styles.onboarding_layout__right}>
					<RightPanel
						activeComponentKey={activeComponentKey}
						panel={rightPanel}
						headerComponent={headerComponent}
					/>
				</div>
			</div>
		</div>
	);
}

export default PanelsLayout;
