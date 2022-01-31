describe( 'my first test', () => {
  let sut;

  beforeEach( () => {
    sut = {};
  } )

  describe( 'My first test', () => {

    it( 'should should be true if true', () => {
      // arrange
      sut.a = false;
      // act
      sut.a = true;
      // assert
      expect(sut.a).toEqual(true);
    } );
  } )
} );
