const addBootToDB = (boot) => {
    $.ajax({
        url: '/api/boots',
        data: boot,
        type: 'POST',
        success: (result) => {
            alert(result.message);
            location.reload();
        }
    })
}

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image = $('#image').val();
    formData.link = $('#link').val();
    formData.description = $('#description').val();

    console.log("Form Data Submitted: ", formData);
    addProjectToApp(formData);
}


$(document).ready(function(){
  console.log('Ready');

  $('.modal').modal();
});