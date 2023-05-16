import { Button } from '@cogoport/components';
import { IcAIdea } from '@cogoport/icons-react';
import { useEffect } from 'react';

import getControls from '../../../../configurations/cardfilter';
import styles from '../styles.module.css';

import { SelectController, useForm, InputController, AsyncSelectController } from '@/packages/forms';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function BaseFilters({
	refetch,
	refetchSearch,
	loading,
	resetDrillDownHandler,
	setSearchTag,
	countryOptions,
}) {
	const {
		handleSubmit,
		watch,
		reset,
		setValue,
		formState: { errors },
		control,
	} = useForm();

	const watchCountry = watch('country');
	const onSubmit = (data) => {
		refetchSearch(data);
		resetDrillDownHandler();
		setSearchTag(data?.searchTerm);
	};

	const clearFilterHandler = async () => {
		reset();
		refetch(watchCountry);
		if (watchCountry !== GLOBAL_CONSTANTS.COUNTRY_IDS.IN) {
			setValue('country', GLOBAL_CONSTANTS.COUNTRY_IDS.IN);
		}
		setSearchTag('');
	};

	useEffect(() => {
		refetch(watchCountry);
		resetDrillDownHandler();
	}, [watchCountry, refetch, resetDrillDownHandler]);

	const field = getControls({ countryOptions });
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={`${styles.filter_container}`}>
				<div className={`${styles.fields_container}`}>
					<AsyncSelectController
						{...field[0]}
						control={control}
						className={styles.select}
					/>
					<SelectController
						{...field[1]}
						control={control}
						className={styles.select}
					/>
					<div>
						<InputController
							{...field[2]}
							control={control}
							className={styles.input_select}
							prefix={<IcAIdea width={20} height={20} />}
						/>
						{errors.searchTerm && (
							<div className={`${styles.errorMessage}`}>
								{errors.searchTerm.type}
							</div>
						)}
					</div>
				</div>

				<div className={`${styles.button_container}`}>
					<Button
						themeType="secondary"
						className="secondary sm"
						type="button"
						disabled={loading}
						onClick={() => {
                        	clearFilterHandler();
						}}
					>
						Clear Filter
					</Button>
					<div>
						<Button
							size="md"
							themeType="accent"
							className="primary md"
							type="submit"
							disabled={loading}
						>
							Search
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default BaseFilters;
