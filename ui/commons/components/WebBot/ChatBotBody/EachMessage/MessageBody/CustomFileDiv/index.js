import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function CustomFileDiv({ mediaUrl = '' }) {
	const urlArray = decodeURI(mediaUrl)?.split('/');
	const fileNameFromUrl = urlArray[(urlArray?.length || 0) - 1] || '';
	const [fileName = '', extension = ''] = fileNameFromUrl.split('.') || [];

	return (
		<div
			onClick={() => {
				window.open(mediaUrl, '_blank', 'noreferrer');
			}}
			className={styles.container}
			role="presentation"
		>
			<img src={GLOBAL_CONSTANTS.image_url.document_icon} alt="document" />
			<div className={styles.name_flex}>
				<div className={styles.file_name}>{fileName}</div>
				{extension && (
					<div className={styles.extension}>
						.
						{extension}
					</div>
				)}
			</div>
		</div>
	);
}
export default CustomFileDiv;
