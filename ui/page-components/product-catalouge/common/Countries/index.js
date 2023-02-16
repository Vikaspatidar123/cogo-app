import { useEffect } from 'react';

import getControls from './controls';
import { Div, Form } from './style';
import styles from './styles.module.css';

import useForm from '@/packages/forms';
import ControlledSelect from '@/packages/forms/Controlled/SelectController';

function GetCountriesFilter({ setCountryforHsCode, setSelectedCountry }) {
	const controls = getControls({ setSelectedCountry });
	const { fields, watch } = useForm(controls);

	const watchCountry = watch('country');
	useEffect(() => {
		setCountryforHsCode(watchCountry);
	}, [watchCountry]);

	return (
		<div className="cardFilter">
			<form className={styles.Form}>
				<div className={styles.Div}>
					<ControlledSelect key={watchCountry} {...fields.country} size="md" />
				</div>
			</form>
		</div>
	);
}

export default GetCountriesFilter;
