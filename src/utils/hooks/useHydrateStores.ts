import {useEffect, useState} from 'react';
import {isWeb} from '~utils/constants/app-constants';
import {useGeneralStore} from '~global/GlobalStores/general-store';
import {useUserStore} from '~global/GlobalStores/user-store';
import {rehydrateAndSubRQCache} from '~libs/query-client';

export const useHydrateStores = () => {
    const [isHydrated, setIsHydrated] = useState(isWeb ? false : true);
    useEffect(() => {
        const rehydrateStores = async () => {
            const hydrateUserStore = await useUserStore.persist.rehydrate();
            const hydrateGeneralStore = await useGeneralStore.persist.rehydrate();
            const [unsub, rqHydratePromise] = rehydrateAndSubRQCache();
            await rqHydratePromise;
        };
        if (isWeb) {
            rehydrateStores().then(() => {
                setIsHydrated(true);
            });
        }
    }, []);
    return isHydrated;
};
