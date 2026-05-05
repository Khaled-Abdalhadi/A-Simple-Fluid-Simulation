import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box'
import { Typography } from '@mui/material';

function Controls({simulationParams, setSimulationParams}) {

    return (
    <>  
        <Typography sx = {{marginBottom: '40px'}}>Controls</Typography>
        <Box sx = {{width: 300}}>
            <Typography gutterBottom>Number of Particles</Typography>
            <Slider
                size ="small"
                min ={1}
                max ={10000}
                valueLabelDisplay = "auto"
                value = {simulationParams.NUMBER_OF_PARTICLES}
                onChange = {(e, value) => {
                    setSimulationParams(prevState => ({...prevState, NUMBER_OF_PARTICLES: value}))
                }}
            
            />
        </Box>
        <Box sx = {{marginTop: '30px'}}>
            <Box sx = {{width: 300}}>
                <Typography gutterBottom>Stiffness (K)</Typography>
                <Slider
                    size ="small"
                    min ={0.001}
                    step = {0.001}
                    max ={0.01}
                    value = {simulationParams.K}
                    valueLabelDisplay = "auto"
                    onChange = {(e, value) => {
                        setSimulationParams(prevState => ({...prevState, K: value}))
                    }}
                />
            </Box>
        </Box>
        <Box sx = {{marginTop: '30px'}}>
            <Box sx = {{width: 300}}>
                <Typography gutterBottom>Rest Density (ρ0)</Typography>
                <Slider
                    size ="small"
                    min ={1}
                    max ={20}
                    value = {simulationParams.REST_DENSITY}
                    valueLabelDisplay = "auto"
                    onChange = {(e, value) => {
                        setSimulationParams(prevState => ({...prevState, REST_DENSITY: value}))
                    }}

                />
            </Box>
            
        </Box>
        <Box sx = {{marginTop: '30px'}}>
            <Box sx = {{width: 300}}>
                <Typography gutterBottom>Particle Size</Typography>
                <Slider
                    size ="small"
                    min ={0.002}
                    step = {0.002}
                    max ={0.06}
                    value = {simulationParams.PARTICLE_SIZE}
                    valueLabelDisplay = "auto"
                    onChange = {(e, value) => {
                        setSimulationParams(prevState => ({...prevState, PARTICLE_SIZE: value}))
                    }}

                />
            </Box>
            
        </Box>
    </>
    )
}

function MobileControls({simulationParams, setSimulationParams}) {
    return (
        <>
            <Box sx = {{width: 100}}>
                <Typography  sx = {{fontSize: 14, whiteSpace: 'nowrap'}}>Number of Particles</Typography>
                <Slider
                    size ="small"
                    min ={1}
                    max ={10000}
                    valueLabelDisplay = "auto"
                    value = {simulationParams.NUMBER_OF_PARTICLES}
                    onChange = {(e, value) => {
                        setSimulationParams(prevState => ({...prevState, NUMBER_OF_PARTICLES: value}))
                    }}
                />
            </Box>
            <Box sx = {{marginTop: '10px'}}>
                <Box sx = {{width: 100}}>
                    <Typography  sx = {{fontSize: 14, whiteSpace: 'nowrap'}}>Stiffness (K)</Typography>
                    <Slider
                        size ="small"
                        min ={0.001}
                        step = {0.001}
                        max ={0.01}
                        value = {simulationParams.K}
                        valueLabelDisplay = "auto"
                        onChange = {(e, value) => {
                            setSimulationParams(prevState => ({...prevState, K: value}))
                        }}
                    />
                </Box>
            </Box>
            <Box sx = {{marginTop: '10px'}}>
                <Box sx = {{width: 100}}>
                    <Typography  sx = {{fontSize: 14, whiteSpace: 'nowrap'}}>Rest Density (ρ0)</Typography>
                    <Slider
                        size ="small"
                        min ={1}
                        max ={20}
                        value = {simulationParams.REST_DENSITY}
                        valueLabelDisplay = "auto"
                        onChange = {(e, value) => {
                            setSimulationParams(prevState => ({...prevState, REST_DENSITY: value}))
                        }}

                    />
                </Box>
            </Box>
            <Box sx = {{marginTop: '10px'}}>
                <Box sx = {{width: 100}}>
                    <Typography  sx = {{fontSize: 14, whiteSpace: 'nowrap'}}>Particle Size</Typography>
                    <Slider
                        size ="small"
                        min ={0.002}
                        step = {0.002}
                        max ={0.06}
                        value = {simulationParams.PARTICLE_SIZE}
                        valueLabelDisplay = "auto"
                        onChange = {(e, value) => {
                            setSimulationParams(prevState => ({...prevState, PARTICLE_SIZE: value}))
                        }}

                    />
                </Box>
            </Box>
        </>
    )
}

export {Controls, MobileControls};