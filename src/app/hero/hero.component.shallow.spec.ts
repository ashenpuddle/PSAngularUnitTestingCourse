import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                        from '@angular/platform-browser';
import { HeroComponent }             from './hero.component';

describe( 'HeroComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroComponent>;
  beforeEach( () => {

    TestBed.configureTestingModule( {
      declarations: [
        HeroComponent
      ],
      schemas     : [
        NO_ERRORS_SCHEMA // NO_ERRORS_SCHEMA can be problematic in that it will hide any template errors
      ]
    } );
    fixture = TestBed.createComponent( HeroComponent );
  } )

  it( 'should set hero correctly', function () {
    let myHero                     = { id: 1, name: 'SuperDude', strength: 5 };
    fixture.componentInstance.hero = myHero;

    expect( fixture.componentInstance.hero ).toEqual( myHero );
  } );

  it( 'should render the hero name in an anchor tag', () => {
    let myHero                     = { id: 1, name: 'SuperDude', strength: 5 };
    fixture.componentInstance.hero = myHero;
    fixture.detectChanges();

    let textContent = fixture.nativeElement.querySelector( 'a' ).textContent;
    expect( textContent ).toContain( myHero.name );
  } );

  it( 'should render the hero name in an anchor tag using DebugElement', () => {
    let myHero                     = { id: 1, name: 'SuperDude', strength: 5 };
    fixture.componentInstance.hero = myHero;
    fixture.detectChanges();

    // Can get hold of nativeElement this way (using debugElement):
    let debugElementAnchor = fixture.debugElement.query( By.css( 'a' ) );
    let textContent = debugElementAnchor.nativeElement.textContent;
    // OR
    // by using the nativeElement directly off of the fixture as in previous 'it' test.
    expect( textContent ).toContain( myHero.name );
  } );
} )
