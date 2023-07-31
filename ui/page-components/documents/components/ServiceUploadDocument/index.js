import { Collapse, Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import checkFileList from '../../constants/checkFileList';

import InnerForm from './InnerForm';
import styles from './styles.module.css';
import Title from './Title/index';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const isAllowedOpen = (data, value) => {
	const uploadedDoc = data?.filter((doc) => doc?.name === value?.doc_name)
		?.[GLOBAL_CONSTANTS.zeroth_index];
	return isEmpty(uploadedDoc);
};

function ServiceUploadDocument({
	serviceType = '', data = [], loading = false, addDocument = () => {}, addDocumentLoading = false,
	refetch = () => {},
}) {
	const { t } = useTranslation(['documents']);

	const [activeCollapse, setActiveCollapse] = useState('');

	const options = checkFileList(t, serviceType)?.map((value, index) => ({
		key   : index.toString(),
		title : <Title
			doc_data={value}
			data={data}
			refetch={refetch}
		/>,
		children: isAllowedOpen(data, value) ? (
			<InnerForm
				serviceType={serviceType}
				value={value}
				setActiveCollapse={setActiveCollapse}
				addDocument={addDocument}
				addDocumentLoading={addDocumentLoading}
			/>
		) : null,
	}));

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{t('documents:upload_service_doc_heading')}
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
