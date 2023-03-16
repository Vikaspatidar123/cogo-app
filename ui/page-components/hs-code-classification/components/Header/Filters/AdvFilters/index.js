import { Button, Input } from '@cogoport/components';
import { IcAIdea } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import getControls from '../../../../configurations/advFilter';
import { COUNTRY_IDS } from '../../../../configurations/countryId';
import styles from '../styles.module.css';

import { SelectController, useForm } from '@/packages/forms';

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
		setValues,
		formState: { errors },
		control,
	} = useForm();
	const onSubmit = (data) => {
		refetchSearch(data);
		resetDrillDownHandler();
		setSearchTag(data?.searchTerm);
	};
	const { country = '' } = watch();
	const clearFilterHandler = () => {
		const resetValue = {
			country    : COUNTRY_IDS.IN,
			searchBy   : '',
			searchTerm : '',
			filterBy   : '',
		};

		setValues(resetValue);
		refetch(country);
		setSearchTag('');
	};
	const field = getControls({ countryOptions });
	useEffect(() => {
		refetch(country);
		resetDrillDownHandler();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [country]);
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.filter_container}>
				<div className={styles.fields_container}>
					<SelectController {...field[0]} size="lg" control={control} />
					<SelectController {...field[1]} size="lg" control={control} />
					<div>
						<Input
							{...field[2]}
							size="md"
							control={control}
							prefix={<IcAIdea width={20} height={20} />}
						/>
						{errors.searchTerm && (
							<div className={styles.error_message}>
								{errors.searchTerm.type}
							</div>
						)}
					</div>
					<SelectController {...field[3]} control={control} size="lg" />
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
						<Button size="md" themeType="accent" className="primary md" type="submit" disabled={loading}>
							Search
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default AdvFilters;
