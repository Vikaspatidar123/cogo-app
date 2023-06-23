import styles from './styles.module.css';

function RenderTags({ tagData }) {
	return (
		<div className={styles.container}>
			{(tagData || []).map((item) => <div className={styles.styled_tag}>{item?.valueText}</div>)}
		</div>
	);
}

export default RenderTags;
