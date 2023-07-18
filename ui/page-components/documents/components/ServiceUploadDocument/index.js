import { Collapse, Placeholder } from '@cogoport/components';
import { useState } from 'react';

import { checkFileList } from '../../constants/checkFileList';

import InnerForm from './InnerForm';
import styles from './styles.module.css';
import Title from './Title/index';

function ServiceUploadDocument({ data = [], loading = false, addDocument = () => {}, addDocumentLoading = false }) {
	const [activeCollapse, setActiveCollapse] = useState('');

	const options = checkFileList.map((value, index) => ({
		key      : index.toString(),
		title    : <Title doc_data={value} data={data} />,
		children : <InnerForm
			setActiveCollapse={setActiveCollapse}
			addDocument={addDocument}
			addDocumentLoading={addDocumentLoading}
		/>,
	}));

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Upload Service Documents
			</div>

			{loading ? (
				<div className={styles.skeleton_container}>
					<Placeholder width="100%" height="30px" className="skeleton" style={{ marginBottom: '16px' }} />
					<Placeholder width="100%" height="30px" className="skeleton" style={{ marginBottom: '16px' }} />
					<Placeholder width="100%" height="30px" className="skeleton" style={{ marginBottom: '16px' }} />
					<Placeholder width="100%" height="30px" className="skeleton" style={{ marginBottom: '16px' }} />
					<Placeholder width="100%" height="30px" className="skeleton" style={{ marginBottom: '16px' }} />
				</div>
			) : (
				<div className={styles.list}>
					<Collapse
						panels={options}
						activeKey={activeCollapse}
						setActive={(v) => setActiveCollapse(v)}
						type="text"
						className={styles.collapse_component}
					/>
				</div>
			)}
		</div>
	);
}

export default ServiceUploadDocument;
