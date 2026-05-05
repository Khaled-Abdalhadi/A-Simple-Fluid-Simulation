
import { useMemo, useRef } from "react";
import { useFrame, useThree} from "@react-three/fiber";

const ParticleGeometry = ({particles, fluidGrid, simulationParamsRef}) => {

    const points = useRef();

    //get canvas boundary positions
    const {viewport} = useThree();
 

    // Generate our positions attributes array
    const particlesPosition = useMemo(() => {
      const positions = new Float32Array(particles.length * 2);

      for(let i=0; i < particles.length; i++) {
        const particlePos = particles[i].position;
        positions.set([particlePos.x, particlePos.y], i * 2);
      }
      // fill the array with particles positions here
      return positions;

    }, [particles.length]);


    //update particle state for each frame of the simulation
    useFrame((state, delta) => {

      const params = simulationParamsRef.current;
  
      if(!params) return;
      
      //apply physical constraints to particles
      particles.forEach(particle => {
        particle.applyGravity(delta);
        particle.predictPosition(delta);
      })

      //clear and map new particle pos to grid
      fluidGrid.clearGrid();
      fluidGrid.mapParticleToCell();

      //neighbour query
      for(let i=0; i < particles.length; i++) {
        let neighbours = fluidGrid.getNeighbourOfParticleIdx(i);
        
        //apply density constraint
        particles[i].doubleDensityRelaxtion(delta, neighbours, params);

        //

        //apply collision constraint
        particles[i].boxCollision(viewport.width, viewport.height)
      }

      particles.forEach(particle => {
        particle.nextVelocity(delta);
  
      })

      //update particles array with new positions
      for(let i =0; i < particles.length; i++) {
        const i2 = i * 2;

        points.current.geometry.attributes.position.array[i2] = particles[i].position.x;
        points.current.geometry.attributes.position.array[i2 + 1] = particles[i].position.y;
      }

      points.current.geometry.attributes.position.needsUpdate = true;

    })

    if(!simulationParamsRef.current) return;


    return (
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 2}
            array={particlesPosition}
            itemSize={2}
          />
        </bufferGeometry>
        <pointsMaterial size={simulationParamsRef.current.PARTICLE_SIZE} color="#5786F5" />
      </points>
    );
  };
  
  export default ParticleGeometry;