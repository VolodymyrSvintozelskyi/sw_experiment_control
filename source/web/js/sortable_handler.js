import Sortable, { AutoScroll } from '../node_modules/sortablejs/modular/sortable.core.esm.js';

Sortable.mount(new AutoScroll());

function update_external_scripts(panels){
    $(function() {
        $('#nestedDemo').find('[data-plugin-slider]').each(function() {
            var $this = $( this ),
                opts = {};

            var pluginOptions = $this.data('plugin-options');
            if (pluginOptions) {
                opts = pluginOptions;
            }

            $this.themePluginSlider(opts);
        });
    });
    update_panel_action_buttons( jQuery , panels);
}

export function nestable_serialize(sortable) {
    const nestedQuery = '.nested-sortable';
    const identifier = 'sortableId';

    var serialized = [];
    var children = [].slice.call(sortable.children);
    for (var i in children) {
        var nested = children[i].querySelector(nestedQuery);
        serialized.push({
            id: children[i].dataset[identifier],
            pars: $(children[i]).data("pars"),
            title: $(children[i]).data("title"),
            device: $(children[i]).data("device"),
            selected_action: $(children[i]).data("selected_action"),
            allow_nestable: $(children[i]).data("allow_nestable"),
            children: nested ? nestable_serialize(nested) : []
        });
    }
    return serialized
}

function add_sortable_handler(el){
    el.data("sortable", new Sortable(el[0], {
        group: 'nested',
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        // swapThreshold: 0.05,
    }));
}

function add_el(root_el, list){
    $.each(list, function(i,el){
        var html = document.querySelector('#nest_el').innerHTML;
        let html_pars = "";
        let html_pars_no_preview = "";
        var html_pars_template = document.querySelector('#nest_el_pars').innerHTML;
        $.each(el["pars"],
            function(index, par){
                let par_type = par["type"];
                let html_par_template = html_pars_template.substring(html_pars_template.indexOf("<"+par_type+">"), html_pars_template.indexOf("</"+par_type+">"));
                html_par_template = html_par_template.replaceAll("<"+par_type+">","").replaceAll("</"+par_type+">","");                              
                if (par["preview"]) {    
                    if (html_par_template){
                        for (const [key, value] of Object.entries(par)) {
                            html_par_template = html_par_template.replaceAll("{"+key+"}", value);
                        }
                        if (par_type === "range"){
                            html_par_template = html_par_template.replaceAll("{value_0}", par["value"].split("/")[0]);
                            html_par_template = html_par_template.replaceAll("{value_1}", par["value"].split("/")[1]);
                        } else if (par_type === "dropdown"){
                            let html_option_list = "";
                            $.each(par["options"], function(i,opt){ html_option_list += "<option "+(par["value"] == opt? "selected":"")+">"+opt+"</option>" })
                            html_par_template=html_par_template.replaceAll("{OPTION_LIST}", html_option_list);
                        }
                        html_pars += '<div class="col-md-4">';
                        html_pars += html_par_template;
                        html_pars += '</div>';
                    }
                }else{
                    if (html_par_template){
                        for (const [key, value] of Object.entries(par)) {
                            html_par_template = html_par_template.replaceAll("{"+key+"}", value);
                        }
                        if (par_type === "range"){
                            html_par_template = html_par_template.replaceAll("{value_0}", par["value"].split("/")[0]);
                            html_par_template = html_par_template.replaceAll("{value_1}", par["value"].split("/")[1]);
                        } else if (par_type === "dropdown"){
                            let html_option_list = "";
                            $.each(par["options"], function(i,opt){ html_option_list += "<option "+(par["value"] == opt? "selected":"")+">"+opt+"</option>" })
                            html_par_template=html_par_template.replaceAll("{OPTION_LIST}", html_option_list);
                        }
                        html_pars_no_preview += html_par_template;
                    }
                }
            }
        );
        html = html.replaceAll("{DATA_PREVIEW_PARS_CONTENT}", html_pars)
        html = html.replaceAll("{DATA_NOPREVIEW_PARS_CONTENT}", html_pars_no_preview)
        html = html.replaceAll("{DATA_ADDITIONAL_PANEL_CLASSES}", el["allow_nestable"] ? "panel-featured panel-featured-primary" : "")
        
        $.each(["title","id", "selected_action", "allow_nestable"], function(i,parname){
            html = html.replaceAll("{driver_"+parname+"}", el[parname]);
        });
        root_el.append(html);
        if (el["children"]){
            add_el(root_el.children().last().children(".dd-children"), el["children"]);
        }
        if (el["allow_nestable"])
            add_sortable_handler(root_el.children().last().children(".dd-children"));
        root_el.children().last().find("a.fa-times").click(function(){
            $(this).parents('.list-group-item').eq(0).remove();
        });
        $.each(["title","id", "pars", "selected_action", "allow_nestable", "device"], function(i,parname){
            root_el.children().last().data(parname, el[parname]);    
        });

        modal_popup_make_handlers(root_el.children().last());
    });
    
}

export function gen_nestable_from_json(json){
    const root = document.getElementById('nestedDemo');
    const $root = $(root);
    $root.empty();
    add_el($root, json);
    add_sortable_handler($root);
    update_external_scripts($root.find(".panel"));
}

export function add_device_to_nestable(device, pars){
    let $root = $("#nestedDemo");
    function check_id(json){
        let max_id = 0;
        $.each(json, function(key,value){
            if (parseInt(value.id) > max_id) max_id = parseInt(value.id);
            if (value.children){
                let ch_max_v = check_id(value.children);
                if (ch_max_v > max_id) max_id = ch_max_v;
            }
        });
        return max_id;
    }
    let new_device_id = check_id(nestable_serialize($root[0])) + 1;
    
    add_el($root,[{
        "id":new_device_id,
        "title": device.driver_name,
        "device": device,
        "pars": pars,
        "selected_action": device.driver_selected_action,
        "allow_nestable": device.driver_allow_nestable
    }]);
    
    update_external_scripts($root.children().last().find(".panel"));
}