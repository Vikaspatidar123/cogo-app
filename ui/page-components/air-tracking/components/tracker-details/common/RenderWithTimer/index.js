import ProgressCircle from './ProgressCircle';
import styles from './styles.module.css';

const altImage = 'https://prod-cogoport.s3.ap-south-1.amazonaws.com/669242b94926dee5f79e2e3401d7ed5e/og-image.jpg';
function RenderWithTimer({ quoteData, timeRemaining }) {
	return (
		<div className={styles.timer}>
			{/* <LoadingBanner style={{ width: 300, height: 'auto' }} /> */}
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/heeee.svg"
				alt="tracking"
				width="24%"
			/>
			<text size="14px" className={styles.head}>
				Retrieving Tracking Data
			</text>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
				alt=""
			/>
			<div className={styles.container_logo}>
				<img
					src={quoteData?.shipping_line_detail?.logo_url || altImage}
					alt=""
					height="32px"
				/>
				<p>{quoteData?.shipping_line_detail?.short_name || ''}</p>
			</div>

			<div className={styles.marquee}>
				<div className={styles.marquees}>
					{quoteData?.quote_data?.map((item) => (
						<span style={{ paddingRight: '80px' }}>{item}</span>
					))}
				</div>
			</div>

			<text style={{ maxWidth: 500 }}>
				{timeRemaining > 0
					? 'Usually takes around 10 seconds'
					: 'Fetching data on this cargo / shipment is taking'
								+ "longer than usual. We will inform you as soon as it's available."}
			</text>
			{timeRemaining > 0 ? (
				<div className={styles.progress_container}>
					<ProgressCircle
						radius={26}
						stroke={4}
						progress={100 - (timeRemaining / 60) * 100}
						progressColor="#C4C4C4"
						backgroundColor="#8DC2F9"
					/>
					<p className={styles.circle}>{timeRemaining}</p>
				</div>
			) : (
				<text size="14px">
					But don’t worry. Tracker once created, keeps fetching
					updates automatically. Check back in later and we might have
					the report ready for you.
				</text>
			)}
		</div>
	);
}
export default RenderWithTimer;
