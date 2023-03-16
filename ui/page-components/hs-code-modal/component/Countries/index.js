/* eslint-disable react-hooks/exhaustive-deps */
import { cl } from '@cogoport/components';
import { merge } from '@cogoport/utils';
import { useEffect } from 'react';

import SelectController from '../../../../../packages/forms/Controlled/SelectController';

import getControls from './controls';
import styles from './styles.module.css';

import { useForm, asyncFieldsHsCodeCountries, useGetAsyncOptionsBf } from '@/packages/forms';

function GetCountriesFilter({ setCountryforHsCode, setSelectedCountry }) {
	const countryOptions = useGetAsyncOptionsBf(merge(asyncFieldsHsCodeCountries(), {
	}));
	const fields = getControls({ setSelectedCountry, countryOptions });
	const { watch, control } = useForm();

	const watchCountry = watch('country');
	useEffect(() => {
		setCountryforHsCode(watchCountry);
	}, [watchCountry]);

	return (
		<div className={styles.cardFilter}>
			<div className={styles.form}>
				<div className={cl`${styles.container} ${styles.country}`}>
					<SelectController key={watchCountry} {...fields[0]} control={control} />
				</div>
			</div>
		</div>
	);
}

export default GetCountriesFilter;
