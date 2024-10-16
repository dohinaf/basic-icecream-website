// Function to show SweetAlert notification
function showNotification(message) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }
  
 function showNotificationError(message){
    Swal.fire({
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 2000
      });
 }
  