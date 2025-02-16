import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from 'components/core/Card';
import Grid from 'components/core/Grid';
import Typography from 'components/core/Typography';
import Stack from 'components/core/Stack';
import Button from 'components/core/Button';

import PreferenceDisplay from '../Preference/PreferenceDisplay';

import squadActions from 'actions/squadActions';

const SquadCard = ({ squad }) => {
    const dispatch = useDispatch();
    const profile = useSelector(({ profile }) => profile.me);

    const joinSquad = async () => {
        dispatch(squadActions.joinSquad(profile.id, squad.id));
    }

    const squadMemberCard = (memberSlot) => {
        const memberGamerTag = squad.get(memberSlot)?.get('gamerTag');
        return (
            <Card sx={{ background: 'black', p: 1}}>
                {memberGamerTag ? (
                    <Typography variant="body1" align="center">
                        {memberGamerTag}
                    </Typography>
                ) : (
                    <Typography variant="body2" align="center">
                        OPEN
                    </Typography>
                )}
            </Card>
        )
    }

    return (
        <Card sx={{ background: 'rgba(0, 0, 0, 0.5)' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            {squadMemberCard('host')}
                        </Grid>
                        <Grid item xs={6}>
                            {squadMemberCard('guestOne')}
                        </Grid>
                        <Grid item xs={6}>
                            {squadMemberCard('guestTwo')}
                        </Grid>
                        <Grid item xs={6}>
                            {squadMemberCard('guestThree')}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={{ xs: 1, md: 10 }} justifyContent="center" sx={{ height: '100%' }}>
                        <PreferenceDisplay preference={squad.get('preference')} />
                        <Button onClick={joinSquad}>Join Squad</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    )
}

export default SquadCard;