import { Tooltip } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import redirectUrl from '../common/redirectUrl';

import Description from './Description';
import styles from './styles.module.css';
import TabsSection from './Tabs';

function CreateInsurance() {
	const { redirectList } = redirectUrl();

	return (
		<div className={styles.wrapper}>
			<div className={styles.heading}>
				<Tooltip content="Back To List View">
					<div className={styles.center}>
						<IcMArrowBack className={styles.icon} onClick={() => redirectList()} />
					</div>
				</Tooltip>
				<div className={styles.text_type}>Create Insurance</div>
			</div>

			<div className={styles.container_wrapper}>
				<div className={styles.container}>
					<div className={styles.row}>
						<div className={styles.column_1}>
							<Description />
						</div>
						<div className={styles.column}>
							<TabsSection />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateInsurance;
