import { Button } from '@cogoport/components';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ExportFactoring() {
	const { push } = useRouter();
	const handelRouting = () => {
		push('/export-factoring-login');
	};
	return (
		<div className={styles.container}>
			<div className={styles.icon_container}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/comingSoonIcon.svg"
					alt="coming-soon"
					size={10.0}
				/>
			</div>
			<div className={styles.header}>
				<span className={styles.yellow}>Export factoring </span>
				is right around the corner.
				<div> Easily apply online in just a few minutes</div>
			</div>

			<div className={styles.info_container}>
				<div className={styles.svg_container}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/document2Icon.svg"
						alt="document-icon"
						size={4.0}
					/>
				</div>
				<div className={styles.text} size={12}>
					Finance up to 90% of your commercial invoice value and avail
					collateral free insured limits.
				</div>
			</div>

			<div className={styles.button_container}>
				<Button onClick={handelRouting}>Show Interest</Button>
			</div>
		</div>
	);
}
export default ExportFactoring;
