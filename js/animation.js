// Copy of Animation class from Lecture 5 for player controlled units
// class Animation {
//     constructor(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
//         this.spriteSheet = spriteSheet;
//         this.startX = startX;
//         this.startY = startY;
//         this.frameWidth = frameWidth;
//         this.frameDuration = frameDuration;
//         this.frameHeight = frameHeight;
//         this.frames = frames;
//         this.totalTime = frameDuration * frames;
//         this.elapsedTime = 0;
//         this.loop = loop;
//         this.reverse = reverse;
//     }

//     drawFrame(tick, ctx, x, y, scaleBy) {
//         var scaleBy = scaleBy || 1;
//         this.elapsedTime += tick;
//         if (this.loop) {
//             if (this.isDone()) {
//                 this.elapsedTime = 0;
//             }
//         } else if (this.isDone()) {
//             return;
//         }
//         var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
//         var vindex = 0;
//         if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
//             index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
//             vindex++;
//         }
//         while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
//             index -= Math.floor(this.spriteSheet.width / this.frameWidth);
//             vindex++;
//         }

//         var locX = x;
//         var locY = y;
//         var offset = vindex === 0 ? this.startX : 0;
//         ctx.drawImage(this.spriteSheet,
//             index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
//             this.frameWidth, this.frameHeight,
//             locX, locY,
//             this.frameWidth * scaleBy,
//             this.frameHeight * scaleBy);

//     }

//     currentFrame() {
//         return Math.floor(this.elapsedTime / this.frameDuration);
//     }

//     isDone() {
//         return (this.elapsedTime >= this.totalTime);

//     }

//     animationComplete() {
//         return this.currentFrame() === this.frames - 1;
//     }



// }

function MyAnimation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

MyAnimation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    }
    // else if (this.isDone()) {
    //     return;
    // }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
        index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
        this.frameWidth, this.frameHeight,
        locX, locY,
        this.frameWidth * scaleBy,
        this.frameHeight * scaleBy);

}


MyAnimation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

MyAnimation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

MyAnimation.prototype.animationComplete = function () {
    return this.currentFrame() === this.frames - 8;
}