import { Collapse } from '@cogoport/components';
import { useState } from 'react';

import { checkFileList } from '../../constants/checkFileList';

import InnerForm from './InnerForm';
import styles from './styles.module.css';
import Title from './Title/index';

export default function ServiceUploadDocument() {
	const [activeCollapse, setActiveCollapse] = useState('');

	const options = checkFileList.map((value, index) => ({
		key   : index.toString(),
		title : <Title
			finalList={value?.finalList}
			type={value?.type}
			sampleLink={value?.sampleLink}
			activeCollapse={activeCollapse}
			setActiveCollapse={setActiveCollapse}

		/>,
		children: <InnerForm />,

	}));
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Upload Service XYZ Documents</div>
			<div
				className={styles.list}
			>
				<Collapse
					panels={options}
					activeKey={activeCollapse}
					setActive={(v) => {
						setActiveCollapse(v);
					}}
					type="text"
					className={styles.collapse_component}
				/>
			</div>
		</div>
	);
}
