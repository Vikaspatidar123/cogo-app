import Header from './Header';
import Table from './Table';

function DataTable({ setShow, showTitleType }) {
	return (
		<div>
			<Header setShow={setShow} showTitleType={showTitleType} />
			<Table setShow={setShow} showTitleType={showTitleType} />
		</div>
	);
}

export default DataTable;
