import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import controls from './controls';
import useCreateDunningUserInvitationNew from './hooks/useCreateDunningUserInvitationNew';
import styles from './styles.module.css';
import SuccessPage from './SuccessPage';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import getWidth from '@/ui/page-components/discover_rates/common/SearchForm/utils/getWidth';

function AddRelevantUserNew() {
	const { t } = useTranslation(['common']);

	const { handleSubmit, formState, getValues, control } = useForm();
	const { errors = {} } = formState;
	const {
		loading,
		createDunningUserInvitation,
		showSuccessPage = false,
	} = useCreateDunningUserInvitationNew();

	const onSubmit = () => {
		const values = getValues();
		createDunningUserInvitation(values);
	};

	return (
		<div>
			{showSuccessPage ? (
				<SuccessPage />
			) : (
				<div>
					<div className={styles.heading}>
						<h1>{t('common:add_user_dunning_heading')}</h1>
					</div>

					<div className={styles.layout}>
						<div>
							{(controls(t) || []).map((item) => {
								const Element = getField(item.type);
								return (
									<div className={styles.field} style={{ width: getWidth(item.span) }}>
										<div className={styles.lable}>{item.label}</div>
										<Element {...item} control={control} />
										{errors && (
											<div className={styles.errors}>
												{errors[item?.name]?.message}
											</div>
										)}
									</div>
								);
							})}
						</div>
						<div className={styles.button}>
							<Button
								type="submit"
								size="lg"
								onClick={handleSubmit(onSubmit)}
								disabled={loading}
							>
								{t('common:add_user')}
							</Button>
						</div>
					</div>

				</div>
			)}

		</div>
	);
}

export default AddRelevantUserNew;
