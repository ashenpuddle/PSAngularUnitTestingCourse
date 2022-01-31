var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var StrengthPipe = /** @class */ (function () {
    function StrengthPipe() {
    }
    StrengthPipe.prototype.transform = function (value) {
        if (value < 10) {
            return value + " (weak)";
        }
        else if (value >= 10 && value < 20) {
            return value + " (strong)";
        }
        else {
            return value + " (unbelievable)";
        }
    };
    StrengthPipe = __decorate([
        Pipe({
            name: 'strength'
        })
    ], StrengthPipe);
    return StrengthPipe;
}());
export { StrengthPipe };
//# sourceMappingURL=strength.pipe.js.map