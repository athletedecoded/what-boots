const uploadBoot = (bootData) => {
    $.ajax({
        enctype:'multipart/form-data',
        url: '/api/boots',
        data: bootData,
        type: 'POST',
        contentType:false,
        processData:false,
        success: (result) => {
            alert(result);
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
    uploadBoot(formData);
}


$(document).ready(function(){
  console.log('Ready');

  $('#formSubmit').click(()=>{
    submitForm();
  });

  $('.modal').modal();
});