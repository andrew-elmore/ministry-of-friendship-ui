import React from 'react';
import Stack from 'components/core/Stack';
import Grid from 'components/core/Grid';
import ImageComponent from 'components/core/ImageComponent';

import MicIcon from '@mui/icons-material/Mic';
import MicNoneIcon from '@mui/icons-material/MicNone';
import MicOffIcon from '@mui/icons-material/MicOff';
import PublicIcon from '@mui/icons-material/Public';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import WindowIcon from '@mui/icons-material/Window';


const difficulties = [
    { label: 'Trivial', value: 0, image: 'url(./img/Trivial.png)'},
    { label: 'Easy', value: 1, image: 'url(./img/Easy.png)'},
    { label: 'Medium', value: 2, image: 'url(./img/Medium.png)'},
    { label: 'Challenging', value: 3, image: 'url(./img/Challenging.png)'},
    { label: 'Hard', value: 4, image: 'url(./img/Hard.png)'},
    { label: 'Extreme', value: 5, image: 'url(./img/Extreme.png)'},
    { label: 'Suicide Mission', value: 6, image: 'url(./img/Suicide_Mission.png)'},
    { label: 'Impossible', value: 7, image: 'url(./img/Impossible.png)'},
    { label: 'Helldive', value: 8, image: 'url(./img/Helldive.png)'},
    { label: 'Super Helldive', value: 9, image: 'url(./img/Super_Helldive.png)'}
];


const enemies = [
    {
        label: 'Terminid',
        value: 'BUGS',
        image: 'url(./img/terminids_Icon.png)'
    },
    {
        label: 'Automaton',
        value: 'BOTS',
        image: 'url(./img/automaton_Icon.png)'
    },
    {
        label: 'Illuminate',
        value: 'SQUIDS',
        image: 'url(./img/illuminate_Icon.png)'
    }
]

const mics = [
    {
        label: 'Mic Open',
        value: 'OPEN',
        icon: <MicIcon sx={{color: 'white'}}/>
    },
    {
        label: 'Push To Talk',
        value: 'PUSH',
        icon: <MicNoneIcon sx={{color: 'white'}}/>
    },
    {
        label: 'No Mic',
        value: 'OFF',
        icon: <MicOffIcon sx={{color: 'white'}}/>
    }
]

const objectives = [
    {
        label: 'Major Order',
        value: 'MAJORORDER',
        icon: <PublicIcon sx={{color: 'white'}}/>
    },
    {
        label: 'Medals',
        value: 'MEDALS',
        icon: <MilitaryTechIcon sx={{color: 'white'}}/>
    },
    {
        label: 'Samples',
        value: 'SAMPLES',
        icon: <WindowIcon sx={{color: 'white'}}/>
    }
]

const NullComponent = ({image, ...props}) => (
    <div 
        {...props}
        style={{
            width: 20,
            height: 20,
            backgroundColor: 'black',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 20,
            border: '1px solid grey',
            ...props.style,
        }} 
    />
)

const PreferenceDisplay = ({preference}) => {
    return (
        <Grid container spacing={2} sx={{m: 2}}>
            <Grid item xs={12}>
                <Stack alignItems="center" justifyContent="center" width="100%" direction="row" spacing={1}>
                    {difficulties.map((difficulty, idx) => {

                        if (preference?.get('difficulty')?.includes(difficulty.value)) {
                            return (
                                <ImageComponent 
                                    key={`${difficulty.value}-${idx}`} 
                                    image={difficulty.image}
                                    style={{
                                        width: 35,
                                        borderRadius: 0,
                                        border: '1px solid grey',
                                    }}
                                />
                            )
                        } else {
                            return (
                                <NullComponent 
                                    key={`${difficulty.value}-${idx}`} 
                                    image={difficulty.image}
                                    style={{
                                        width: 35,
                                        borderRadius: 0,
                                    }}
                                />
                            )
                        }
                    })}
                </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
                <Stack alignItems="center" justifyContent="center" width="100%" direction="row" spacing={5}>
                    {enemies.map((enemy, idx) => {
                        if (preference?.get('enemy')?.includes(enemy.value)) {
                            return (
                                <ImageComponent 
                                    key={`${enemy.value}-${idx}`} 
                                    image={enemy.image}
                                />
                            )
                        } else {
                            return (
                                <NullComponent 
                                    key={`${enemy.value}-${idx}`} 
                                />
                            )
                        }
                    })}
                </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
                <Stack alignItems="center" justifyContent="center" width="100%" direction="row" spacing={5}>
                    {mics.map((mic, idx) => {
                        if (preference?.get('mic')?.includes(mic.value)) {
                            return (
                                <Stack alignItems="center" key={`${mic.value}-${idx}`}>
                                    {mic.icon}
                                </Stack>
                            )
                        } else {
                            return (
                                <NullComponent 
                                    key={`${mic.value}-${idx}`} 
                                />
                            )
                        }
                    })}
                </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
                <Stack alignItems="center" justifyContent="center" width="100%" direction="row" spacing={5}>
                    {objectives.map((objective, idx) => {
                        if (preference?.get('objective')?.includes(objective.value)) {
                            return (
                                <Stack alignItems="center" key={`${objective.value}-${idx}`}>
                                    {objective.icon}
                                </Stack>
                            )
                        } else {
                            return (
                                <NullComponent 
                                    key={`${objective.value}-${idx}`} 
                                />
                            )
                        }
                    })}
                </Stack>
            </Grid>
        </Grid>
    );
}

export default PreferenceDisplay;