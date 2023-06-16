import { useTranslation } from 'next-i18next';

import { OPTIONS } from '../constant/options';

const styles = { padding: '10px 24px', fontSize: '14px' };
const getProductDetails = ({
	user_purchase_limit = -1,
	tncArray = [],
	redeem_steps = [],
	instructions = [],
}) => {
	const { t } = useTranslation(['cogoStore']);
	const option = user_purchase_limit === -1
		? OPTIONS
		: OPTIONS?.filter((ite) => +ite.value <= user_purchase_limit);

	const tncCollapse = [
		{
			key: '1',
			children: (
				<div style={styles}>
					{tncArray.map((tnc) => (
						<li key={tnc} style={{ listStyle: 'none', marginBottom: '12px' }}>
							{tnc}
						</li>
					))}
				</div>
			),
			title: t('cogoStore:cogostore_options_title_tnc'),
		},
		{
			key: '2',
			children: (
				<div style={styles}>
					{redeem_steps.map((steps) => (
						<li
							key={steps}
							style={{ listStyle: 'none', marginBottom: '12px' }}
							dangerouslySetInnerHTML={{ __html: steps }}
						/>
					))}
				</div>
			),
			title: t('cogoStore:cogostore_options_title_reedem_steps'),
		},
		{
			key: '3',
			children: (
				<div className={styles.tnc_text}>
					{(instructions || []).map((instruction) => (
						<li
							style={{ listStyle: 'none', marginBottom: '12px' }}
							dangerouslySetInnerHTML={{ __html: instruction }}
						/>
					))}
				</div>
			),
			title: t('cogoStore:cogostore_options_title_instruction'),
		},
	];

	return { option, tncCollapse };
};

export default getProductDetails;
