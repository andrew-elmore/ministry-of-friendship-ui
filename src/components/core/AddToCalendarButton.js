import React from 'react';
import PropTypes from 'prop-types';
import { AddToCalendarButton as RootAddToCalendarButton } from 'add-to-calendar-button-react';
import { DateTime } from 'luxon';

import { Event } from 'domain';

const AddToCalendarButton = ({ event }) => {

    const dtStart = DateTime.fromISO(event?.dtStart?.iso);
    const dtEnd = DateTime.fromISO(event?.dtEnd?.iso);

    if (!dtStart.isValid || !dtEnd.isValid) {
        return null;
    }
    
    return (
        <RootAddToCalendarButton
            uid={event.id}
            name={event.summary}
            description={event.description}
            options={['Google', 'Outlook.com', 'Apple', 'iCal']}
            status={event.status}
            recurrence={event.rrule ? `RRULE:${event.rrule}` : undefined}
            location={event.address || null}
            startDate={dtStart.isValid ? dtStart.toFormat('yyyy-LL-dd') : ''}
            endDate={dtEnd.isValid ? dtEnd.toFormat('yyyy-LL-dd') : ''}
            startTime={dtStart.isValid ? dtStart.toFormat('HH:mm') : ''}
            endTime={dtEnd.isValid ? dtEnd.toFormat('HH:mm') : ''}
            timeZone={dtStart.isValid ? dtStart.zoneName : ''}
            buttonStyle="round"
            label="Add to Calendar"
            trigger="click"
            hideCheckmark={true}
            hideBranding={true}
            hideIconButton={true}
            styleLight="
                --btn-background: #0F0D3F;
                --btn-hover-background: #000000;
                --btn-border-radius: 24px;
                --btn-hover-text: #ffffff;
                --btn-text: #ffffff;
                --btn-border: none;
                --btn-hover-border: none;
                --btn-shadow: none;
                --btn-hover-shadow: none;
                --btn-active-shadow: none;
                --btn-font-weight: 400;
            "
        ></RootAddToCalendarButton>
    );
}

AddToCalendarButton.propTypes = {
    event: PropTypes.instanceOf(Event).isRequired,
};

export default AddToCalendarButton;
