import imp
from ..lib import device
import os

class MyDevice(device.Device):
    @staticmethod
    def getDriverConf():
        return {
            "driver_name": os.path.basename(__file__)[:-3],
            "is_nested_allowed": True,
            "known_devices": ["Arduino board v2."]
        }
     
    @staticmethod
    def getListOfPars():
        return [
            {
                "id" : "port",
                "name": "Port",
                "type": "serial_port",
                "preview": False
            },
            {
                "id": "mode_v",
                "name": "Vertical BNC mode",
                "type": "dropdown",
                "variants": ["short", "open"],
                "preview": False
            },
            {
                "id": "mode_h",
                "name": "Horizontal BNC mode",
                "type": "dropdown",
                "variants": ["short", "open"],
                "preview": False
            },
            {
                "id": "loop_delay",
                "name": "Loop delay per pixel",
                "type": "int",
                "min": "0",
                "max": "1e6",
                "preview": False
            },
            {
                "id": "loop_vertical_range",
                "name": "Loop vertical range",
                "type": "range",
                "min": "0",
                "max": "15",
                "step": '1',
                "preview": True
            },
            {
                "id": "loop_horizontal_range",
                "name": "Loop horizontal range",
                "type": "range",
                "min": "0",
                "max": "15",
                "step": "1",
                "preview": True
            }
        ]

    def __init__(self):
        pass