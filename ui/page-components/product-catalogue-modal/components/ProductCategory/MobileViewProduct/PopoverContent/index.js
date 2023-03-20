import styles from '../styles.module.css';

const popoverContent = ({
	MAPPING, dataArr = [], setShowPopover, setDetails, iconCode, displayName,
}) => (
	<div className={styles.opt_container}>
		{(dataArr || []).map((item) => (
			<div
				className={styles.card}
				key={item?.categoryCode}
				role="presentation"
				onClick={() => {
					setDetails(item);
					setShowPopover(false);
				}}
			>
				<div className={styles.color_icon}>{MAPPING[item?.[iconCode]]}</div>
				<div className="displayName">{item?.[displayName]}</div>
			</div>
		))}
	</div>
);
export default popoverContent;
