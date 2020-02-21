// TODO:
// 1. Add sound in battle *
// 2. Balance game
// 3. Refactor EnemyUnit and add Big boss
// 4. Fix coordinate *
var is_castle_under_attack = false;
function EnemyControl (game, difficulty){
    this.game = game;
    this.ctx = game.ctx;
    this.start_time = new Date();
    this.elapsed = 0;
    this.difficulty = difficulty;
    this.spawn_lane_position = [[1100, 370], [1120, 455], [1130, 535]];
}

EnemyControl.prototype = new Entity();
EnemyControl.prototype.constructor = EnemyControl;

EnemyControl.prototype.update = function () {
    // Get current time
    var checkpoint_time = new Date();
    // Calculate time difference, strip the ms, and round it to the second.
    var curr_elapsed = (checkpoint_time - this.start_time)/1000;

    var whichentity = Math.floor(Math.random() * 3 + 1);
    //console.log(whichentity);
    //Prevent update too many times
    if (this.difficulty === 1) {
        if (this.elapsed < curr_elapsed - 3) {
            if(whichentity === 1){
                this.game.addEntity(new EnemyUnit(this.game, "Orc", this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));

            } 
            else if (whichentity === 2){
                this.game.addEntity(new EnemyUnit(this.game, "FallenAngel", this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));

            }
            else if (whichentity ===3){
                this.game.addEntity(new EnemyUnit(this.game, "ReaperMan", this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            }
            this.elapsed = curr_elapsed;
        }
    }

    if (this.difficulty === 2) {
        if (this.elapsed < curr_elapsed - 2.5) {
            this.game.addEntity(new EnemyUnit(this.game, "Orc", this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            this.game.addEntity(new EnemyUnit(this.game, "ReaperMan", this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            this.game.addEntity(new EnemyUnit(this.game, "FallenAngel", this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            //this.game.addEntity(new Orc(this.game,AM.getAsset("./img/enemy_team/orc/orc.png"), this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            //this.game.addEntity(new ReaperMan(this.game,AM.getAsset("./img/enemy_team/reaper_chibbi/reaper.png"), this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            //this.game.addEntity(new FallenAngel(this.game,AM.getAsset("./img/enemy_team/fallen_angel/fallen_angel.png"), this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            this.elapsed = curr_elapsed;
        }
    }

    if (this.difficulty === 3) {
        if (this.elapsed < curr_elapsed - 3) {
            this.game.addEntity(new EnemyUnit(this.game, "Orc", this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            this.game.addEntity(new EnemyUnit(this.game, "ReaperMan", this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            this.game.addEntity(new EnemyUnit(this.game, "FallenAngel", this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            //this.game.addEntity(new Orc(this.game,AM.getAsset("./img/enemy_team/orc/orc.png"), this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            //this.game.addEntity(new ReaperMan(this.game,AM.getAsset("./img/enemy_team/reaper_chibbi/reaper.png"), this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            //this.game.addEntity(new FallenAngel(this.game,AM.getAsset("./img/enemy_team/fallen_angel/fallen_angel.png"), this.spawn_lane_position[Math.floor(Math.random() * 3)], this.difficulty));
            this.elapsed = curr_elapsed;
        }
    }


}
EnemyControl.prototype.draw = function () {
}

function EnemyHP(x ,y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

function getEndPointEnemy(yValue) {
    if (yValue === 370) { // lane 1
        return 270;
    } else if (yValue === 455) { // lane 2
        return 250;
    } else if (yValue === 535) { // lane 3
        return 240;
    }
}