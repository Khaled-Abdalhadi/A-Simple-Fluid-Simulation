//Grid class for neighbour search algorithms.
// optimizes the calculations of physics for each particle

class FluidHashGrid {

    constructor(cellSize) {
        this.cellSize = cellSize;
        this.hashMap = new Map();
        this.hashMapSize = 20000
        this.prime1 = 73856093;
        this.prime2 = 19349663;
        this.particles = [];
    }

    intialize(particles) {
        this.particles = particles;
    }

    clearGrid() {
        this.hashMap.clear();
    }

    getGridHashFromPos(pos) {
        let x = Math.floor(pos.x / this.cellSize);
        let y = Math.floor(pos.y / this.cellSize);

        return this.cellIndexToHash(x, y);
    }

    cellIndexToHash(x, y) {
        let hash = (x * this.prime1 ^ y * this.prime2) % this.hashMapSize;

        return hash;
    }

    getNeighbourOfParticleIdx(i) {
        let neighbours = [];
        let pos = this.particles[i].position;
        let particleGridX = Math.floor(pos.x / this.cellSize);
        let particleGridY = Math.floor(pos.y / this.cellSize);    
        
        for(let x = -1; x <= 1; x++) {
            for(let y = -1; y <= 1; y++) {
                let gridX = particleGridX + x;
                let gridY = particleGridY + y;

                let hashId = this.cellIndexToHash(gridX, gridY);
                let content = this.getContentOffCell(hashId);

                neighbours.push(...content);
            }
        }

        return neighbours;
    }

    mapParticleToCell() {
        this.particles.forEach(particle => {
           
            let pos = particle.position;
            let hash = this.getGridHashFromPos(pos);
            let entries = this.hashMap.get(hash);
            if(entries == null) {
                let newArray = [particle];
                this.hashMap.set(hash, newArray);
            } else {
                entries.push(particle);
            }

        })
    }

    getContentOffCell(id) {
        let content = this.hashMap.get(id);

        if(content == null) {
            return [];
        } else {
            return content;
        }
    }
}

export default FluidHashGrid