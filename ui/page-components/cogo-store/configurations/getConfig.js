import {
	IcCCheckUserAttribute,
	IcCSetUserAttribute,
	IcMEmail,
} from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

const emailValidator = /^[^<>()[\]\\,;:%#^\s@"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;
const getConfig = () => {
	const { t } = useTranslation(['cogoStore']);

	const sendConfig = [
		{
			name: 'receipientName',
			label: `${t('cogoStore:send_gift_form_receiver_name_label')}:`,
			placeholder: t('cogoStore:send_gift_form_receiver_name_placeholder'),
			type: 'text',
			prefix: <IcCSetUserAttribute />,
			rules: { required: true },
		},
		{
			name: 'senderName',
			label: t('cogoStore:send_gift_form_sender_name_label'),
			placeholder: t('cogoStore:send_gift_form_sender_name_placeholder'),
			type: 'text',
			prefix: <IcCCheckUserAttribute />,
			rules: { required: true },
		},
		{
			name: 'email',
			label: t('cogoStore:send_gift_form_email_label'),
			placeholder: t('cogoStore:send_gift_form_email_placeholder'),
			type: 'text',
			prefix: <IcMEmail />,
			rules: {
				required: true,
				pattern: {
					value: emailValidator,
					message: t('cogoStore:send_gift_form_email_error'),
				},
			},
		},
		{
			name: 'mobile_no',
			label: t('cogoStore:send_gift_form_mobile_label'),
			placeholder: t('cogoStore:send_gift_form_mobile_placeholder'),
			type: 'mobile-number-select',
			rules: {
				required: true,
			},
		},
		{
			name: 'giftShare',
			type: 'checkbox-group',
			options: [
				{
					name: 'gift',
					value: 'gift',
					label: t('cogoStore:send_gift_form_gift_opt'),
				},
			],
		},
	];
	const options = [
		{
			name: 'whatsapp',
			value: 'whatsapp',
			label: t('cogoStore:send_gift_form_whatsapp'),
		},
		{
			name: 'email',
			value: 'email',
			label: t('cogoStore:send_gift_form_email'),
		},
	];

	return { sendConfig, options };
};

export default getConfig;
