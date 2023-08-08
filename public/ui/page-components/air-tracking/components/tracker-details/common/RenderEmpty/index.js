import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function RenderEmpty() {
	const { push } = useRouter();
	return (
		<div className={styles.flex}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/heeee.svg"
				alt="tracking"
				width="24%"
			/>
			<text className={styles.head}>Analyzing data and building insights</text>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
				alt=""
			/>
			<text>Retrieving Tracking Data</text>
			<text>
				Fetching data on this cargo / shipment is taking longer than
				usual. We will inform you as soon as it&apos;s available.
			</text>

			<Button
				size="md"
				themeType="accent"
				style={{ marginTop: 24 }}
				onClick={() => push('/saas/air-tracking')}
			>
				GO BACK &amp; KEEP TRACKING
			</Button>

			<Button
				variant="link"
				style={{ marginTop: 16 }}
				icon={<IcMDelete style={{ height: 24, width: 24 }} />}
			>
				Delete tracker &amp; restore balance
			</Button>
		</div>
	);
}
export default RenderEmpty;
