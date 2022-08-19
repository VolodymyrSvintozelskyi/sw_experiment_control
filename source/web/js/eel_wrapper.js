var debug = true

function get_list_of_devices(){
    return [
        {
            "driver_id" : "ArduinoBoardV2",
            "driver_name": "Generic Arduino board driver",
            "driver_actions": ["Simple pixel loop", "No loop"],
            "driver_action_allow_nestable": [true, false]
        },
        {
            "driver_id" : "KeySightSMU",
            "driver_name": "Example SMU",
            "driver_actions": ["Just measure"],
            "driver_action_allow_nestable": [false]
        },
        {
            "driver_id" : "ChinaSupply",
            "driver_name": "Example LED",
            "driver_actions": ["Just apply"],
            "driver_action_allow_nestable": [false]
        }
    ]
}

function get_list_of_pars(driver, mode){
    console.log("Get list of pars: " + driver );
    return [
        {
            "id" : "port",
            "name": "Port",
            "type": "dropdown",
            "value": "COM3",
            "options": ["COM3", "COM4"],
            "preview": false
        },
        {
            "id": "mode_v",
            "name": "Vertical BNC mode",
            "type": "dropdown",
            "value": "short",
            "options": ["short", "open"],
            "preview": false
        },
        {
            "id": "mode_h",
            "name": "Horizontal BNC mode",
            "type": "dropdown",
            "value": "open",
            "options": ["short", "open"],
            "preview": false
        },
        {
            "id": "loop_delay",
            "name": "Loop delay per pixel",
            "type": "number",
            "value": "50",
            "min": "0",
            "max": "1e6",
            "step": "1",
            "preview": false
        },
        {
            "id": "loop_vertical_range",
            "name": "Loop vertical range",
            "type": "range",
            "min": "0",
            "max": "15",
            "value": "0/ 15",
            "step": '1',
            "preview": true
        },
        {
            "id": "loop_horizontal_range",
            "name": "Loop horizontal range",
            "type": "range",
            "min": "0",
            "max": "15",
            "value": "0/ 15",
            "step": "1",
            "preview": true
        }
    ]
}

async function select_dir(){
    if (typeof eel !== 'undefined'){
        return await eel.select_dir()();
    }else{
        make_notification("Critical error", "No EEL instance found!", "error", 10000);
        return undefined;
    }
}

async function save_to_file(content){
    if (typeof eel !== 'undefined'){
        return await eel.save_to_file(content)();
    }else{
        make_notification("Critical error", "No EEL instance found!", "error", 10000);
        return undefined;
    }
}

async function read_from_file(){
    if (typeof eel !== 'undefined'){
        return await eel.read_from_file()();
    }else{
        make_notification("Critical error", "No EEL instance found!", "error", 10000);
        return undefined;
    }
}

async function start_run(conf){
    if (typeof eel !== 'undefined'){
        return await eel.start_exp(conf)();
    }else{
        make_notification("Critical error", "No EEL instance found!", "error", 10000);
        return undefined;
    }
}