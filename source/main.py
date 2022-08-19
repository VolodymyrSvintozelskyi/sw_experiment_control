from multiprocessing.util import get_logger
import eel
import logging
import sys
import tkinter as tk
from tkinter import filedialog
import datetime as dt
from logging.handlers import TimedRotatingFileHandler
import lib.server

def gen_logger(name="root"):
    FORMATTER = logging.Formatter("%(asctime)s — %(name)s — %(levelname)s — %(message)s")
    def filer(self):
        now = dt.datetime.now()
        return now.strftime(name+"_%Y-%m-%d_%H:%M:%S.log")
    logger = logging.getLogger(name if name != "root" else None)
    logger.setLevel(logging.DEBUG)
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(FORMATTER)
    logger.addHandler(console_handler)
    file_handler = TimedRotatingFileHandler("./"+name+".log", when='midnight')
    file_handler.rotation_filename = filer
    file_handler.setFormatter(FORMATTER)
    logger.addHandler(file_handler)
    # logger.propagate = True
    return logger

root_logger = gen_logger("main")
gen_logger("server")
root_logger.debug("EEL init start")

eel.init('web')

root_logger.debug("Adding expose functions")

@eel.expose
def save_to_file(content):
    root = tk.Tk()
    root.withdraw()
    file = filedialog.asksaveasfile(mode='w', defaultextension=".expconf")
    if file:
        file.write(content)
        file.close()
        return (True, file.name)
    return (False, "No destination chosen")
@eel.expose
def read_from_file():
    root = tk.Tk()
    root.withdraw()
    filename = filedialog.askopenfilename(defaultextension=".expconf")
    if filename:
        content = ""
        with open(filename, 'r') as f:
            content = f.read()
        return (True, filename, content)
    return (False, "No file chosen")
@eel.expose
def select_dir():
    root = tk.Tk()
    root.withdraw()
    dir = filedialog.askdirectory()
    return dir
@eel.expose
def start_exp(conf):
    server = lib.server.Server()
    server.construct(conf)


root_logger.debug("EEL main loop start")
eel.start('index.html')