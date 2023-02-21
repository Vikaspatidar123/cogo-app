import { get } from '@cogoport/utils';

import UploadIconSvg from '../../../icons/doc-attach-icon.svg';
import getConfig from '../configurations/controls';

export const getControls = ({ values, t = () => {} }) => {
	const configControls = getConfig({ t });

	const controls = configControls.map((control) => {
		if (control.type === 'file') {
			return {
				...control,
				uploadIcon: () => <UploadIconSvg width={24} height={24} />,
			};
		}

		return control;
	});

	return controls.map((control) => {
		const { name } = control;

		let value = get(values, `data[${name}]`);

		if (name === 'image_url') {
			value = get(values, name);
		}

		return {
			...control,
			value,
		};
	});
};
