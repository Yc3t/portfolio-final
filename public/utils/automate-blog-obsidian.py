import os
import shutil
import tkinter as tk
from tkinter import filedialog
import subprocess

def select_md_file():
    md_file_path = filedialog.askopenfilename(initialdir="C:\\Users\\yceta\\Escritorio\\Br4in-02\\blog", filetypes=[("Markdown Files", "*.md")])
    md_file_entry.delete(0, tk.END)
    md_file_entry.insert(tk.END, md_file_path)

def process_md_file():
    md_file_path = md_file_entry.get()
    if not md_file_path:
        return

    md_file = os.path.basename(md_file_path)
    md_file_name = os.path.splitext(md_file)[0]

    # Copy markdown file to new location
    shutil.copy(md_file_path, "C:\\Users\\yceta\\Documentos\\portfolio\\public\\md")

    # Copy associated images to new location
    image_folder = "C:\\Users\\yceta\\Escritorio\\Br4in-02\\Images"
    for file in os.listdir(image_folder):
        if file.startswith(md_file_name) and file.endswith(".png"):
            shutil.copy(os.path.join(image_folder, file), "C:\\Users\\yceta\\Documentos\\portfolio\\public\\md_images")

    # Add blog entry to blog.html
    with open("C:\\Users\\yceta\\Documentos\\portfolio\\blog.html", "r") as file:
        content = file.read()

    new_entry = f'\t\t\t<li><a href="/blog-entries/{md_file_name}.html">{md_file_name}</a></li>'
    content = content.replace('<ul id="blog-entries">', f'<ul id="blog-entries">\n{new_entry}')

    with open("C:\\Users\\yceta\\Documentos\\portfolio\\blog.html", "w") as file:
        file.write(content)

    status_label.config(text="Processing complete!")

    # Run 'npm run generate-blog'
    os.chdir("C:\\Users\\yceta\\Documentos\\portfolio")
    subprocess.run(["npm", "run", "generate-blog"], shell=True)


# Create the main window
window = tk.Tk()
window.title("Markdown File Processor")

# Create and pack the widgets
md_file_label = tk.Label(window, text="Select Markdown File:")
md_file_label.pack()

md_file_entry = tk.Entry(window, width=50)
md_file_entry.pack()

select_button = tk.Button(window, text="Select", command=select_md_file)
select_button.pack()

process_button = tk.Button(window, text="Process", command=process_md_file)
process_button.pack()

status_label = tk.Label(window, text="")
status_label.pack()

# Start the main event loop
window.mainloop()
