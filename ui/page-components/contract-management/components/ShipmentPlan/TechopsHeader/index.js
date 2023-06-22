import { Placeholder } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function TechopsHeader({ loading = false }) {
	const { back, query } = useRouter();
	const { through = '', contractReferenceId = '', tats = 0 } = query || {};

	return (
		<div>
			{!loading ? (
				<div className={styles.container}>
					<div className={`${styles.section} ${styles.section_one}`}>
						{through === 'techops' && <div className={styles.title}>Tech Ops</div>}
					</div>
					<div className={styles.section}>
						<IcMArrowBack onClick={back} />
						<div className={styles.refName}>
							Reference Number :
							{contractReferenceId || '-'}
						</div>
						<div className={styles.refName}>
							TAT :
							{tats === 'null' ? 0 : tats}
							{' '}
							hours
						</div>
					</div>
				</div>
			) : (
				<Placeholder height="100px" width="100%" margin="10px 0px" />
			)}
		</div>
	);
}

export default TechopsHeader;
