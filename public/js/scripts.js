const addBootToDB = (bootData) => {
    $.ajax({
        enctype:'multipart/form-data',
        url: '/api/boots',
        data: bootData,
        type: 'POST',
        contentType:false,
        processData:false,
        success: (result) => {
            let url = result.url
            console.log(result.message);
            console.log(url); // Need to send url to tensorflow model for prediction
            location.reload();
        },
        error: (err) => {
            alert(err.message);
            // location.reload();
        }
    })
}

const submitForm = () => {
    let bootImg = $('#bootImg')[0].files[0];
    var formData = new FormData();
    formData.append("bootImg", bootImg);

    console.log("Form Data Submitted: ", formData);
    addBootToDB(formData);
}


$(document).ready(function(){
  console.log('Ready');

  $('#formSubmit').click(()=>{
    submitForm();
  });

  $('.modal').modal();
});