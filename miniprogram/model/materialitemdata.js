"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MaterialItemData {
    constructor(name) {
        this.have = 0;
        this.need = 0;
        this.lack = 0;
        this.canMerge = false;
        this.name = name;
    }
    shouldHide() {
        return !(this.have || this.need || this.lack);
    }
}
exports.MaterialItemData = MaterialItemData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxpdGVtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsaXRlbWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFhLGdCQUFnQjtJQU96QixZQUFZLElBQVk7UUFOeEIsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULFNBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUliLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxVQUFVO1FBQ04sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0o7QUFiRCw0Q0FhQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNYXRlcmlhbEl0ZW1EYXRhIHtcclxuICAgIGhhdmUgPSAwO1xyXG4gICAgbmVlZCA9IDA7XHJcbiAgICBsYWNrID0gMDtcclxuICAgIGNhbk1lcmdlID0gZmFsc2U7XHJcblxyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH1cclxuICAgIHNob3VsZEhpZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuICEodGhpcy5oYXZlIHx8IHRoaXMubmVlZCB8fCB0aGlzLmxhY2spO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==