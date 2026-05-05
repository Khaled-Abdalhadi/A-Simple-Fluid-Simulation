import { useState, useEffect, useRef } from 'react'
import {Canvas} from '@react-three/fiber'
import FluidHashGrid from "./assets/FluidHashGrid.js"
import './App.css'
import ParticleGeometry from './assets/ParticleGeometry.jsx';
import { Vector2 } from 'three';
import {Container, Box, Button, Drawer} from "@mui/material"
import {Controls, MobileControls} from "./assets/Controls.jsx"
import Particle from "./assets/Particle.js"
import { useViewportWidth } from './assets/customHooks.jsx';

function App() {

  const width = useViewportWidth();

  console.log(width);

  const [simulationParams, setSimulationParams] = useState({
    NUMBER_OF_PARTICLES: 4000,
    K: 0.006,
    K_NEAR: 0.01,
    REST_DENSITY:  12,
    INTERACTION_RADIUS: 0.02,
    PARTICLE_SIZE: 0.014
    // add viscosity
  })

  const [openDrawer, setOpenDrawer] = useState(false);

  const simulationParamsRef = useRef(null);
  const particles = useRef([]);
  const fluidGrid = useRef(new FluidHashGrid(simulationParams.INTERACTION_RADIUS));
  const [version, setVersion] = useState(0);
  
   //set the initial positions and velocities of particles
  const initializeParticles = () => {
    
    if(particles.current.length > 0) particles.current = []; //resets initial states (for new simulation run)

    const xParticles = Math.floor(Math.sqrt(simulationParamsRef.current.NUMBER_OF_PARTICLES));
    const yParticles = Math.floor(simulationParamsRef.current.NUMBER_OF_PARTICLES / xParticles);


    const offSetBetweenParticles = 0.005;

    //move particles to center of screen
    const offSetX = (xParticles * offSetBetweenParticles) / 2;
    const offSetY = (yParticles * offSetBetweenParticles) / 2;


    for(let i = 0; i < xParticles; i++) {
      for(let j = 0; j < yParticles; j++) {
        let x = i * offSetBetweenParticles - offSetX;
        let y = j * offSetBetweenParticles - offSetY;
     
        particles.current.push(new Particle(new Vector2(x, y)))
      
      }
    }
  }

  //resets the simulation with the new simulation parameters
  const handleResetSimulation = () => {

    simulationParamsRef.current = {...simulationParams};
  
    initializeParticles();
    fluidGrid.current.intialize(particles.current);
    setVersion(prevState => prevState + 1);

    setOpenDrawer(false)

  }

  return (
    <>
    <Box sx = {{marginBottom: 10, marginTop: 10}}>
      CGAI Final Project
      <br/>
      A Simple Fluid SPH Solver
      <br/>
      <span style={{fontSize: "14px"}}>Khaled Abdalhadi</span>
    </Box>
    <Container
      sx = {{
        display: 'flex',
        justifyContent: 'space-between',
        //for mobile make it
      }}
    >
    <Canvas 
      className = "canvas"
      camera={{ position: [0, 0, 1] }}
    >
      <ParticleGeometry 
        key ={version} // on state change, destorys the component and create new one so we can have a new buffer
        particles = {particles.current} 
        fluidGrid = {fluidGrid.current} 
        simulationParamsRef = {simulationParamsRef} 
      />
    
    </Canvas>
     { width > 800 && <Box
      sx = {{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px',
        border: '1px solid'
      }}
    >
      <Controls
      simulationParams = {simulationParams} 
      setSimulationParams = {setSimulationParams}
      />
      <Button
        sx = {{
          marginTop: "40px"
        }}
        variant = "contained"
        onClick = {handleResetSimulation}
      >
        Run Simulation
      </Button>
    </Box> }
    </Container>

    {/* FOR MOBILE DIMENSIONS */}

   { width < 800 &&  <Container
      sx = {{
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center'
      }}

    >
      <Button
        variant = "contained"
        onClick={() => {setOpenDrawer(true)}}
      >
        Controls
      </Button>
      <Drawer
        anchor = "bottom"
        open = {openDrawer}
        onClose = {() => setOpenDrawer(false)}
      >
        <Container
          sx = {{
            display: 'flex',
            flexDirection:'column',
            alignItems: 'center',
            padding: '20px'
          }}
        >
          <MobileControls
            simulationParams = {simulationParams}
            setSimulationParams = {setSimulationParams}
          >
      
          </MobileControls>
          <Container
            sx = {{
              padding: '20px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
                variant = "contained"
                onClick = {handleResetSimulation}
              >
                Run Simulation
            </Button>
            </Container>
      
        </Container>
      </Drawer>
    </Container> }
    </>
  )
}

export default App
