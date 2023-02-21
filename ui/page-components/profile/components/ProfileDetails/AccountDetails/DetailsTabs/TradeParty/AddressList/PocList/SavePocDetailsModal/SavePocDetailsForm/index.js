import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useSavePocDetailsForm from './hooks/useSavePocDetailsForm';
import styles from './styles.module.css';

// import SearchResultsServiceItemFormElement from '@/components/Profile/commons/FormElement';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[editPoc]
 * @property {function} [setEditPoc]
 * @property {function} [getAddressesList]
 */
function SavePocDetailsForm(props) {
	const { setEditPoc } = props;

	const {
		controls, formProps, errors, onSubmit, loading,
	} =		useSavePocDetailsForm(props);
	const { handleSubmit, control } = formProps;

	const { t } = useTranslation(['profile']);

	return (
		<section>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* <SearchResultsServiceItemFormElement
					controls={controls}
					control={control}
					errors={errors}
				/> */}

				<div className={styles.btn_align}>
					<Button
						type="button"
						themeType="tertiary"
						onClick={() => setEditPoc({})}
						disabled={loading}
						style={{
							marginRight: '16px',
						}}
					>
						{t(
							'profile:accountDetails.tabOptions.tradeParty.addressList.pocList.savePocDetails.form.buttons.discard',
						)}
					</Button>

					<Button type="submit" themeType="primary" loading={loading}>
						{t(
							'profile:accountDetails.tabOptions.tradeParty.addressList.pocList.savePocDetails.form.buttons.submit',
						)}
					</Button>
				</div>
			</form>
		</section>
	);
}

export default SavePocDetailsForm;
