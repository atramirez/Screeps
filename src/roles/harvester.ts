module.exports = {

    run: function(creep) {

        var currentlyWorking = creep.memory.working;

        //check if the creep is working and if it has room for more energy, if it does it set false, if it is full it will set true
        if (currentlyWorking && creep.carry.energy === 0) {
            creep.memory.working = false;
        } else if (!currentlyWorking && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }
        
        //checks if the creep is not working
        if(!currentlyWorking) {

            //this finds the closest source
            var energySource = creep.pos.findClosestByPath(FIND_SOURCES);

            //if the energy harvest is not in range, it will move to the closest source
            if (creep.harvest(energySource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(energySource);
            }
            //this will if working deposit energy to the spawn, if it is too far it will move to it (the cood in this elif is the issue currently)
        } else if (currentlyWorking) {

                var spawnTarget = creep.room.find(FIND_MY_SPAWNS);

                if (spawnTarget.length > 0) {

                    if (creep.transfer(spawnTarget[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(spawnTarget[0]);
                    }
                }
            }

        }
  
    }