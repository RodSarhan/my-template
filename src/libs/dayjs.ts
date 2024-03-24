import RelativeTime from 'dayjs/plugin/relativeTime';
import UTC from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import dayjs from 'dayjs';

dayjs.extend(RelativeTime);
dayjs.extend(duration);
dayjs.extend(UTC);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
