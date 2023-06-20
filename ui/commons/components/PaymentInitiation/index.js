/* eslint-disable no-promise-executor-return */
import { loadScript } from '../../utils';

const CHARGEBEE_JS_URL = 'https://js.chargebee.com/v2/chargebee.js';

async function paymentGateway(data, setButtonLoading) {
	const { gateway = '' } = data || {};
	const environment = process.env.NEXT_PUBLIC_APP_BASE_URL !== 'https://api.cogoport.com';
	const key = environment ? 'uat' : 'pay';
	switch (gateway) {
		case 'RAZORPAY':
			window.open(data?.url, '_self', '');
			setButtonLoading(false);
			break;
		case 'CHARGEBEE':
			{
				await loadScript(CHARGEBEE_JS_URL);
				// eslint-disable-next-line no-undef
				const chargebeeInstance = Chargebee.init({
					site: process.env.CHARGEBEE_SITE,
				});
				chargebeeInstance.openCheckout({
					hostedPage: () => new Promise((res) => res(data)),
				});
			}
			break;
		case 'STRIPE':
			window.open(data?.url, '_self', '');
			break;
		case 'BILL_DESK':
			Promise.all([
				loadScript(
					`https://${key}.billdesk.com/jssdk/v1/dist/billdesksdk/billdesksdk.esm.js`,
				),
				loadScript(
					`https://${key}.billdesk.com/jssdk/v1/dist/billdesksdk.js`,
				),
			])
				.then(() => {
					setTimeout(() => {
						window.loadBillDeskSdk(data?.billDeskConfig);
						setButtonLoading(false);
					}, 3000);
				})
				.catch((error) => {
					console.log(error);
				});
			break;
		default:
	}
}

async function paymentInititation({
	data = {},
	setModal = () => { },
	setButtonLoading = () => { },
}) {
	const gateway = data?.gateway || '';
	if (['CHECKOUT'].includes(gateway)) {
		await loadScript('https://cdn.checkout.com/js/framesv2.min.js');
		setModal(() => ({
			[`${gateway?.toLowerCase()}Modal`]: true,
		}));
	} else {
		await paymentGateway(data, setButtonLoading);
	}
	return null;
}

export default paymentInititation;
