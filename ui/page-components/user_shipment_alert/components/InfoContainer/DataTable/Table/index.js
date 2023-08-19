import Body from './Body';
import Header from './Header';
import InviteTeam from './InviteTeam';

const data = [{
	title  : '2 Ongoing FCL Shipments',
	header : ['shipment_id', 'quantity', 'origin_port', 'destination_port', 'current_status'],
	data   : [{ shipment_id: '12', quantity: 'wdwee', origin_port: 'origin_port' },
		{ shipment_id: '12', quantity: 'wdwee' }],
},
{
	title  : '1 Ongoing LCL Shipment',
	header : ['shipment_id', 'quantity', 'origin_port', 'destination_port', 'current_status'],
	data   : [{ shipment_id: '12', quantity: 'wdwee' }, { shipment_id: '12', quantity: 'wdwee' }],
}];
function Table({ setShow, showTitleType }) {
	return (
		<div>
			{data.map((item) => (
				<div>
					<Header item={item} />
					<Body item={item} />

				</div>
			))}
			<InviteTeam setShow={setShow} showTitleType={showTitleType} />
		</div>
	);
}
export default Table;
