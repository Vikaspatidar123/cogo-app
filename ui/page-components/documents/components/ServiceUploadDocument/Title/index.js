import { Button, Pill, Tooltip } from '@cogoport/components';
import { IcMCloudUpload, IcMEyeopen, IcMDelete } from '@cogoport/icons-react';

import styles from './styles.module.css';

const COLOR_MAPPING = {
	active  : 'green',
	passive : 'red',
};

function InitTitle({ sampleLink = '' }) {
	return (
		<div className={styles.init_title}>
			{ sampleLink ? (
				<div className={styles.sampleLink}>
					<a
						href={sampleLink}
					>
						sampleLink
					</a>
				</div>

			) : <div className={styles.sampleLink} /> }

			<Button
				themeType="secondary"
			>
				<IcMCloudUpload />
				<div style={{ padding: '0 4px 0 0' }} />
				Upload
			</Button>
		</div>
	);
}

function SuccessTitle() {
	return (
		<div className={styles.success_container}>
			<div style={{ display: 'flex', width: '88%' }}>
				<div className={styles.success_info}>
					Document Number :
					{' '}
					<span className={styles.info}>1234</span>
				</div>
				<div className={styles.success_info}>
					Uploaded on :
					{' '}
					<span className={styles.info}>1234</span>
				</div>
				<div className={styles.success_info}>
					Valid Till :
					{' '}
					<span className={styles.info}>1234</span>
				</div>
			</div>

			<div>
				<IcMEyeopen onClick={() => window.open('/', '_blank')} className={styles.icon} />
				<IcMDelete className={styles.icon} onClick={() => console.log('delete')} />
			</div>
		</div>
	);
}

export default function Title({
	finalList = '',
	type = '',
	sampleLink = '',
	activeCollapse = '',
	setActiveCollapse = () => {},
}) {
	// ! add condition for active or passive condtions color
	return (
		<div
			className={styles.title_container}
		>
			<Pill color={COLOR_MAPPING.passive} className={styles.tag} />
			<div
				className={styles.listTitle}
			>
				<Tooltip animation="shift-away" content={finalList} placement="top">
					{finalList}
				</Tooltip>
			</div>
			{0 ? <InitTitle sampleLink={sampleLink} /> : <SuccessTitle />}
		</div>
	);
}
