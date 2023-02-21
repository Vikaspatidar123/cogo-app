import getPocControls from '../configurations/controls.js';

export const getControls = ({ values, t = () => {} }) => {
	const newValues = values || {};

	const controls = getPocControls({ t });

	return controls.map((control) => {
		const { name } = control;

		let value = newValues[name] || '';

		if (name === 'mobile_number') {
			const { mobile_country_code, mobile_number } = newValues;

			value = {
				mobile_country_code,
				mobile_number,
			};
		}

		return { ...control, value };
	});
};
