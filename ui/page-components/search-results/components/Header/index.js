import React from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from '@cogo/store';
import Sort from './Sort';
import RefreshRate from './RefreshRate';
import { Main, Section } from './styles';
import Filter from './Filter';

const CopyUrl = dynamic(() => import('./CopyUrl'), { ssr: false });

const Header = ({
	search_type = '',
	refetch = () => {},
	setSort = () => {},
	sortBy = '',
	setFilters,
	detail = {},
	state = {},
	isMobile,
}) => {
	const scope = useSelector(({ general }) => general.scope);

	return (
		<Main>
			<Section className={`${isMobile ? 'mobile' : 'web'}`}>
				{search_type === 'fcl_freight' && (
					<Filter setFilters={setFilters} state={state} isMobile={isMobile} />
				)}
				<Sort search_type={search_type} setSort={setSort} sortBy={sortBy} />

				{scope === 'partner' && (
					<RefreshRate refetch={refetch} detail={detail} />
				)}
				{scope === 'partner' && search_type ? (
					<CopyUrl detail={detail} />
				) : null}
			</Section>
		</Main>
	);
};

export default Header;
