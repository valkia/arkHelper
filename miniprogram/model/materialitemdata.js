"use strict";
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
module.exports = MaterialItemData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxpdGVtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGVyaWFsaXRlbWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFDLE1BQU0sZ0JBQWdCO0lBT25CLFlBQVksSUFBWTtRQU54QixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULFNBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBSWIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNELFVBQVU7UUFDTixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDSjtBQUVELGlCQUFTLGdCQUFnQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiIGNsYXNzIE1hdGVyaWFsSXRlbURhdGEge1xyXG4gICAgaGF2ZSA9IDA7XHJcbiAgICBuZWVkID0gMDtcclxuICAgIGxhY2sgPSAwO1xyXG4gICAgY2FuTWVyZ2UgPSBmYWxzZTtcclxuXHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG4gICAgc2hvdWxkSGlkZSgpIHtcclxuICAgICAgICByZXR1cm4gISh0aGlzLmhhdmUgfHwgdGhpcy5uZWVkIHx8IHRoaXMubGFjayk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCA9IE1hdGVyaWFsSXRlbURhdGEiXX0=