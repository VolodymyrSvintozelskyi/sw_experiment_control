import imp
from ..lib import device
import os
import serial

class CustomDevice(device.Device):
    @staticmethod
    def getDriverConf():
        return {
            "driver_id" : os.path.basename(__file__)[:-3],
            "driver_name": "Arduino board driver",
            "driver_actions": ["Pixel loop", "Pixel fast loop", "Specific pixel"],
            "driver_action_allow_nestable": [True, False, False]
        }
     
    @staticmethod
    def getListOfPars(mode):
        if mode == "Pixel loop" or mode == "Pixel fast loop":
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
        if mode == "Specific pixel":
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
                    "id": "vertical_pixel",
                    "name": "Vertical pixel coordinate",
                    "type": "number",
                    "min": "0",
                    "max": "15",
                    "step": "1",
                    "value": "0",
                    "preview": True
                },
                {
                    "id": "vertical_pixel",
                    "name": "Horizontal pixel coordinate",
                    "type": "number",
                    "min": "0",
                    "max": "15",
                    "step": "1",
                    "value": "0",
                    "preview": True
                }
            ]

    @staticmethod
    def validateListOfPars(mode, pars):
        return (True, "")

    def __init__(self, mode, pars):
        super(mode, pars)
        self.ser = serial.Serial(self.port, 115200)
    
    def onActionStart(self):
        pass

    def onLoopStart(self):
        pass
    
    def onLoopEnd(self):
        pass

    def onIterStart(self):
        pass

    def onIterEnd(self):
        pass

    def hasNextIter(self) -> bool:
        return False

    def __del__(self):
        self.ser.close()