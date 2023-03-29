import { cl } from '@cogoport/components';
import React, { useState, useCallback, forwardRef } from 'react';

import SearchForm from '../../../common/SearchForm';
import Tags from '../../../common/Tags';
import getConfiguration from '../../../hooks/configurations';

import styles from './styles.module.css';

import Air from '@/ui/commons/components/Search/Air';

function NewSearch(
	{
		extraParams = {},
		onPush = () => {},
		style = {},
		className = 'app',
		blockSearch = false,
		defaultSearchMode = '',
		loading = false,
		search_type = '',
		showHeader = true,
		listStoreQuotaAPI = {},
	},
	ref,
) {
	const isChannelPartner = false;
	const modes = getConfiguration('modes', undefined, isChannelPartner);
	const [mode, setMode] = useState(defaultSearchMode || modes[0].value);
	const setModeMemo = useCallback((modeVal) => {
		setMode(modeVal);
	}, []);
	const renderSearchForm = () => {
		if (mode === 'air_freight') {
			return <Air extraParams={extraParams} showHeader={showHeader} />;
		}

		return (
			<>
				<SearchForm
					mode={mode}
					onPush={onPush}
					extraParams={extraParams}
					className={className}
					ref={ref}
					search_type={search_type}
				/>

				{/* {blockSearch && (
					<Flex
						bgColor="rgba(255,255,255,0.8)"
						top={0}
						left={0}
						position="absolute"
						width="100%"
						height="100%"
						justifyContent="center"
						alignItems="center"
					/>
				)} */}

				{loading && (
					<div>
						<img
							style={{ height: 30 }}
							alt="cogo-logo"
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/cogo-animation.gif"
						/>
					</div>
				)}
			</>
		);
	};
	return (
		<div style={style} className={cl`${styles.container} ${styles.app}`}>
			<div className={styles.header}>
				<div className={styles.tags}>
					<div className={styles.heading}>Search Rates</div>
					<Tags
						list={modes}
						selected={mode}
						onClick={setModeMemo}
						className={className}
						showDomestic
						showContainerTransportation
					/>
				</div>
			</div>
			{renderSearchForm()}
		</div>
	);
}
export default forwardRef(NewSearch);
