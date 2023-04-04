import { Button } from '@cogoport/components';
import { IcAIdea } from '@cogoport/icons-react';
import { useEffect } from 'react';

import getControls from '../../../../configurations/cardfilter';
import styles from '../styles.module.css';

import { SelectController, useForm, InputController } from '@/packages/forms';
import COUNTRY_IDS from '@/ui/commons/constants/globals';

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
		if (watchCountry !== COUNTRY_IDS.IN) {
			setValue('country', COUNTRY_IDS.IN);
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
					<SelectController key={watchCountry} {...field[0]} control={control} style={{ width: '150px' }} />
					<SelectController {...field[1]} control={control} style={{ width: '150px' }} />
					<div>
						<InputController
							{...field[2]}
							control={control}
							style={{ width: '250px' }}
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
						<Button size="md" themeType="accent" className="primary md" type="submit" disabled={loading}>
							Search
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default BaseFilters;
