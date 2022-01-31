'use strict'; // necessary for es6 output in node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var expectedH1 = 'Tour of Heroes';
var expectedTitle = "" + expectedH1;
var targetHero = { id: 15, name: 'Magneta' };
var targetHeroDashboardIndex = 3;
var nameSuffix = 'X';
var newHeroName = targetHero.name + nameSuffix;
var Hero = /** @class */ (function () {
    function Hero() {
    }
    // Factory methods
    // Hero from string formatted as '<id> <name>'.
    Hero.fromString = function (s) {
        return {
            id: +s.substr(0, s.indexOf(' ')),
            name: s.substr(s.indexOf(' ') + 1),
        };
    };
    // Hero from hero list <li> element.
    Hero.fromLi = function (li) {
        return __awaiter(this, void 0, void 0, function () {
            var stringsFromA, strings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, li.all(protractor_1.by.css('a')).getText()];
                    case 1:
                        stringsFromA = _a.sent();
                        strings = stringsFromA[0].split(' ');
                        return [2 /*return*/, { id: +strings[0], name: strings[1] }];
                }
            });
        });
    };
    // Hero id and name from the given detail element.
    Hero.fromDetail = function (detail) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, _name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, detail.all(protractor_1.by.css('div')).first().getText()];
                    case 1:
                        _id = _a.sent();
                        return [4 /*yield*/, detail.element(protractor_1.by.css('h2')).getText()];
                    case 2:
                        _name = _a.sent();
                        return [2 /*return*/, {
                                id: +_id.substr(_id.indexOf(' ') + 1),
                                name: _name.substr(0, _name.lastIndexOf(' '))
                            }];
                }
            });
        });
    };
    return Hero;
}());
describe('Tutorial part 6', function () {
    beforeAll(function () { return protractor_1.browser.get(''); });
    function getPageElts() {
        var navElts = protractor_1.element.all(protractor_1.by.css('app-root nav a'));
        return {
            navElts: navElts,
            appDashboardHref: navElts.get(0),
            appDashboard: protractor_1.element(protractor_1.by.css('app-root app-dashboard')),
            topHeroes: protractor_1.element.all(protractor_1.by.css('app-root app-dashboard > div h4')),
            appHeroesHref: navElts.get(1),
            appHeroes: protractor_1.element(protractor_1.by.css('app-root app-heroes')),
            allHeroes: protractor_1.element.all(protractor_1.by.css('app-root app-heroes li')),
            selectedHeroSubview: protractor_1.element(protractor_1.by.css('app-root app-heroes > div:last-child')),
            heroDetail: protractor_1.element(protractor_1.by.css('app-root app-hero-detail > div')),
            searchBox: protractor_1.element(protractor_1.by.css('#search-box')),
            searchResults: protractor_1.element.all(protractor_1.by.css('.search-result li'))
        };
    }
    describe('Initial page', function () {
        it("has title '" + expectedTitle + "'", function () {
            expect(protractor_1.browser.getTitle()).toEqual(expectedTitle);
        });
        it("has h1 '" + expectedH1 + "'", function () {
            expectHeading(1, expectedH1);
        });
        var expectedViewNames = ['Dashboard', 'Heroes'];
        it("has views " + expectedViewNames, function () {
            var viewNames = getPageElts().navElts.map(function (el) { return el.getText(); });
            expect(viewNames).toEqual(expectedViewNames);
        });
        it('has dashboard as the active view', function () {
            var page = getPageElts();
            expect(page.appDashboard.isPresent()).toBeTruthy();
        });
    });
    describe('Dashboard tests', function () {
        beforeAll(function () { return protractor_1.browser.get(''); });
        it('has top heroes', function () {
            var page = getPageElts();
            expect(page.topHeroes.count()).toEqual(4);
        });
        it("selects and routes to " + targetHero.name + " details", dashboardSelectTargetHero);
        it("updates hero name (" + newHeroName + ") in details view", updateHeroNameInDetailView);
        it("cancels and shows " + targetHero.name + " in Dashboard", function () {
            protractor_1.element(protractor_1.by.buttonText('go back')).click();
            protractor_1.browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
            var targetHeroElt = getPageElts().topHeroes.get(targetHeroDashboardIndex);
            expect(targetHeroElt.getText()).toEqual(targetHero.name);
        });
        it("selects and routes to " + targetHero.name + " details", dashboardSelectTargetHero);
        it("updates hero name (" + newHeroName + ") in details view", updateHeroNameInDetailView);
        it("saves and shows " + newHeroName + " in Dashboard", function () {
            protractor_1.element(protractor_1.by.buttonText('save')).click();
            protractor_1.browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
            var targetHeroElt = getPageElts().topHeroes.get(targetHeroDashboardIndex);
            expect(targetHeroElt.getText()).toEqual(newHeroName);
        });
    });
    describe('Heroes tests', function () {
        beforeAll(function () { return protractor_1.browser.get(''); });
        it('can switch to Heroes view', function () {
            getPageElts().appHeroesHref.click();
            var page = getPageElts();
            expect(page.appHeroes.isPresent()).toBeTruthy();
            expect(page.allHeroes.count()).toEqual(10, 'number of heroes');
        });
        it('can route to hero details', function () { return __awaiter(void 0, void 0, void 0, function () {
            var page, hero;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getHeroLiEltById(targetHero.id).click();
                        page = getPageElts();
                        expect(page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
                        return [4 /*yield*/, Hero.fromDetail(page.heroDetail)];
                    case 1:
                        hero = _a.sent();
                        expect(hero.id).toEqual(targetHero.id);
                        expect(hero.name).toEqual(targetHero.name.toUpperCase());
                        return [2 /*return*/];
                }
            });
        }); });
        it("updates hero name (" + newHeroName + ") in details view", updateHeroNameInDetailView);
        it("shows " + newHeroName + " in Heroes list", function () {
            protractor_1.element(protractor_1.by.buttonText('save')).click();
            protractor_1.browser.waitForAngular();
            var expectedText = targetHero.id + " " + newHeroName;
            expect(getHeroAEltById(targetHero.id).getText()).toEqual(expectedText);
        });
        it("deletes " + newHeroName + " from Heroes list", function () { return __awaiter(void 0, void 0, void 0, function () {
            var heroesBefore, li, page, heroesAfter, expectedHeroes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, toHeroArray(getPageElts().allHeroes)];
                    case 1:
                        heroesBefore = _a.sent();
                        li = getHeroLiEltById(targetHero.id);
                        li.element(protractor_1.by.buttonText('x')).click();
                        page = getPageElts();
                        expect(page.appHeroes.isPresent()).toBeTruthy();
                        expect(page.allHeroes.count()).toEqual(9, 'number of heroes');
                        return [4 /*yield*/, toHeroArray(page.allHeroes)];
                    case 2:
                        heroesAfter = _a.sent();
                        expectedHeroes = heroesBefore.filter(function (h) { return h.name !== newHeroName; });
                        expect(heroesAfter).toEqual(expectedHeroes);
                        return [2 /*return*/];
                }
            });
        }); });
        it("adds back " + targetHero.name, function () { return __awaiter(void 0, void 0, void 0, function () {
            var newHeroName, heroesBefore, numHeroes, page, heroesAfter, maxId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newHeroName = 'Alice';
                        return [4 /*yield*/, toHeroArray(getPageElts().allHeroes)];
                    case 1:
                        heroesBefore = _a.sent();
                        numHeroes = heroesBefore.length;
                        protractor_1.element(protractor_1.by.css('input')).sendKeys(newHeroName);
                        protractor_1.element(protractor_1.by.buttonText('add')).click();
                        page = getPageElts();
                        return [4 /*yield*/, toHeroArray(page.allHeroes)];
                    case 2:
                        heroesAfter = _a.sent();
                        expect(heroesAfter.length).toEqual(numHeroes + 1, 'number of heroes');
                        expect(heroesAfter.slice(0, numHeroes)).toEqual(heroesBefore, 'Old heroes are still there');
                        maxId = heroesBefore[heroesBefore.length - 1].id;
                        expect(heroesAfter[numHeroes]).toEqual({ id: maxId + 1, name: newHeroName });
                        return [2 /*return*/];
                }
            });
        }); });
        it('displays correctly styled buttons', function () { return __awaiter(void 0, void 0, void 0, function () {
            var addButton;
            return __generator(this, function (_a) {
                protractor_1.element.all(protractor_1.by.buttonText('x')).then(function (buttons) {
                    for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
                        var button = buttons_1[_i];
                        // Inherited styles from styles.css
                        expect(button.getCssValue('font-family')).toBe('Arial');
                        expect(button.getCssValue('border')).toContain('none');
                        expect(button.getCssValue('padding')).toBe('5px 10px');
                        expect(button.getCssValue('border-radius')).toBe('4px');
                        // Styles defined in heroes.component.css
                        expect(button.getCssValue('left')).toBe('194px');
                        expect(button.getCssValue('top')).toBe('-32px');
                    }
                });
                addButton = protractor_1.element(protractor_1.by.buttonText('add'));
                // Inherited styles from styles.css
                expect(addButton.getCssValue('font-family')).toBe('Arial');
                expect(addButton.getCssValue('border')).toContain('none');
                expect(addButton.getCssValue('padding')).toBe('5px 10px');
                expect(addButton.getCssValue('border-radius')).toBe('4px');
                return [2 /*return*/];
            });
        }); });
    });
    describe('Progressive hero search', function () {
        beforeAll(function () { return protractor_1.browser.get(''); });
        it("searches for 'Ma'", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                getPageElts().searchBox.sendKeys('Ma');
                protractor_1.browser.sleep(1000);
                expect(getPageElts().searchResults.count()).toBe(4);
                return [2 /*return*/];
            });
        }); });
        it("continues search with 'g'", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                getPageElts().searchBox.sendKeys('g');
                protractor_1.browser.sleep(1000);
                expect(getPageElts().searchResults.count()).toBe(2);
                return [2 /*return*/];
            });
        }); });
        it("continues search with 'e' and gets " + targetHero.name, function () { return __awaiter(void 0, void 0, void 0, function () {
            var page, hero;
            return __generator(this, function (_a) {
                getPageElts().searchBox.sendKeys('n');
                protractor_1.browser.sleep(1000);
                page = getPageElts();
                expect(page.searchResults.count()).toBe(1);
                hero = page.searchResults.get(0);
                expect(hero.getText()).toEqual(targetHero.name);
                return [2 /*return*/];
            });
        }); });
        it("navigates to " + targetHero.name + " details view", function () { return __awaiter(void 0, void 0, void 0, function () {
            var hero, page, hero2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hero = getPageElts().searchResults.get(0);
                        expect(hero.getText()).toEqual(targetHero.name);
                        hero.click();
                        page = getPageElts();
                        expect(page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
                        return [4 /*yield*/, Hero.fromDetail(page.heroDetail)];
                    case 1:
                        hero2 = _a.sent();
                        expect(hero2.id).toEqual(targetHero.id);
                        expect(hero2.name).toEqual(targetHero.name.toUpperCase());
                        return [2 /*return*/];
                }
            });
        }); });
    });
    function dashboardSelectTargetHero() {
        return __awaiter(this, void 0, void 0, function () {
            var targetHeroElt, page, hero;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        targetHeroElt = getPageElts().topHeroes.get(targetHeroDashboardIndex);
                        expect(targetHeroElt.getText()).toEqual(targetHero.name);
                        targetHeroElt.click();
                        protractor_1.browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6
                        page = getPageElts();
                        expect(page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
                        return [4 /*yield*/, Hero.fromDetail(page.heroDetail)];
                    case 1:
                        hero = _a.sent();
                        expect(hero.id).toEqual(targetHero.id);
                        expect(hero.name).toEqual(targetHero.name.toUpperCase());
                        return [2 /*return*/];
                }
            });
        });
    }
    function updateHeroNameInDetailView() {
        return __awaiter(this, void 0, void 0, function () {
            var page, hero;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Assumes that the current view is the hero details view.
                        addToHeroName(nameSuffix);
                        page = getPageElts();
                        return [4 /*yield*/, Hero.fromDetail(page.heroDetail)];
                    case 1:
                        hero = _a.sent();
                        expect(hero.id).toEqual(targetHero.id);
                        expect(hero.name).toEqual(newHeroName.toUpperCase());
                        return [2 /*return*/];
                }
            });
        });
    }
});
function addToHeroName(text) {
    var input = protractor_1.element(protractor_1.by.css('input'));
    return input.sendKeys(text);
}
function expectHeading(hLevel, expectedText) {
    var hTag = "h" + hLevel;
    var hText = protractor_1.element(protractor_1.by.css(hTag)).getText();
    expect(hText).toEqual(expectedText, hTag);
}
;
function getHeroAEltById(id) {
    var spanForId = protractor_1.element(protractor_1.by.cssContainingText('li span.badge', id.toString()));
    return spanForId.element(protractor_1.by.xpath('..'));
}
function getHeroLiEltById(id) {
    var spanForId = protractor_1.element(protractor_1.by.cssContainingText('li span.badge', id.toString()));
    return spanForId.element(protractor_1.by.xpath('../..'));
}
function toHeroArray(allHeroes) {
    return __awaiter(this, void 0, void 0, function () {
        var promisedHeroes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, allHeroes.map(Hero.fromLi)];
                case 1:
                    promisedHeroes = _a.sent();
                    // The cast is necessary to get around issuing with the signature of Promise.all()
                    return [2 /*return*/, Promise.all(promisedHeroes)];
            }
        });
    });
}
//# sourceMappingURL=app.e2e-spec.js.map