import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function PersonalDetails({ userDetails = {}, renderWorkScopes = () => {}, setShowPasswordModal = () => {} }) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.text_1}>
				PERSONAL INFORMATION
			</div>
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>Email Address</div>
						<div className={styles.value}>{userDetails.email || '-'}</div>
					</div>
				</div>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>Work Scope</div>
						<div className={styles.value}>{renderWorkScopes()}</div>
					</div>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>Languages</div>
						<div className={styles.value}>
							{userDetails.preferred_languages?.length > 0
								? (
									<div className={styles.flex}>
										{ userDetails.preferred_languages?.map((lang, index) => (
											<div className={styles.language_tag}>
												{startCase(lang)}
												{index < userDetails.preferred_languages.length - 1 ? ',' : ''}
												{'  '}
											</div>
										))}
									</div>
								)
								: '-'}
						</div>
					</div>
				</div>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>Mobile</div>
						<div className={styles.value}>
							{userDetails.mobile_number
								? `${userDetails.mobile_country_code} ${userDetails.mobile_number}`
								: '-'}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>Password</div>
						<div className={styles.value}>
							<Button themeType="secondary" onClick={() => setShowPasswordModal(true)}>
								Reset Password
							</Button>
						</div>
					</div>
				</div>
				<div className={styles.sub_container}>
					<div>
						<div className={styles.heading}>Alt Mobile</div>
						<div className={styles.value}>
							{userDetails.alternate_mobile_numbers?.length > 0
								? userDetails.alternate_mobile_numbers?.map(
									(mobile_number) => (
										<div
											className={styles.value_text}
										>
											{`${mobile_number.mobile_country_code}
												${mobile_number.mobile_number}`}
										</div>
									),
								)
								: '-'}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PersonalDetails;
