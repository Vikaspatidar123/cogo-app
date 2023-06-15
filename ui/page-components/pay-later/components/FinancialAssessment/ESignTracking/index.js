import DocumentPreview from './DocumentPreview';
import styles from './styles.module.css';

function ESignTracking({ getCreditRequestResponse = {} }) {
	const {
		credit_application_data:{ signing_authority_email = {} },
		is_sign_mode_digital = false,
	} = getCreditRequestResponse || {};

	return (
		<div className={styles.container}>
			<div className={styles.image}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/animation_500_lhvo6uhx1.png"
					width={234}
					height={234}
					alt="animation"
				/>
			</div>
			<div>
				{/* <div className={styles.signed_by}>
					<Radio name="a2" label="Signed by you" disabled={false} />
					<Radio name="a2" label="Signed by CogFin" disabled={false} />
					<Radio name="a2" label="Final Review" disabled={false} />
				</div> */}
				{is_sign_mode_digital &&			(
					<div className={styles.link}>
						<div>
							An e-sign link is sent to “
							{signing_authority_email}
							“
						</div>
						<span className={styles.resend}>Resend</span>
					</div>
				) }
				<div className={styles.description}>
					You will start seeing Export Financing limit allocated to you on the
					finance dashboard once the agreement is signed by all.
				</div>
				<div className={styles.preview}>
					<DocumentPreview getCreditRequestResponse={getCreditRequestResponse} />
				</div>
			</div>
		</div>
	);
}

export default ESignTracking;
