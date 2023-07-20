import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import useGetStartedAuthentication from '../../../hooks/useGetStartedAuthentication';

import styles from './styles.module.css';

import { InputController, useForm } from '@/packages/forms';
import CountrySelectController from '@/packages/forms/Controlled/CountrySelectController';

function DetailsForm({ setMode = () => { } }) {
	const { t } = useTranslation(['authentication']);
	const translationKey = 'authentication:getStarted';

	const { onGetStartedApi = () => {}, getStartedLoading } = useGetStartedAuthentication({ setMode });

	const { handleSubmit, formState: { errors }, control } = useForm({
		defaultValues: {
			business_name : '',
			country_id    : '',
		},
	});

	return (
		<form className={styles.form_container} onSubmit={handleSubmit(onGetStartedApi)}>

			<h2 className={styles.card_heading}>{t(`${translationKey}_title`)}</h2>

			<div className={styles.field}>
				<div className={styles.label}>{t(`${translationKey}_company_label`)}</div>
				<InputController
					control={control}
					name="business_name"
					type="text"
					placeholder={t(`${translationKey}_company_placeholder`)}
					rules={{ required: t(`${translationKey}_company_error`) }}
					mode="onBlur"
				/>
				<span className={styles.errors}>
					{errors?.business_name?.message || ' '}
				</span>
			</div>

			<div className={styles.field}>
				<div className={styles.label}>{t(`${translationKey}_country_label`)}</div>
				<CountrySelectController
					control={control}
					name="country_id"
					placeholder={t(`${translationKey}_country_placeholder`)}
					rules={{ required: t(`${translationKey}_country_error`) }}
				/>
				<span className={styles.errors}>
					{errors?.country_id?.message || ' '}
				</span>
			</div>

			<Button
				loading={getStartedLoading}
				type="submit"
				size="lg"
			>
				{t(`${translationKey}_submit_button`)}
				{' '}
				<IcMArrowRight />
			</Button>
		</form>
	);
}

export default DetailsForm;
