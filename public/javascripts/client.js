const deleteButton = document.getElementById('delete');
const updateButton = document.getElementById('update');
deleteButton.addEventListener('click',function(e) {
    console.log('button was clicked');
  
    fetch('/delete', {method: 'POST'})
      .then(function(response) {
        if(response.ok) {
          console.log('Click was recorded');
          return;
        }
        throw new Error('Request failed.');
      })
      .catch(function(error) {
        console.log(error);
      });
  });
