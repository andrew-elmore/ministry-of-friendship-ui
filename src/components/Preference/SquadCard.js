import React from 'react';

import Card from 'components/core/Card';
import Grid from 'components/core/Grid';
import Typography from 'components/core/Typography';
import Stack from 'components/core/Stack';
import Button from 'components/core/Button';

import PreferenceDisplay from './PreferenceDisplay';

const SquadCard = ({ squad }) => {

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
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {squadMemberCard('host')}
                        </Grid>
                        <Grid item xs={12}>
                            {squadMemberCard('guestOne')}
                        </Grid>
                        <Grid item xs={12}>
                            {squadMemberCard('guestTwo')}
                        </Grid>
                        <Grid item xs={12}>
                            {squadMemberCard('guestThree')}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={{ xs: 4, md: 10 }} justifyContent="center" sx={{ height: '100%' }}>
                        <PreferenceDisplay preference={squad.get('preference')} />
                        <Button>Join Squad</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    )
}

export default SquadCard;