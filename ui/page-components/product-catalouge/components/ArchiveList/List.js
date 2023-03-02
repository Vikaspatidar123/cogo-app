import { Popover, Tooltip } from '@cogoport/components';
import {
	IcMPaste,
	IcMArrowBack,
	IcMOverflowDot,
} from '@cogoport/icons-react';
import { useState } from 'react';

import List from '../../common/List';
import listConfig from '../../configurations/list';
import useProductCatalogue from '../../hooks/useProductCatalogue';
import useUnArchive from '../../hooks/useUnArchive';

import styles from './styles.module.css';
import UnArchiveModal from './UnArchivedModal';

import { useRouter } from '@/packages/next';

function ArchiveList() {
	const {
		apiData = {},
		refetchProduct = () => {},
		loading = false,
		setPagination,
	} = useProductCatalogue({
		archive: true,
	});

	const [visible, setVisible] = useState({});
	const [archive, setArchive] = useState(false);
	const [proId, setProId] = useState('');
	const { refetchUnArchive } = useUnArchive({ proId, setArchive, refetchProduct });
	const { push } = useRouter();
	const handelBack = () => {
		push('/saas/product-inventory');
	};

	const content = (id) => (
		<div
			className={styles.info}
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
		</div>
	);
	const getStatus = (id) => (
		<Popover
			placement="left"
			animation="shift-away"
			render={content(id)}
			interactive
			visible={visible?.[id]}
		>
			<div>
				<IcMOverflowDot />
			</div>
		</Popover>
	);

	const functions = {
		renderIcon: (data) => getStatus(data.id),
	};

	return (
		<>
			<div className={styles.back}>
				<Tooltip content="Go Back" placement="top">
					<div className="archived" role="presentation">
						<IcMArrowBack
							className="icon"
							height={30}
							width={25}
							onClick={() => handelBack()}
						/>
					</div>
				</Tooltip>

				<div className={styles.title}>Archive</div>
			</div>

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
