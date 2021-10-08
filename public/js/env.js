const uploadBoot = (bootData) => {
    $.ajax({
        enctype:'multipart/form-data',
        url: '/api/boots',
        data: bootData,
        type: 'POST',
        contentType:false,
        processData:false,
        success: (result) => {
            $('#modal1').modal('close')
            $('#queryBoot').attr("src", result.imgURL).toggle(true);
            showResults(result.preds);
            getURL(result.preds['1']);
        },
        error: (err) => {
            alert(err.message);
            // location.reload();
        }
    })
}

const showResults = (preds) => {
    Object.entries(preds).forEach(entry => {
        let [key, val] = entry
        let imgID = '#img'+key
        let bootID = '#boot'+key
        let predID = '#pred'+key
        let imgURL = 'images/' + val.label + '.jpg'
        $(imgID).attr("src", imgURL)
        $(bootID).html(val.label)
        $(predID).html(Math.round(val.prob*100) + "%")

    })
    $("#resetButton").toggle(true)
    $("#shopNow").toggle(true)
    $("#uploadButton").toggle(false)
}

const getURL = (topBoot) => {
    $.ajax({
        enctype:'application/json',
        url: 'https://cb2fc2b4.au-syd.apigw.appdomain.cloud/api/v1/url',
        data: { label: topBoot.label} ,
        type: 'GET',
        success: (result) => {
            $("#shopNow").attr('href',result.data)
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

let socket = io();


$(document).ready(function(){
  console.log('Ready');
  $("#resetButton").toggle(false)
  $("#shopNow").toggle(false)
  $("#loading").toggle(false)
  $("#queryBoot").toggle(false)

  $('#formSubmit').click(()=>{
    submitForm();
    $("#loading").toggle(true)
  });

  $('#resetButton').click(()=>{
    location.reload()
  });

  $('.modal').modal();
});