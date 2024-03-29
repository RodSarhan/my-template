import {useEffect, useState} from 'react';
import {isWeb} from '~utils/constants/app-constants';
import {useGeneralStore} from '~global/GlobalStores/general-store';
import {useUserStore} from '~global/GlobalStores/user-store';
import {rehydrateAndSubRQCache} from '~networking/clients/query-client';
import {initi18n} from '~localization/i18n';

// used for web only to hydrate the stores in the browser only
export const useHydrateStores = () => {
    const [isHydrated, setIsHydrated] = useState(isWeb ? false : true);
    useEffect(() => {
        const rehydrateStores = async () => {
            const hydrateUserStore = await useUserStore.persist.rehydrate();
            const hydrateGeneralStore = await useGeneralStore.persist.rehydrate();
            initi18n();
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
