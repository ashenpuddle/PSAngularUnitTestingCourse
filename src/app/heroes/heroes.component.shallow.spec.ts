import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { ComponentFixture, TestBed }                                from '@angular/core/testing';
import { By }                                                       from '@angular/platform-browser';
import { of }                                                       from 'rxjs';
import { Hero }                                                     from '../hero';
import { HeroService }                                              from '../hero.service';
import { HeroesComponent }                                          from './heroes.component';

describe( 'HeroesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  // How to mock a child component:
  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }

  beforeEach( () => {
    mockHeroService = jasmine.createSpyObj( [ 'getHeroes', 'addHero', 'deleteHero' ] );

    HEROES = [
      { id: 1, name: 'Spider Dude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'Super Dude', strength: 55 }
    ];

    TestBed.configureTestingModule( {
      declarations: [
        HeroesComponent,
        FakeHeroComponent
      ],
      providers   : [
        {
          provide : HeroService,
          useValue: mockHeroService
        }
      ]
    } );
    fixture = TestBed.createComponent( HeroesComponent );
  } );

  it( 'should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue( of( HEROES ) );
    fixture.detectChanges(); // fixture.detectChanges() causes lifecycle events to fire and property bindings to resolve.
    expect( fixture.componentInstance.heroes.length ).toBe( 3 );
  } );

  it( 'should create 1 "li" element for each hero', () => {
    mockHeroService.getHeroes.and.returnValue( of( HEROES ) );
    fixture.detectChanges(); // fixture.detectChanges() causes lifecycle events to fire and property bindings to resolve.
    let listElements = fixture.debugElement.queryAll( By.css( 'li' ) );
    expect(listElements.length).toEqual(3);
  } );
} );
