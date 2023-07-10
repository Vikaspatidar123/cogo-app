import { useTranslation } from 'next-i18next';
const ICON_PROPS = {
	width: '24px',
	height: '24px',
	style: { marginRight: 8 },
};

const getTimeGreet = () => {
	const curHr = new Date().getHours();

	const { t } = useTranslation(['dashboard']);

	if (curHr < 12) {
		return {
			icon: (
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/sun.svg"
					alt="sun"
					height={24}
					width={24}
					{...ICON_PROPS}
				/>
			),
			message: t('dashboard:greetings_morning'),
		};
	}

	if (curHr < 16) {
		return {
			icon: (
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/sun.svg"
					alt="sun"
					height={24}
					width={24}
					{...ICON_PROPS}
				/>
			),
			message: t('dashboard:greetings_noon'),
		};
	}

	if (curHr < 19) {
		return {
			icon: (
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/sun.svg"
					alt="sun"
					height={24}
					width={24}
					{...ICON_PROPS}
				/>
			),
			message: t('dashboard:greetings_evening'),
		};
	}

	return {
		icon: (
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/moon.svg"
				alt="moon"
				height={24}
				width={24}
				{...ICON_PROPS}
			/>
		),
		message: t('dashboard:greetings_evening'),
	};
};

export default getTimeGreet;
