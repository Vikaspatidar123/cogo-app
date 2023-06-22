import { Button } from '@cogoport/components';
import { IcAIdea } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import getControls from '../../../../configurations/advFilter';
import styles from '../styles.module.css';

import { AsyncSelectController, SelectController, useForm, InputController } from '@/packages/forms';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function AdvFilters({
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
		setValue,
		formState: { errors },
		control,
	} = useForm();

	const onSubmit = (data) => {
		refetchSearch(data);
		resetDrillDownHandler();
		setSearchTag(data?.searchTerm);
	};
	const { country = '' } = watch();

	const clearFilterHandler = async () => {
		refetch(country);
		if (country !== GLOBAL_CONSTANTS.hs_code_country_ids.IN) {
			setValue('country', GLOBAL_CONSTANTS.hs_code_country_ids.IN);
			setValue('searchTerm', '');
			setValue('filterBy', '');
			setValue('searchBy', '');
		}
		setSearchTag('');
	};

	const field = getControls({ countryOptions });

	useEffect(() => {
		refetch(country);
		resetDrillDownHandler();
	}, [country, refetch, resetDrillDownHandler]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.filter_container}>
				<div className={styles.fields_container}>
					<AsyncSelectController {...field[0]} control={control} className={styles.select} />
					<SelectController {...field[1]} control={control} className={styles.select} />
					<div>
						<InputController
							{...field[2]}
							className={styles.input_select}
							control={control}
							prefix={<IcAIdea width={20} height={20} />}
						/>
						{errors.searchTerm && (
							<div className={styles.error_message}>
								{errors.searchTerm.type}
							</div>
						)}
					</div>
					<SelectController {...field[3]} control={control} className={styles.select} />
				</div>
				<div className={styles.button_container}>
					<Button
						size="md"
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

export default AdvFilters;
