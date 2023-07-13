import { Tabs, TabPanel } from '@cogoport/components';
import {
    IcAInternational, IcAShipAmber,
} from '@cogoport/icons-react';
import { useState } from 'react';

import AirForm from '../AirForm';
import { RecentAirSearch, RecentSeaSearch } from '../RecentSearches';
import SeaForm from '../SeaForm';

import styles from './styles.module.css';

import CreateSportSearch from '@/ui/page-components/new-dashboard/hooks/CreateSportSearch';

const MAPPING = {
    sea: SeaForm,
    air: AirForm,
};

const recentSearchMap = {
    sea: RecentSeaSearch,
    air: RecentAirSearch,
};

function RecentSearches({ type, handleRecentSearchClick, recentSearches }) {
    const RecentComp = recentSearchMap[type];

    return (
        <div className={styles.recent_searches}>
            <p className={styles.recent_searches_text}>Recent searches</p>
            <div>
                <RecentComp
                    onClick={handleRecentSearchClick}
                    arr={type === 'air' ? recentSearches?.air : recentSearches?.sea}
                />
            </div>
        </div>
    );
}
function SearchForm({ data }) {
    const [active, setActive] = useState('sea');
    const Component = MAPPING[active] || null;
    const recentSearches = { sea: data };
    const {
        fetchSearch,
        loading,
    } = CreateSportSearch();
    const props = {
        renderComponent: RecentSearches,
        recentSearches,
        fetchSearch,
        loading,
        // markers,
        // setMarkers,
        // defaultProps,
        // recaptchaRef,
        // executeCaptcha,
        // ...(
        // 	(active === 'sea') && {
        // 		portIds,
        // 		setPortIds,
        // 	}
        // ),
    };
    return (
        <div>
            <div className={styles.tab_container}>
                <Tabs
                    name="tabs"
                    className={styles.tab}
                    themeType="tertiary"
                    active={active}
                    onChange={setActive}
                >
                    <TabPanel
                        icon={<IcAShipAmber width={15} height={15} />}
                        name="sea"
                        title="sea"
                    />

                    <TabPanel
                        icon={<IcAInternational width={15} height={15} />}
                        name="air"
                        title="air"
                    />
                </Tabs>
            </div>
            <Component {...props} />
        </div>
    );
}
export default SearchForm;
