/**
 * This is the code for the bounding box
 * 
 */
function BoundingBox(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.left = x;
    this.top = y;
    this.right = this.left + width;
    this.bottom = this.top + height;
}

BoundingBox.prototype.collide = function (oth) {
    if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
    return false;
}

BoundingBox.prototype.rangeCheck = function (oth, range) {




    if (this.right + range > oth.left &&
        // this.left + range < oth.right &&
        this.top < oth.bottom &&
        this.bottom > oth.top) return true;
    return false;

}