import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'components/core/Button';
import HoldButton from 'components/core/HoldButton';

const SquadMemberButton = ({ guestSlot, squadMember, onClick }) => {
    const classifiedProfile = useSelector(({ profile }) => profile.classified);

    if (!classifiedProfile) return null;
    const handleClick = ({key, value}) => {
        onClick({key, value});
    }

    if (squadMember === null || squadMember === undefined) {
        return (
            <Button 
                sx={{width: '100%'}}
                variant="outlined"
                onClick={() => handleClick({key: guestSlot, value: {id: classifiedProfile.id}})}
            >
                OPEN
            </Button>
        )
    } else if(squadMember?.id === classifiedProfile?.id) {
        return (
            <HoldButton 
                sx={{width: '100%'}}
                onHold={() => handleClick({key: guestSlot, value: null})}
            >
                CLASSIFIED
            </HoldButton>
        )
    } else {
        return (
            <HoldButton
                sx={{width: '100%'}}
                onHold={() => handleClick({key: guestSlot, value: null})}
            >
                {squadMember?.gamerTag}
            </HoldButton>
        )
    }
}

export default SquadMemberButton;