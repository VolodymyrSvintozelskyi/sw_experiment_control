import {gen_nestable_from_json, add_device_to_nestable, nestable_serialize} from "./sortable_handler.js"
import {update_add_new_device_select, add_new_device, update_device_actions} from "./sequence_sett.js"
import {get_general_settings, set_general_settings} from "./general_sett.js"

(function() {
    update_add_new_device_select();
    update_device_actions();
    $("#add_new_device_btn").on("click", add_new_device);
    $("#add_new_device_select").on("change", update_device_actions);
  })();

function bake_cookie(name, value) {
    window.localStorage.setItem(name,value);
}

function read_cookie(name) {
    return window.localStorage.getItem(name);
}
function delete_cookie(name) {
    window.localStorage.removeItem(name);
}

function generate_conf(){
    return {
        "general_settings": get_general_settings(),
        "sequence_settings": nestable_serialize(document.getElementById('nestedDemo'))
    }
}

function load_conf(conf){
    if (conf){
        conf = JSON.parse(conf);
        let exp_tree = conf["sequence_settings"];
        gen_nestable_from_json(exp_tree);
        set_general_settings(conf["general_settings"]);
    }else{
        gen_nestable_from_json([]);
    }
}

$(window).unload(function(){
    bake_cookie("conf", JSON.stringify(generate_conf()));
});


(function() {
    let conf = read_cookie("conf");
    load_conf(conf); 
  })();

(function() {
    $("#save_profile_to_file").on("click",async function(){
        let result = await save_to_file(JSON.stringify(generate_conf()));
        if (typeof result !== 'undefined' && result[0]){
            make_notification("Success", "Profile is saved to " + result[1], "success");
        }
    });
    $("#load_profile_from_file").on("click", async function(){
        let result = await read_from_file();
        if (typeof result !== 'undefined'){
            if (result[0]){
                make_notification("Success", "Profile is loaded from " + result[1], "success");
                load_conf(result[2]);
            }else{
                make_notification("Warning", result[1], "warning");
            }
                
        }
    });
  })();


