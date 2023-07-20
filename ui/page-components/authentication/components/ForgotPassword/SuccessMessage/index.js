import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function SuccessMessage({ resetUserPassword = () => { }, emailId = '' }) {
	const { t } = useTranslation(['authentication']);
	const translationKey = 'authentication:forgotPassword_success';

	return (
		<>
			<h2 className={styles.card_heading}>{t(`${translationKey}_title`)}</h2>

			<p className={styles.card_body}>
				{t(`${translationKey}_body_1`)}
				{' '}
				<strong>
					{emailId}
				</strong>
				{' '}
				{t(`${translationKey}_body_2`)}
				<br />
				<br />
				{t(`${translationKey}_body_3`)}
			</p>

			<div className={styles.info}>
				{t(`${translationKey}_note_title`)}
				<ul>
					<li>
						{t(`${translationKey}_note_1`)}
					</li>
					<li>
						{t(`${translationKey}_note_2`)}
					</li>
					<li>
						{t(`${translationKey}_note_3`)}
					</li>
				</ul>
			</div>

			<p className={styles.links}>
				{t(`${translationKey}_reset_text`)}
				{' '}
				<div className={styles.reset_link} onClick={() => resetUserPassword(emailId)} role="presentation">
					{t(`${translationKey}_resendEmail_link`)}
				</div>
			</p>
		</>
	);
}

export default SuccessMessage;
