import { get } from '@cogoport/utils';

import UploadIconSvg from '../../../icons/doc-attach-icon.svg';
import getConfig from '../configurations/controls';

import patterns from '@/ui/commons/configurations/patterns';

const translationKey =	'profile:accountDetails.tabOptions.tradeParty.tradePartner.tradePartnerItem.additionalDetails.documents.otherDocuments.otherDocumentsForm.';

const getConfigControls = ({ t = () => {} }) => {
	const configControls = getConfig({ t });

	const controls = (configControls || []).map((control) => {
		if (control.type === 'file') {
			return {
				...control,
				uploadIcon: () => <UploadIconSvg width={24} height={24} />,
			};
		}

		if (control.name === 'pan') {
			return {
				...control,
				rules: {
					...(control.rules || {}),
					pattern: {
						value   : patterns.PAN_NUMBER,
						message : t(`${translationKey}controls.pan.rules.pattern.message`),
					},
				},
			};
		}

		return control;
	});

	return controls;
};

export const getControls = ({ values, t = () => {} }) => {
	const controls = getConfigControls({ t });

	return controls.map((control) => {
		const { name } = control;

		let value = get(values, name);

		if (['pan', 'iec', 'iata', 'wca'].includes(name)) {
			value = get(values, 'data.identity_number');
		}

		return { ...control, value };
	});
};
