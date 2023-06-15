import styles from './styles.module.css';

function SignatoryMethod({ setMethod = () => {}, method = '' }) {
	return (
		<div>
			<div
				className={method === 'digital' ? styles.selected_button : styles.button}
				role="presentation"
				onClick={() => setMethod('digital')}
			>
				<div>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/Vector.png"
						alt="online"
						width={19}
						height={18}
					/>
				</div>
				<div className={styles.description}>
					<div className={styles.heading}>
						Online Signature
					</div>
					<div className={styles.sub_heading}>
						E-Sign link will be sent to signatory details
					</div>
				</div>
			</div>
			<div
				className={method === 'physical' ? styles.selected_button : styles.button}
				role="presentation"
				onClick={() => setMethod('physical')}
			>
				<div>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/Vector_(1).png"
						alt="physical"
						width={19}
						height={18}
					/>
				</div>
				<div className={styles.description}>
					<div className={styles.heading}>
						Physical Signature
					</div>
					<div className={styles.sub_heading}>
						Upload a signed copy of the agreement
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignatoryMethod;
