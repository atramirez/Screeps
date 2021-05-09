import { ErrorMapper } from "utils/ErrorMapper";

const roleHarvester = require('roles.harvester');
const roleBuilder = require('roles.builder');
const roleUpgrader = require('roles.upgrader');

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  const harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

  if (harvester.length < 3) {
    //temp spawner code
    Game.spawns.Spawn1.spawnCreep([WORK,MOVE,CARRY,MOVE], 'harvester');
  }

  for (var name in Game.creeps) {

    var creep = Game.creeps[name];

    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    } else if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    } else if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }

  }

});
