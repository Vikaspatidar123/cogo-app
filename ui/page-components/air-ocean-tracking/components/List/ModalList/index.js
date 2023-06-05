import { Modal, ButtonIcon } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';

import ArchiveDelete from './ArchiveDelete';
import Configure from './Configure';
import Share from './Share';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	archive   : ArchiveDelete,
	delete    : ArchiveDelete,
	share     : Share,
	configure : Configure,
};

const SIZE_MAPPING = {
	share     : 'lg',
	configure : 'xl',
};

const TITLE_MAPPING = {
	archive   : 'Archive Tracker',
	delete    : 'Delete Tracker',
	share     : 'Share via Email',
	configure : 'Configure',
};

function ModalList({ modalInfo, setModalInfo }) {
	const { show, name = 'archive', shipmentId = '' } = modalInfo || {};

	const Component = name ? COMPONENT_MAPPING?.[name] : <div />;
	const closeHandler = () => {
		setModalInfo({ show: false });
	};
	return (
		<Modal show={show} size={SIZE_MAPPING?.[name] || 'md'} onClose={closeHandler} closeOnOuterClick>
			<div className={styles.header}>
				<h3>{TITLE_MAPPING?.[name]}</h3>
				<ButtonIcon size="lg" icon={<IcMCross />} themeType="primary" onClick={closeHandler} />
			</div>
			<Component name={name} closeHandler={closeHandler} shipmentId={shipmentId} />
		</Modal>
	);
}

export default ModalList;
