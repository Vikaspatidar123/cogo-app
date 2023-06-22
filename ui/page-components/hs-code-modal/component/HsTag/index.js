import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function HsTag({ activeSection = '', activeChapter = '', activeHeading = '' }) {
	return (
		<div className={styles.tab_header}>
			{activeSection
				&& (activeSection.length > 25 ? (
					<Tooltip
						content={(
							<div className={styles.tooltip_style}>
								{
									startCase(activeSection).toLowerCase()
								}
							</div>
						)}
						theme="light"
					>
						<div className={styles.sub_heading}>
							{startCase(activeSection?.toLowerCase()).substring(0, 25)}
							... |
						</div>
					</Tooltip>
				) : (
					<div className={styles.sub_heading}>
						{startCase(activeSection?.toLowerCase())}
						{' '}
						|
						{' '}
					</div>
				))}
			{activeChapter
				&& (activeChapter.length > 25 ? (
					<Tooltip
						content={(
							<div className={styles.tooltip_style}>
								{
									startCase(activeChapter)
								}
							</div>
						)}
						theme="light"
					>
						<div className={styles.sub_heading}>
							{startCase(activeChapter).substring(0, 25)}
							... |
						</div>
					</Tooltip>
				) : (
					<div className={styles.sub_heading}>
						{' '}
						{startCase(activeChapter)}
						{' '}
						|
						{' '}
					</div>
				))}
			{activeHeading
				&& (activeChapter.length > 25 ? (
					<Tooltip
						content={(
							<div className={styles.tooltip_style}>
								{
									startCase(activeHeading)
								}
							</div>
						)}
						theme="light"
					>
						<div className={styles.sub_heading}>
							{' '}
							{startCase(activeHeading).substring(0, 25)}
							...
							{' '}
						</div>
					</Tooltip>
				) : (
					<div className={styles.sub_heading}>
						{' '}
						{startCase(activeHeading)}
						{' '}
					</div>
				))}
		</div>
	);
}

export default HsTag;
