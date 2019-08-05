/*
***
* MENU FUNCTIONALITY
***
* The code belows gives the mobile menu functionality. It decides whether to
* display the mobile menu based on screen width, and toggles the appearace
* of the menu button when it is clicked by the user.
*
* There is also a function which resets the menu button to an inactive state
* whenever the screen is resized to prevent the toggle going out of sync.
***
*/

$( document ).ready(function() {

  // Hide menu button unless in mobile mode
  if( $( window ).width() <= 1050 ) {
    $('#menu-list').hide();
  }

  // Default menu button to display "menu" with "inactive" class
  $('#menu-button').addClass('inactive');

  // Reverts menu button to default appearance and "inactive" class
  function resetMenu() {
    $('#menu-button').addClass('inactive');
    $('#menu-button').css('color', '#1b1b1b');
    $('#bars').show();
    $('#cross').hide();
  }

  // Changes menu button to active appearance and removes "inactive" class
  function activateMenu() {
    $('#menu-button').removeClass('inactive');
    $('#menu-button').css('color', '#fff');
    $('#bars').hide();
    $('#cross').show();
  }

  // Resets menu button upon window resize, hides 'ul' in mobile mode and displays in full screen mode
  $( window ).resize(function() {

    resetMenu();

    if( $( window ).width() <= 1050 ) {
      $('#menu-list').hide();
    }

    else {
      $('#menu-list').show();
    }
  });

  // Toggles appearance and class of menu button when clicked
  $('#menu-button').click(function() {

    $('#menu-list').toggle();

    if ( $('#menu-button').hasClass('inactive') ) {
      activateMenu();
    }

    else {
      resetMenu();
    }
  })
});
