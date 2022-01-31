var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
var HeroSearchComponent = /** @class */ (function () {
    function HeroSearchComponent(heroService) {
        this.heroService = heroService;
        this.searchTerms = new Subject();
    }
    // Push a search term into the observable stream.
    HeroSearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    HeroSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.heroes$ = this.searchTerms.pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300), 
        // ignore new term if same as previous term
        distinctUntilChanged(), 
        // switch to new search observable each time the term changes
        switchMap(function (term) { return _this.heroService.searchHeroes(term); }));
    };
    HeroSearchComponent = __decorate([
        Component({
            selector: 'app-hero-search',
            templateUrl: './hero-search.component.html',
            styleUrls: ['./hero-search.component.css']
        })
    ], HeroSearchComponent);
    return HeroSearchComponent;
}());
export { HeroSearchComponent };
//# sourceMappingURL=hero-search.component.js.map