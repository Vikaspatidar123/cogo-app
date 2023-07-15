import { Button } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getFrtConfig from '../../configuration/searchFrtConfig';
import useCreateTrends from '../../hooks/useCreateTrends';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import { useRouter } from '@/packages/next';

function SearchCard() {
	const { push } = useRouter();
	const { t } = useTranslation(['frt']);

	const [errorMessage, setErrorMessage] = useState(false);

	const config = getFrtConfig({ t });

	const { submitLoading, createTrend } = useCreateTrends();

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();

	const submitForm = async (values) => {
		const { origin, destination } = values;
		if (origin === destination) {
			setErrorMessage((prev) => !prev);
			return;
		}
		const data = await createTrend(origin, destination);
		if (data == null) return;
		push(
			'/saas/freight-rate-trend/[trend_id]?isFirstVisit=true',
			`/saas/freight-rate-trend/${data.id}?isFirstVisit=true`,
		);
	};

	return (
		<div className={styles.card}>
			<div className={styles.flex}>
				<div className={styles.heading}>{t('frt:search_card_title')}</div>
			</div>

			<form className={styles.form}>
				{config.map((controlItem) => {
					const { type, name } = controlItem;
					if (type === 'anchor') {
						return <div key={type} className={styles.anchor}><IcMPortArrow height={30} width={30} /></div>;
					}
					const Element = getField(type);
					return (
						<div key={name} className={styles.styled_form_item}>
							<Element {...controlItem} control={control} />
							{errors?.[name]?.message || errors?.[name]?.type}
						</div>
					);
				})}

				<div className={styles.styled_form_item}>
					<Button
						size="lg"
						type="submit"
						onClick={handleSubmit(submitForm)}
						disabled={submitLoading}
					>
						{t('frt:search_card_btn')}
					</Button>
				</div>
			</form>
			{errorMessage && <div className={styles.error_message}>{t('frt:search_card_err')}</div>}
		</div>
	);
}

export default SearchCard;
