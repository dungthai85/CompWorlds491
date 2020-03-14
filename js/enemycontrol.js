var is_castle_under_attack = false;
var is_boss_spawn = false;
function EnemyControl(game, difficulty) {
  this.game = game;
  this.ctx = game.ctx;
  this.start_time = new Date();
  this.elapsed = 1;
  this.difficulty = difficulty;
  this.spawn_lane_position = [
    [1170, 370],
    [1215, 455],
    [1275, 535]
  ];
  this.boss_spawn = true;
  this.speedincrease = 2.7;
  // this.spawn_lane_position = [[1100, 370], [1120, 455], [1130, 535]];
  this.enemy_count = 0;
  this.timecount = 0;
}

EnemyControl.prototype = new Entity();
EnemyControl.prototype.constructor = EnemyControl;

EnemyControl.prototype.update = function() {
  // Get current time
  var checkpoint_time = new Date();
  // Calculate time difference, strip the ms, and round it to the second.
  var curr_elapsed = (checkpoint_time - this.start_time) / 1000;

  // test to change the speed of the spawn
  if (Math.floor(curr_elapsed) % 6 === 0) {
    this.timecount++;
    if ((this.speedincrease > 1.5 && this.timecount === 40) || is_boss_spawn) {
      this.speedincrease -= 0.15;
      console.log(this.speedincrease);
      this.timecount = 0;
    } else {
      // this.speedincrease = 2.5;
    }
  }

  var whichentity = Math.floor(Math.random() * 4 + 1);
  //Prevent update too many times
  if (this.difficulty === 1) {
    if (is_boss_spawn && this.boss_spawn) {
      this.game.addEntity(
        new EnemyUnit(this.game, "TrollWarlord", [1120, 330], this.difficulty)
      );
      var entity = new Fireball(
        this.game,
        AM.getAsset("./img/Fireball/Fireball.png"),
        60,
        385
      )
      entity.x = 1190;
      entity.speed = -200;
      entity.type = "enemy";
      var entity1 = new Fireball(
        this.game,
        AM.getAsset("./img/Fireball/Fireball.png"),
        60,
        551
      )
      entity1.x = 1295;
      entity1.speed= -200;
      entity1.type = "enemy";
      this.game.addEntity(
      entity
      );
      this.game.addEntity(
        entity1
        );

      this.boss_spawn = false;
    }
    if (this.elapsed < curr_elapsed - this.speedincrease && !is_boss_spawn) {
      if (whichentity === 1) {
        this.game.addEntity(
          new EnemyUnit(
            this.game,
            "Orc",
            this.spawn_lane_position[Math.floor(Math.random() * 3)],
            this.difficulty + .5
          )
        );
      } else if (whichentity === 2) {
        this.game.addEntity(
          new EnemyUnit(
            this.game,
            "FallenAngel",
            this.spawn_lane_position[Math.floor(Math.random() * 3)],
            this.difficulty + .5
          )
        );
      } else if (whichentity === 3) {
        this.game.addEntity(
          new EnemyUnit(
            this.game,
            "ReaperMan",
            this.spawn_lane_position[Math.floor(Math.random() * 3)],
            this.difficulty + .5
          )
        );
      } else if (whichentity === 4) {
        this.game.addEntity(
          new EnemyUnit(
            this.game,
            "DeathKnight",
            this.spawn_lane_position[Math.floor(Math.random() * 3)],
            this.difficulty + .5
          )
        );
      }
      this.elapsed = curr_elapsed;
    }
  }

  if (this.difficulty === 2) {
    if (is_boss_spawn && this.boss_spawn) {
      this.game.addEntity(
        new EnemyUnit(this.game, "TrollWarlord", [1120, 330], this.difficulty)
      );
      var entity = new Fireball(
        this.game,
        AM.getAsset("./img/Fireball/Fireball.png"),
        60,
        385
      )
      entity.x = 1190;
      entity.speed = -200;
      entity.type = "enemy";
      var entity1 = new Fireball(
        this.game,
        AM.getAsset("./img/Fireball/Fireball.png"),
        60,
        551
      )
      entity1.x = 1295;
      entity1.speed= -200;
      entity1.type = "enemy";
      this.game.addEntity(
      entity
      );
      this.game.addEntity(
        entity1
        );
      this.boss_spawn = false;
    }
    if (this.elapsed < curr_elapsed - this.speedincrease && !is_boss_spawn) {
      if (whichentity === 1) {
        this.game.addEntity(
          new EnemyUnit(
            this.game,
            "Orc",
            this.spawn_lane_position[Math.floor(Math.random() * 3)],
            this.difficulty
          )
        );
      } else if (whichentity === 2) {
        this.game.addEntity(
          new EnemyUnit(
            this.game,
            "FallenAngel",
            this.spawn_lane_position[Math.floor(Math.random() * 3)],
            this.difficulty
          )
        );
      } else if (whichentity === 3) {
        this.game.addEntity(
          new EnemyUnit(
            this.game,
            "ReaperMan",
            this.spawn_lane_position[Math.floor(Math.random() * 3)],
            this.difficulty
          )
        );
      }
      this.elapsed = curr_elapsed;
    }
  }

  if (this.difficulty === 3) {
    if (is_boss_spawn && this.boss_spawn) {
      this.game.addEntity(
        new EnemyUnit(this.game, "TrollWarlord", [1120, 330], this.difficulty)
      );
      var entity = new Fireball(
        this.game,
        AM.getAsset("./img/Fireball/Fireball.png"),
        60,
        385
      )
      entity.x = 1190;
      entity.speed = -200;
      entity.type = "enemy";
      var entity1 = new Fireball(
        this.game,
        AM.getAsset("./img/Fireball/Fireball.png"),
        60,
        551
      )
      entity1.x = 1295;
      entity1.speed= -200;
      entity1.type = "enemy";
      this.game.addEntity(
      entity
      );
      this.game.addEntity(
        entity1
        );
      this.boss_spawn = false;
    }
    if (this.elapsed < curr_elapsed - this.speedincrease && !is_boss_spawn) {
      if (whichentity === 1) {
        this.game.addEntity(
          new EnemyUnit(
            this.game,
            "Orc",
            this.spawn_lane_position[Math.floor(Math.random() * 3)],
            this.difficulty - 0.25
          )
        );
      } else if (whichentity === 2) {
        this.game.addEntity(
          new EnemyUnit(
            this.game,
            "FallenAngel",
            this.spawn_lane_position[Math.floor(Math.random() * 3)],
            this.difficulty - 0.25
          )
        );
      } else if (whichentity === 3) {
        this.game.addEntity(
          new EnemyUnit(
            this.game,
            "ReaperMan",
            this.spawn_lane_position[Math.floor(Math.random() * 3)],
            this.difficulty - 0.25
          )
        );
      }
      this.elapsed = curr_elapsed;
    }
  }
};

EnemyControl.prototype.draw = function() {};

function EnemyHP(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

function getEndPointEnemy(yValue) {
  if (yValue === 370) {
    // lane 1
    return 270;
  } else if (yValue === 455) {
    // lane 2
    return 250;
  } else if (yValue === 535) {
    // lane 3
    return 240;
  }
}
