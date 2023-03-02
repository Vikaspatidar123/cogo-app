import sendListConfig from '../../../configurations/sendList';

import CardHeader from './CardHeader';
import CardRow from './CardRow';
import styles from './styles.module.css';

const list = [
	{
		quotationId    : 'd6bd3f11-f3e4-44a6-a4d4-9fe25d555071',
		quotationNo    : 'QO/2223/3717',
		totalAmount    : 4682.64,
		expiryDate     : '2023-03-12',
		documentStatus : 'DRAFTED',
		dealState      : 'OPEN',
		dealLevel      : 'QUOTATION',
		currency       : 'INR',
		buyerName      : 'RedBull',
		quotationDate  : '2023-02-25',
		isPremium      : true,
	},
	{
		quotationId    : '36fed9c8-8168-4de5-abb7-7405a762c2aa',
		quotationNo    : 'QO/2223/3716',
		totalAmount    : 4586.91,
		expiryDate     : '2023-03-12',
		documentStatus : 'DRAFTED',
		dealState      : 'OPEN',
		dealLevel      : 'QUOTATION',
		currency       : 'INR',
		buyerName      : 'RedBull',
		quotationDate  : '2023-02-25',
		isPremium      : true,
	},
	{
		quotationId    : 'b0b65076-0676-4f85-9085-54a8ad3d8641',
		quotationNo    : 'QO/2223/3715',
		totalAmount    : 128026.39,
		expiryDate     : '2023-03-12',
		documentStatus : 'SENT',
		dealState      : 'OPEN',
		dealLevel      : 'QUOTATION',
		currency       : 'INR',
		buyerName      : 'RedBull',
		quotationDate  : '2023-02-25',
		isPremium      : true,
	},
	{
		quotationId    : 'fd74c5ec-009a-4ad0-88f3-d39327befb7c',
		quotationNo    : 'QO/2223/3688',
		totalAmount    : 25760,
		expiryDate     : '2023-03-03',
		documentStatus : 'DRAFTED',
		dealState      : 'OPEN',
		dealLevel      : 'QUOTATION',
		currency       : 'INR',
		buyerName      : 'shiv',
		quotationDate  : '2023-02-16',
		isPremium      : false,
	},
	{
		quotationId    : 'b95e361c-ff81-423c-87d6-56c30b183b56',
		quotationNo    : 'QO/2223/3657',
		totalAmount    : 1379.34,
		expiryDate     : '2023-03-31',
		documentStatus : 'SENT',
		dealState      : 'OPEN',
		dealLevel      : 'QUOTATION',
		currency       : 'INR',
		buyerName      : 'shiv',
		quotationDate  : '2023-02-13',
		isPremium      : true,
	},
];
function QuoteList() {
	return (
		<div className={styles.table_container}>
			<CardHeader config={sendListConfig} />
			{(list || []).map((listItem) => (
				<CardRow key={listItem?.quotationId} data={listItem} config={sendListConfig} />
			))}
		</div>
	);
}

export default QuoteList;
