/* eslint-disable react-hooks/rules-of-hooks */
import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import SavePocDetailsForm from './SavePocDetailsForm';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[editPoc]
 * @property {function} [setEditPoc]
 * @property {function} [getAddressesList]
 */
function SavePocDetailsModal(props) {
	const { editPoc, setEditPoc } = props;

	const show = !isEmpty(editPoc);
	if (!show) {
		return null;
	}

	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	return (
		<Modal
			show={show}
			onClose={() => setEditPoc({})}
			position={isMobile ? 'bottom' : ''}
			fullscreen={isMobile}
			className={`primary ${isMobile ? '' : 'xl'}`}
			styles={{
				dialog: {
					...(!isMobile && { width: '700px' }),
					height        : !isMobile && '500px',
					paddingBottom : 0,
					position      : !isMobile && 'relative',
				},
			}}
			onOuterClick={() => setEditPoc({})}
		>
			<div className={styles.modal_content}>
				<div className={styles.title}>
					countDetails.tabOptions.tradeParty.addressList.pocL
				</div>

				<SavePocDetailsForm {...props} />
			</div>
		</Modal>
	);
}

export default SavePocDetailsModal;
