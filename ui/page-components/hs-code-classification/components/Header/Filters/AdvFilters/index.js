import { Button } from '@cogoport/components';
import { IcAIdea } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import getControls from '../../../../configurations/advFilter';
import styles from '../styles.module.css';

import { SelectController, useForm, InputController } from '@/packages/forms';
import COUNTRY_IDS from '@/ui/commons/constants/globals';

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
		if (country !== COUNTRY_IDS.IN) {
			setValue('country', COUNTRY_IDS.IN);
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
					<SelectController {...field[0]} control={control} style={{ width: '150px' }} />
					<SelectController {...field[1]} control={control} style={{ width: '150px' }} />
					<div>
						<InputController
							{...field[2]}
							style={{ width: '250px' }}
							control={control}
							prefix={<IcAIdea width={20} height={20} />}
						/>
						{errors.searchTerm && (
							<div className={styles.error_message}>
								{errors.searchTerm.type}
							</div>
						)}
					</div>
					<SelectController {...field[3]} control={control} style={{ width: '150px' }} />
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
