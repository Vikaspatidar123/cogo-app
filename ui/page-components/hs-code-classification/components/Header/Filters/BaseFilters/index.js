import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import getControls from '../../../../configurations/cardfilter';
import styles from '../styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function BaseFilters({
	refetch,
	refetchSearch,
	loading,
	resetDrillDownHandler,
	setSearchTag,
}) {
	const { t } = useTranslation(['common', 'hsClassification']);

	const { field, defaultValues } = getControls({ t });

	const {
		handleSubmit,
		watch,
		reset,
		setValue,
		formState: { errors },
		control,
	} = useForm({ defaultValues });

	const watchCountry = watch('country');

	console.log('sdusdjijsdij', watch());

	const onSubmit = (data) => {
		refetchSearch(data);
		resetDrillDownHandler();
		setSearchTag(data?.searchTerm);
	};

	const clearFilterHandler = async () => {
		reset();
		refetch(watchCountry);
		if (watchCountry !== GLOBAL_CONSTANTS.hs_code_country_ids.IN) {
			setValue('country', GLOBAL_CONSTANTS.hs_code_country_ids.IN);
		}
		setSearchTag('');
	};

	useEffect(() => {
		refetch(watchCountry);
		resetDrillDownHandler();
	}, [watchCountry, refetch, resetDrillDownHandler]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={`${styles.filter_container}`}>
				<div className={`${styles.fields_container}`}>

					{field.map((config) => {
						const { name, type, className } = config;
						const Element = getField(type);
						return (
							<div key={name}>
								<Element {...config} control={control} className={styles?.[className]} />
								{errors?.[name] ? (
									<p className={styles.error_message}>
										{errors[name]?.type}
									</p>
								) : null}
							</div>
						);
					})}

				</div>

				<div className={`${styles.button_container}`}>
					<Button
						themeType="secondary"
						className="secondary sm"
						type="button"
						disabled={loading}
						onClick={() => clearFilterHandler()}
					>
						{t('hsClassification:hs_code_classification_clear_search_button_label')}
					</Button>
					<div>
						<Button
							size="md"
							themeType="accent"
							className="primary md"
							type="submit"
							disabled={loading}
						>
							{t('hsClassification:hs_code_classification_search_button_label')}
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default BaseFilters;
