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
            console.log(result.preds);
            showResults(result.preds);
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
        console.log(entry)
        let card = '<div class="col s12 l4 center-align">'+
            '<div class="card">' +
            '<div class="card-image waves-effect waves-block waves-light">' +
                '<img class="activator" src="">' +
            '</div>' +
            '<div class="card-content">' +
                '<span class="card-title grey-text text-darken-4">'+ val.label +'</span>' +
                '<span class="card-title grey-text text-darken-4">'+ round(val.prob*100,1)% +'</span>' +
            '</div>' +
            '</div>'+
        '</div>'
        
        $('#top3').append(card)

    })
}

// for (let i = 1; i < 4; i++) {
//     let imgID = `boot${i}`
//     console.log(imgID)
//     let predID = `pred${i}`
//     console.log(predID)
//     $(`#${imgID}`).src = "images/boots.jpg"
//     $(`#${predID}`).innerHTML = `Boot${i}`
// }

// res1 = preds[1]
// res2 = preds[2]
// console.log(preds[3])

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

  $('#formSubmit').click(()=>{
    submitForm();
  });

  $('.modal').modal();
});