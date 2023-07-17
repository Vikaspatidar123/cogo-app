import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

// import { useRouter } from '@/packages/next';
function ExportFactoring() {
	// const { push } = useRouter();
	const { t } = useTranslation(['dashboard']);

	// const handelRouting = () => {
	// 	push('/export-factoring-login');
	// };
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
				<span className={styles.yellow}>{t('dashboard:export_factoring_text_1')}</span>
				{t('dashboard:export_factoring_text_2')}
				<div>{t('dashboard:export_factoring_text_3')}</div>
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
					{t('dashboard:export_factoring_text_4')}
				</div>
			</div>

			{/* <div className={styles.button_container}>
				<Button onClick={handelRouting}>Show Interest</Button>
			</div> */}
		</div>
	);
}
export default ExportFactoring;
