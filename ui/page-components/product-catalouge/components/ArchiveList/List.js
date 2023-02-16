import { useRouter } from '@cogo/next';
import Popover from '@cogoport/front/components/admin/Popover';
import Tooltip from '@cogoport/front/components/admin/ToolTip';
import {
	IcMPaste,
	IcMArrowBack,
	//  IcMDownload
} from '@cogoport/icons-react';
import { useState } from 'react';

import List from '../../common/List';
import listConfig from '../../configurations/list';
import useProductCatalogue from '../../hooks/useProductCatalogue';
import useUnArchive from '../../hooks/useUnArchive';

import {
	Back,
	Title,
	Info,
	Icon,
	// IconButton
} from './style';
import UnArchiveModal from './UnArchivedModal';
// import useDownloadExcel from '../../hooks/useDownloadExcel';

function ArchiveList() {
	const {
		apiData = {},
		refetchProduct = () => {},
		loading = false,
		setPagination,
	} = useProductCatalogue({
		archive: true,
	});

	// const { useDownloadProduct = () => {} } = useDownloadExcel({ refetchProduct });

	const [visible, setVisible] = useState({});
	const [archive, setArchive] = useState(false);
	const [proId, setProId] = useState('');
	const { refetchUnArchive } = useUnArchive({ proId, setArchive, refetchProduct });
	const { push } = useRouter();
	const handelBack = () => {
		push('/saas/product-inventory');
	};

	const content = (id) => (
		<Info
			role="presentation"
			onClick={() => {
				setProId(id);
				setArchive(true);
				setVisible({ [id]: false });
			}}
		>
			<div
				className="text"
				role="presentation"
				onClick={() => {
					setProId(id);
				}}
			>
				<IcMPaste width={10} height={10} />
				<p>UnArchive</p>
			</div>
		</Info>
	);
	const getStatus = (id) => (
		<Popover
			placement="bottom"
			animation="shift-away"
			theme="light-border"
			content={content(id)}
			interactive
			visible={visible?.[id]}
		>
			<div>
				<Icon />
			</div>
		</Popover>
	);

	const functions = {
		renderIcon: (data) => getStatus(data.id),
	};

	return (
		<>
			<Back>
				<Tooltip theme="light-border" content="Go Back" placement="top">
					<div className="archived" role="presentation">
						<IcMArrowBack
							className="icon"
							height={30}
							width={25}
							onClick={() => handelBack()}
						/>
					</div>
				</Tooltip>

				<Title>Archive</Title>

				{/* <Tooltip theme="light-border" content="Download Archive List" placement="bottom">
					<IconButton>
						<IcMDownload
							height={27}
							width={27}
							onClick={() => useDownloadProduct(true)}
						/>
					</IconButton>
				</Tooltip> */}
			</Back>

			<List
				config={listConfig}
				data={apiData || []}
				loading={loading}
				functions={functions}
				setPagination={setPagination}
			/>
			{archive && (
				<UnArchiveModal
					archive={archive}
					setArchive={setArchive}
					refetchArchive={refetchUnArchive}
				/>
			)}
		</>
	);
}

export default ArchiveList;
