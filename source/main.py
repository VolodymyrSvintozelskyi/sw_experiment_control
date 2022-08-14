import eel

eel.init('web')

import tkinter as tk
from tkinter import filedialog

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

eel.start('index.html')