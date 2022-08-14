import {add_device_to_nestable} from "./sortable_handler.js"

export function update_add_new_device_select(){
    let list_of_devices = window.get_list_of_devices();
    $("#add_new_device_select").empty();
    $.each(list_of_devices, function(index, sub){
        $("#add_new_device_select").append("<option>" + sub.driver_name + "</option>");
        $("#add_new_device_select").children().last().data("driver-info",sub)
    });
}

export function add_new_device(){
    // let device = JSON.parse($("#add_new_device_select :selected").attr("driver-info").replaceAll("\@",'"'));
    let device = $("#add_new_device_select :selected").data("driver-info");
    device.driver_selected_action = $("#add_new_device_select_action").val();
    device.driver_allow_nestable = $("#add_new_device_select_action :selected").data("allow_nestable");
    let pars = get_list_of_pars(device);
    add_device_to_nestable(device, pars);
}

export function update_device_actions(){
    let $el = $("#add_new_device_select")
    let driver = $el.children(":selected").eq(0).data("driver-info");
    let actions = driver.driver_actions;
    $("#add_new_device_select_action").empty();
    $.each(actions, function(index, sub){
        $("#add_new_device_select_action").append("<option>" + sub + "</option>");
        $("#add_new_device_select_action").children().last().data("allow_nestable",driver.driver_action_allow_nestable[index]);
    });
}