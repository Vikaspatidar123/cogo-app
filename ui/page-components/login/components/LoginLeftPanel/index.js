import styles from './styles.module.css';
// import Support from '@/commons/components/Support';

function LoginLeftPanel() {
	return (
		<div className={styles.container}>
			<div className={styles.descriptions}>
				<div>
					<div>
						Login
					</div>
					{' '}
					<div>
						to the
					</div>
					<div>
						Cogoport App Platform!
					</div>
				</div>

				<div>
					Deliver value to your customers
				</div>
			</div>

			{/* <SupportContainer>
				<Support />
			</SupportContainer> */}
		</div>
	);
}

export default LoginLeftPanel;
