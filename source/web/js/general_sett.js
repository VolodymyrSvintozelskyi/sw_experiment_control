
(function() {
    var stack_bottomleft = {"dir1": "up", "dir2": "right", "push": "top"};
    $("#select-output-folder").on("click", async function(){
        let dir = await select_dir();
        if (typeof dir !== undefined) {
            $("#select-output-folder-input").val(dir);
        }
    });
  })();

export function get_general_settings(){
    return {
        "output_folder": $("#select-output-folder-input").val()
    }
}

export function set_general_settings(sett){
    $("#select-output-folder-input").val(sett["output_folder"]);
}