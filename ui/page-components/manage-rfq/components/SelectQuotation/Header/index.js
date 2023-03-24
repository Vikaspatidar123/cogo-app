import { IcMArrowBack } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Header({ isPortPairEmpty }) {
	const { back, query } = useRouter();

	return (
		<div className={styles.container}>
			<div className={styles.heading_left}>
				<IcMArrowBack onClick={back} width={24} height={24} />
				<div className={styles.title}>
					RFQ ID:
					{' '}
					{query.serial_id}
				</div>
				{!isPortPairEmpty && (
					<>
						<div className={styles.tag}>
							{format(query.created_at, 'dd-MMM-yyyy')}
						</div>
						{query?.port && query?.port !== 'undefined' && (
							<div className={styles.tag}>
								{' '}
								{query.port}
								{' '}
								Port Pairs
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default Header;
