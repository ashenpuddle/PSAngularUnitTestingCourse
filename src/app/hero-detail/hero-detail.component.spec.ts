import { Location }                  from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }               from '@angular/forms';
import { ActivatedRoute }            from '@angular/router';
import { of }                        from 'rxjs';
import { HeroService }               from '../hero.service';
import { HeroDetailComponent }       from './hero-detail.component';

describe( 'HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute,
      mockHeroService,
      mockLocationService;

  beforeEach( () => {
    mockHeroService     = jasmine.createSpyObj( [ 'getHero', 'updateHero' ] );
    mockLocationService = jasmine.createSpyObj( [ 'back' ] );
    // It is easiest at this point to create a mock object 'by hand' rather than use jasmine.createSpyObj.
    mockActivatedRoute  = {
      snapshot: {
        paramMap: {
          get: () => { return '3';}
        }
      }
    };

    TestBed.configureTestingModule( {
      imports: [
        FormsModule
      ],
      declarations: [
        HeroDetailComponent
      ],
      providers   : [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocationService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas     : []
    } );
    fixture = TestBed.createComponent( HeroDetailComponent );
    mockHeroService.getHero.and.returnValue( of({ id: 3, name: 'SuperDude', strength: 100 }) )
  } )

  it( 'should render the hero name in an h2 tag', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  } );
} );
