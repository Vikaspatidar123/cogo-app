import styles from '../styles.module.css';

export const ContainerSizeMappings = [
	{
		label          : '20FT',
		length         : 5.9,
		width          : 2.35,
		height         : 2.39,
		weight         : 28130,
		volume         : 33.13735,
		dimensionsInfo : (
			<div className={styles.italic} size={6}>
				<div>Length: 5.9 m</div>
				<div>Width: 2.35 m</div>
				<div>Height: 2.39 m</div>
			</div>
		),
		weightInfo: <div className={styles.italic} size={6}>Weight: 28130 kg</div>,
	},
	{
		label          : '40FT',
		length         : 12.03,
		width          : 2.35,
		height         : 2.39,
		weight         : 28750,
		volume         : 67.566495,
		dimensionsInfo : (
			<div className={styles.italic} size={6}>
				<div>Length: 12.03 m</div>
				<div>Width: 2.35 m</div>
				<div>Height: 2.39 m</div>
			</div>
		),
		weightInfo: <div className={styles.italic}>Weight: 28750 kg</div>,
	},
	{
		label          : '40FTHC',
		// size: 40,
		length         : 12.03,
		width          : 2.35,
		height         : 2.7,
		weight         : 28600,
		volume         : 76.33035,
		dimensionsInfo : (
			<div className={styles.italic} size={6}>
				<div>Length: 12.03 m</div>
				<div>Width: 2.35 m</div>
				<div>Height: 2.7 m</div>
			</div>
		),
		weightInfo: <div className={styles.italic} size={6}>Weight: 28600 kg</div>,
	},
];
