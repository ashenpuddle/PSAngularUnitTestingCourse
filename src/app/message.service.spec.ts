import { MessageService } from './message.service';

describe( 'Message Service', () => {

  let messageService: MessageService;

  beforeEach( () => {
    messageService = new MessageService();
  } )

  it( 'should have no messages to start', () => {
    expect( messageService.messages.length ).toEqual( 0 );
  } )

  it( 'should add a message when add is called', () => {
    messageService.add( 'Bonjour' );
    expect( messageService.messages.length ).toEqual( 1 );
  } )

  it( 'should contain no messages after clear is called', () => {
    // Arrange
    messageService.add( 'Bonjour' );
    // Act
    messageService.clear();
    // Assert
    expect( messageService.messages.length ).toEqual( 0 );
  } )

} )
