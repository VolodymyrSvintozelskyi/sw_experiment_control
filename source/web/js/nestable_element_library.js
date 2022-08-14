function onchange_range_slider(e, par_id){
    let form_group = e.parents(".form-group").eq(0);
    form_group.find('.min').html(e.val().split('/')[0]); 
    form_group.find('.max').html(e.val().split('/')[1]);
    let li_elem = e.parents(".list-group-item");
    if (li_elem.length == 0){
        li_elem = $('.list-group-item[data-sortable-id="'+driver_id+'"]');
    }else{
        li_elem = li_elem.eq(0);
    }
    let pars = li_elem.data("pars");
    $.each(pars, function(pos,val){
        if (val["id"] === par_id)
            val["value"] = e.val();
    });
    li_elem.data("pars", pars);
}

function onchange_input(e, par_id, driver_id){
    // let form_group = e.parent().parent().parent();
    let li_elem = e.parents(".list-group-item");
    if (li_elem.length == 0){
        li_elem = $('.list-group-item[data-sortable-id="'+driver_id+'"]');
    }else{
        li_elem = li_elem.eq(0);
    }
    let pars = li_elem.data("pars");
    $.each(pars, function(pos,val){
        if (val["id"] === par_id)
            val["value"] = e.val();
    });
    li_elem.data("pars", pars);
}