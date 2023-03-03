import { Button } from '@cogoport/components';
import { IcAIdea } from '@cogoport/icons-react';
import { useEffect } from 'react';

import Input from '../../../../common/controller/inputController';
import SelectController from '../../../../common/controller/selectController';
import getControls from '../../../../configurations/cardfilter';
import { COUNTRY_IDS } from '../../../../configurations/countryId';
import styles from '../styles.module.css';

import { useForm } from '@/packages/forms';

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchCountry]);
	const field = getControls({ countryOptions });
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={`${styles.filter_container}`}>
				<div className={`${styles.fields_container}`}>
					<SelectController key={watchCountry} {...field[0]} control={control} size="lg" />
					<SelectController {...field[1]} control={control} size="lg" />
					<div>
						<Input
							{...field[2]}
							control={control}
							size="md"
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

export default BaseFilters;
