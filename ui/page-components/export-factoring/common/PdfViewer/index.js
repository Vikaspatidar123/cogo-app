import FullView from './FullView';
import styles from './styles.module.css';

function PdfViewer({ url, width = '100%', header = 'Business Address Proof' }) {
	return (
		<div
			className={styles.pdf}
			style={{
				position: 'relative',
				width,
			}}
		>
			<object data={url} type="application/pdf" height="100%" width="100%">
				<a href={url}>{header}</a>
			</object>
			<FullView
				containerStyle={{
					position : 'absolute',
					bottom   : 16,
					left     : 16,
					right    : 16,
				}}
				url={url}
			/>
		</div>
	);
}

export default PdfViewer;
