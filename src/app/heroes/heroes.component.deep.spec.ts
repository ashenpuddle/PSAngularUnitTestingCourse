import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                        from '@angular/platform-browser';
import { of }                        from 'rxjs';
import { HeroService }               from '../hero.service';
import { HeroComponent }             from '../hero/hero.component';
import { HeroesComponent }           from './heroes.component';

describe( 'HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>
  let mockHeroService;
  let HEROES;

  beforeEach( () => {
    HEROES = [
      { id: 1, name: 'Spider Dude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'Super Dude', strength: 55 }
    ];

    mockHeroService = jasmine.createSpyObj( [ 'getHeroes', 'addHero', 'deleteHero' ] );

    TestBed.configureTestingModule( {
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers   : [
        {
          provide : HeroService,
          useValue: mockHeroService
        }
      ],
      schemas     : [
        NO_ERRORS_SCHEMA
      ]
    } );
    fixture = TestBed.createComponent( HeroesComponent );
  } );

  it( 'should render each hero as a HeroComponent', function () {
    mockHeroService.getHeroes.and.returnValue( of( HEROES ) );
    fixture.detectChanges();

    let heroComponentDEs = fixture.debugElement.queryAll( By.directive( HeroComponent ) );
    expect( heroComponentDEs.length ).toEqual( 3 );

    for ( let i = 0; i < heroComponentDEs.length; i++ ) {
      expect( heroComponentDEs[ i ].componentInstance.hero ).toEqual( HEROES[ i ] );
    }
  } );

  it( `should call heroService.deleteHero when the Hero Component's
       delete button is clicked`, function () {
    spyOn( fixture.componentInstance, 'delete' );
    mockHeroService.getHeroes.and.returnValue( of( HEROES ) );
    fixture.detectChanges();

    // Note: we use 'By.directive() to find the components because a Component is actually
    // a specialized Directive.
    const heroComponents = fixture.debugElement.queryAll( By.directive( HeroComponent ) );

    // Now find the button we want to press.
    heroComponents[ 0 ].query( By.css( 'button' ) )
    .triggerEventHandler( 'click', { stopPropagation: () => {} } );

    expect( fixture.componentInstance.delete ).toHaveBeenCalledWith( HEROES[ 0 ] );
  } );

  it( `should call heroService.deleteHero when the Hero Component
   sends out a delete event`, function () {
    spyOn( fixture.componentInstance, 'delete' );
    mockHeroService.getHeroes.and.returnValue( of( HEROES ) );
    fixture.detectChanges();

    // Note: we use 'By.directive() to find the components because a Component is actually
    // a specialized Directive.
    const heroComponentDebugElements = fixture.debugElement.queryAll( By.directive( HeroComponent ) );

    // Now find the button we want to press and emit the delete event from the child Component:
    ( <HeroComponent>heroComponentDebugElements[ 0 ].componentInstance ).delete.emit( undefined );

    // Alternatively, we could also trigger the delete event directly from the DebugElement:
    // Note: if the event object is not used in the event handler code then the second parameter can be null or undefined.
    heroComponentDebugElements[ 0 ].triggerEventHandler( 'delete', undefined );

    expect( fixture.componentInstance.delete ).toHaveBeenCalledWith( HEROES[ 0 ] );
  } );

  it( `should add a new hero to the heroes list when the add button is clicked`, function () {
    mockHeroService.getHeroes.and.returnValue( of( HEROES ) );
    fixture.detectChanges();
    const name = 'Mr. Ice';
    mockHeroService.addHero.and.returnValue( of( { id: 5, name: name, strength: 4 } ) );
    // Remember here, a nativeElement is a DOMElement.
    let inputElement          = fixture.debugElement.query( By.css( 'input' ) ).nativeElement;
    // The next line simulates typing the name 'Mr. Ice' into the text input element:
    inputElement.value        = name;
    // Grab the DebugElement for the first Add Button:
    let addButtonDebugElement = fixture.debugElement.queryAll( By.css( 'button' ) )[ 0 ];
    // We can trigger the 'click' event from the DebugElement.
    // Note: if the event object is not used in the event handler code then the second parameter can be null or undefined.
    addButtonDebugElement.triggerEventHandler( 'click', null );
  } );
} )
