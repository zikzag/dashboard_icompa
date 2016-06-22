//The MIT License (MIT)
//Copyright (c) 2016

/*$('.edit_indicator').on('click', function() {
    var indicator_name2 = $(this).closest('tr').find('td#nom_indicateur').text();
    console.log("full name ->" + indicator_name2);
})*/

$('.editIndicator_dialog').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var indicator_name = button.data('name'); // Extract info from data-* attributes
  var start = button.data('start'); // Extract info from data-* attributes
  var end = button.data('end'); // Extract info from data-* attributes
  var id = button.data('id'); // Extract info from data-* attributes
  var client_code = button.data('clientcode'); // Extract info from data-* attributes
  var cabinet_code = button.data('cabinetcode'); //
  //var indicator_name2 = $(this).closest('tr').find('td#nom_indicateur').text();
  //var indicator_name = $(this).attr('data-name');
  console.log(indicator_name);

  console.log("Id ->" + id, "Name ->" + indicator_name, "Cabinet code ->" + cabinet_code, "Client code ->" + client_code, "Compte start ->" + start, "Compte end ->" + end);

  var modal = $(this);

  //put the value in the modal window
  modal.find('.modal-body .indicator_name_modal_edit').val(indicator_name);
  modal.find('.modal-body .indicator_id').val(id);
  modal.find('.modal-body .client_code').val(client_code);
  modal.find('.modal-body .cabinet_code').val(cabinet_code);
  
  //put the list of compte in the select
  //?????????????
  modal.find('.start_compte').val(start);
  modal.find('.end_compte').val(end);

  //modal.find('.start_compte_add').val(start);
  //modal.find('.end_compte_add').val(end);

});

//BUTTON ENREGISTRER
  $('.save_edition').on('click', function() {
    //get all data requires from modal popup in one object
    var indicator = { name : $('.modal-body').find('.indicator_name_modal_edit').val(),
                      id : $('.modal-body').find('.indicator_id').val(),
                      cabinet_code : $('.modal-body').find('.cabinet_code').val(),
                      client_code : $('.modal-body').find('.client_code').val(),
                      select_start_compte : $('.modal-body .start_compte :selected').val(),
                      select_end_compte : $('.modal-body .end_compte :selected').text() }
    //console.log(indicator);
    
    editIndicator(indicator, function(indicator) {
    //console.log(indicator);
      if(indicator.length > 0){
        var html = [];

        $.each(indicator, function(i, item) {
            
          if(indicator[i].status == 1) {

             var checkbox_html = '<input class="state" type="checkbox" checked>';
          }else {
             var checkbox_html = '<input class="state" type="checkbox">';
             }
          if(indicator[i].sum < 0) {

             var htmlSum = '<td class="col-md-2" id="sum" align="center" style="color:red;">'+indicator[i].sum+'</td>';
          }else {
             var htmlSum = '<td class="col-md-2" id="sum" align="center">'+indicator[i].sum+'</td>';
             }
          //alert(item.nom_indicateur);
          //alert(json.id);
          html.push ('<tr style="vertical-align: middle;">'
              +'<td class="col-md-5" id="nom_indicateur">'+indicator[i].indicator_name+'</td>'
              +'<td class="col-md-2" id="range_start" align="center">'+indicator[i].range_start+'</td>'
              +'<td class="col-md-2" id="range_end" align="center">'+indicator[i].range_end+'</td>'
              + htmlSum
              +'<td class="col-md-1" class="action" align="center">'
              + checkbox_html
              +'<button type="button" style="margin: 0 10px 0 10px;" class="edit_indicator btn btn-primary btn-xs" title="Editer" data-toggle="modal" data-target=".editIndicator_dialog" data-id="'+indicator[i].id+'" data-name="'+indicator[i].indicator_name+'" data-clientcode="'+indicator[i].client_code+'" data-cabinetcode="'+indicator[i].cabinet_code+'" data-start="'+indicator[i].range_start+'" data-end="'+indicator[i].range_end+'"><span class="glyphicon glyphicon-pencil"></span></button>'
              +'<input type="hidden" id="id" name="id" value="'+indicator[i].id+'"/>'
              +'<button type="submit" class="delete_indicator btn btn-danger btn-xs" data-toggle="modal" data-target=".delete_indicator_dialog" data-id="'+indicator[i].id+'" data-name="'+indicator[i].indicator_name+'" title="Supprimer"><span class="glyphicon glyphicon-trash"></span></button>'
              +'</td>'
                +'</tr>'
                );
          console.log(html);

          $('#table_indicateur_body').find('tbody').html(html.join(""));
        });
      } else {
          $('#table_indicateur_body').hide();
          $('#table_indicateur_head').hide();
          $('#rechercheclienterreur').show();
      }
    }); //and fonction editIndicator

    $('.editIndicator_dialog').modal('hide');
    $('.fourchette_add').hide();
    var fourchettes = { fourchettes : { start: { first: $('.modal-body').find(".start_compte :selected").text(), second: $('.modal-body').find('.start_compte1 :selected').text() },  end: { first: $('.modal-body').find(".end_compte :selected").text(), second: $('.modal-body').find('.end_compte1 :selected').text() } } }
    console.log(fourchettes);
  });


/*************  ADD FOURCHETTE **************/
function add_new_fourchette(){

  $('.add_fourchette').one('click', function(e) {
    e.preventDefault();
    var client_code=$('input[type="hidden"].client_code').val();
    var cabinet_code=$('input[type="hidden"].cabinet_code').val();
    console.log (cabinet_code, client_code) ;
    
    addFourchette(client_code, cabinet_code, function(html){
      $('.edit_indicator_table tbody').append(html);
        $('.delete_fourchette').bind('click', function(e){
          e.preventDefault();
          $('.edit_indicator_table tr').closest('.fourchette_add').remove();
          //$('.fourchette_add').hide();
          //siblings(), closest()
        });    
    });
  });
}

add_new_fourchette();
