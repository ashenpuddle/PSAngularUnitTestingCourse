import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed }                                        from '@angular/core/testing';
import { HeroService }                                    from './hero.service';
import { MessageService }                                 from './message.service';

describe( 'HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach( () => {
    mockMessageService = jasmine.createSpyObj( [ 'add' ] );
    TestBed.configureTestingModule( {
      imports     : [
        HttpClientTestingModule
      ],
      declarations: [], // Don't need any declarations because we're not testing any components
      providers   : [
        HeroService,
        {
          provide : MessageService,
          useValue: mockMessageService
        }
      ]
    } );
    // There are two methods for injecting the mocks used here.
    // The first are commented out in the next two lines. The other is used in the first test.
    httpTestingController = TestBed.inject( HttpTestingController );
    service               = TestBed.inject( HeroService );
  } )

  describe( 'getHero', () => {

    it( 'should call get with the correct URL', () => {
      //Can test with an 'expect' here.
      service.getHero( 4 ).subscribe(
        // (hero) => {
        //   expect( hero.id ).toEqual( 4 );
        // }
      );

      let testRequest = httpTestingController.expectOne( 'api/heroes/4' );
      testRequest.flush( { id: 4, name: 'Super Dude', strength: 55 } );
      // or here.
      expect(testRequest.request.method).toEqual('GET');
      httpTestingController.verify(); // <-- Checks to see that ONLY the requests we expected occurred.
    } );

    // it( 'should call get with the correct URL', inject(
    //   [ HeroService, HttpTestingController ],
    //   // Parameter order is important here. Must match order of array in previous line
    //   (service: HeroService, controller: HttpTestingController) => {
    //     service.getHero( 4 );
    //   } ) );
  } )
} )
