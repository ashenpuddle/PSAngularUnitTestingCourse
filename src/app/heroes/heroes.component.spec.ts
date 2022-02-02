import { of }              from 'rxjs';
import { HeroesComponent } from './heroes.component';

describe( 'HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach( () => {
    HEROES = [
      { id: 1, name: 'Spider Dude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'Super Dude', strength: 55 }
    ]

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero'
    ])

    component = new HeroesComponent(mockHeroService);
  } )

  describe( 'delete ', () => {
    it( 'should remove specified user from list',  () => {
      // Arrange
      mockHeroService.deleteHero.and.returnValue(of(true))
      component.heroes = HEROES;

      // Act
      component.delete(HEROES[2]);

      // Assert
      expect(component.heroes.length).toBe(2);
    } )

    it( 'should call deleteHero with correct hero',  () => {
      // Arrange
      mockHeroService.deleteHero.and.returnValue(of(true))
      component.heroes = HEROES;

      // Act
      component.delete(HEROES[2]);

      // Assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledOnceWith(HEROES[2]);
    } )
  } )
} )
