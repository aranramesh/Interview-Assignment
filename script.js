$('.button').click(function(){
    var buttonId = $(this).attr('id');
    $('#modal-container').removeAttr('class').addClass(buttonId);
    $('body').addClass('modal-active');
  })
  
  $('#Segmenttitle').click(function(){
    $(this).addClass('out');
    $('body').removeClass('modal-active');
  });
  

  $(document).ready(function() {
    // Create a map of option values to display text
    var optionMap = {
        'first_name': 'First Name',
        'last_name': 'Last Name',
        'gender': 'Gender',
        'age': 'Age',
        'account_name': 'Account Name',
        'city': 'City',
        'state': 'State'
    };

    $('#addSchemaLink').click(function(event) {
        event.preventDefault();
        
        var selectedValue = $('#selectedsegments').val();
        
        if (selectedValue) {
            var schemaHtml = '<div class="schema">';
            schemaHtml += '<select class="schema-dropdown">';
            
            // Include the selected value and its corresponding display text in the new dropdown
            schemaHtml += '<option value="' + selectedValue + '">' + optionMap[selectedValue] + '</option>';
            
            // Populate the dropdown with available options
            $('#selectedsegments option:not(:selected)').each(function() {
                schemaHtml += '<option value="' + $(this).val() + '">' + optionMap[$(this).val()] + '</option>';
            });
            
            schemaHtml += '</select>';
            schemaHtml += '<a href="#" class="removeSchema"><i class="bx bx-minus"></i></a>';
            schemaHtml += '</div>';
            
            $('.schemas').append(schemaHtml);
            
            // Remove the selected value from the main dropdown
            $('#selectedsegments option[value="' + selectedValue + '"]').remove();
        }
    });

    // Handle removal of schemas
    $('.schemas').on('click', '.removeSchema', function(event) {
        event.preventDefault();
        
        var schemaValue = $(this).siblings('.schema-dropdown').val();
        $('#selectedsegments').append('<option value="' + schemaValue + '">' + optionMap[schemaValue] + '</option>');
        $(this).parent().remove();
    });

    // Handle changes in the "Add to Schema" dropdown
    $('.schemas').on('change', '.schema-dropdown', function() {
        var changedValue = $(this).val();
        $('#selectedsegments').append('<option value="' + changedValue + '">' + optionMap[changedValue] + '</option>');
        $(this).parent().remove();
    });
});
$('#save').click(function() {
    var selectedValue = $('#selectedsegments').val();
    var segmentName = $('#segment_name').val();

    var data = {
        selectedValue: selectedValue,
        segmentName: segmentName
    };

    // Send data to the server using AJAX
    $.ajax({
        type: "POST",
        url: "https://webhook.site/57cea883-d701-492b-a4be-20d8f2169629",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(response) {
            console.log("Data sent successfully:", response);
        },
        error: function(error) {
            console.error("Error sending data:", error);
        }
    });
});
