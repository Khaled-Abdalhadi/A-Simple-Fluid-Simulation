//This class contains methods for collision and denisty relaxation constraints
//Algorithms are from paper "Particle-based Viscoelastic Fluid Simulation by Simon Calvet" 
import { Vector2 } from 'three';


class Particle {
    constructor(position) {
      this.position = position;
      this.prevPosition = position.clone();
      this.velocity = new Vector2(); 
      this.GRAVITY = new Vector2(0, -0.1);
      this.VELOCITY_DAMPING = 0.99;
      this.color = "#5786F5";

          //vescosity params
      this.SIGMA = 100;
      this.BETA = 100;
    }

    //applies gravity force to each particle
    applyGravity(dt) {
      this.velocity.add(this.GRAVITY.clone().multiplyScalar(dt));
    }

  
    //moves the particle after applying gravity
    predictPosition(dt) {
      //save previous position
      this.prevPosition = this.position.clone();
      let positionDelta = this.velocity.clone().multiplyScalar(dt * this.VELOCITY_DAMPING);
      this.position.add(positionDelta);
    }
  
    //calculate the box-particle collision constraint
    boxCollision(viewportWidth, viewportHeight) {
      const minX = -viewportWidth / 2;
      const maxX = viewportWidth / 2;
      const minY = -viewportHeight / 2;
      const maxY = viewportHeight / 2;
   
      //apply constraint to position in x direction
      if(this.position.x < minX) {
        this.position.x = minX;
        this.prevPosition.x = minX;
      }
  
      if(this.position.x > maxX) {
        this.position.x = maxX;
        this.prevPosition.x = maxX;
      }
  
      //apply constraint to position in y direction
      if(this.position.y < minY) {
        this.position.y = minY;
        this.prevPosition.y = minY;
      }
  
      if(this.position.y > maxY) {
        this.position.y = maxY;
        this.prevPosition.y = maxY;
      }
    }
  
    //apply density constraint
    doubleDensityRelaxtion(dt, neighbours, params) {
      let density = 0;
      let densityNear = 0;
  
      const rij = new Vector2();
  
      //for each neighbour
      for(let j = 0; j < neighbours.length; j++) {
        let particleB = neighbours[j];
        
        //direction to neighbour particle
        rij.copy(particleB.position).sub(this.position);
        let q = rij.length() / params.INTERACTION_RADIUS
  
        if(q < 1.0) {
          density += Math.pow(1 - q, 2);
          densityNear += Math.pow(1 - q, 3);
        }
      }
  
      let pressure = params.K * (density - params.REST_DENSITY);
      let pressureNear = params.K_NEAR * densityNear;
  
       const particleDisplacement = new Vector2();
       const D = new Vector2();
  
      for(let j = 0; j < neighbours.length; j++) {
        let particleB = neighbours[j];
        rij.copy(particleB.position).sub(this.position);
  
        const dist = rij.length();
        let q = dist / params.INTERACTION_RADIUS;
  
        if(q < 1.0) {
          rij.normalize();
          let displacementTerm = Math.pow(dt, 2) * (pressure *(1-q) + pressureNear * Math.pow(1-q, 2));
          D.copy(rij).multiplyScalar(displacementTerm);
  
         
          particleB.position.add(D.clone().multiplyScalar(0.5))
          particleDisplacement.sub(D.clone().multiplyScalar(0.5))
        }
      }
  
      this.position.add(particleDisplacement);
  
    }
  
      //compute next velocity
      nextVelocity(delta) {
  
        if(delta < 1e-6) return // avoid division by small delta --> avoid NaN
  
        this.velocity.copy(this.position).sub(this.prevPosition).multiplyScalar(1/ delta); 
     }
  }

  export default Particle;