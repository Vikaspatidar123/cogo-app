import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import SearchResultsServiceItemFormElement from '../../../../../../../commons/FormElement';

import styles from './styles.module.css';
import useUpdateOrgTradePartyDetail from './useUpdateOrgTradePartyDetail';

import { useSelector } from '@/packages/store';

function EditPayingPartyModal(props) {
	const {
		editTradePartnerItem = {},
		setEditTradePartnerItem = () => {},
		getTradePartnerList = () => {},
	} = props;

	const showEditTpModal = !isEmpty(editTradePartnerItem);

	const {
		general: { isMobile },
	} = useSelector((state) => state);

	const { t } = useTranslation(['profile']);

	const {
		controls = [],
		showElements = {},
		onSubmit = () => {},
		loading = false,
		restFormProps = {},
	} = useUpdateOrgTradePartyDetail({
		editTradePartnerItem,
		setEditTradePartnerItem,
		getTradePartnerList,
	});

	const {
		control,
		formState: { errors = {} },
		handleSubmit = () => {},
	} = restFormProps;

	return (
		<Modal
			show={showEditTpModal}
			onClose={() => setEditTradePartnerItem({})}
			placement={isMobile ? 'bottom' : ''}
			size={isMobile ? 'fullscreen' : 'xl'}
			styles={{
				dialog: {
					...(!isMobile && { width: '700px' }),
					height        : !isMobile && '500px',
					paddingTop    : 40,
					paddingBottom : 0,
					position      : !isMobile && 'relative',
				},
			}}
			onOuterClick={() => setEditTradePartnerItem({})}
		>
			<div>
				<Modal.Header
					title={(
						<p>
							{t(
								'profile:accountDetails.tabOptions.tradeParty.tradePartner.editPayingParty.title',
							)}
						</p>
					)}
				/>

				<Modal.Body>
					<div>
						<SearchResultsServiceItemFormElement
							controls={controls}
							showElements={showElements}
							control={control}
							errors={errors}
						/>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<div className={styles.btn_align}>
						<Button
							themeType="accent"
							disabled={loading}
							onClick={handleSubmit(onSubmit)}
						>
							{t(
								'profile:accountDetails.tabOptions.tradeParty.tradePartner.editPayingParty.buttons.submit',
							)}
						</Button>
					</div>
				</Modal.Footer>
			</div>
		</Modal>
	);
}

export default EditPayingPartyModal;
