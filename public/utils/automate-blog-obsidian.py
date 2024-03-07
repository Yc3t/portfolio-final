import os
import shutil

# Copy markdown file to new location
shutil.copy("C:\\Users\\yceta\\Escritorio\\Br4in-02\\blog\\DNN accelerators.md", "C:\\Users\\yceta\\Documentos\\portfolio\\public\\md")

# Copy associated images to new location
for file in os.listdir("C:\\Users\\yceta\\Escritorio\\Br4in-02\\Images"):
    if file.startswith("DNN accelerators-") and file.endswith(".png"):
        shutil.copy(os.path.join("C:\\Users\\yceta\\Escritorio\\Br4in-02\\Images", file), "C:\\Users\\yceta\\Documentos\\portfolio\\public\\md_images")
