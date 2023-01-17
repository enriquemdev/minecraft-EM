# This python script resizes all .webp images in the current directory to 16x16 pixels and saves them as .png files.
# This script requires the Pillow library to be installed. To install Pillow, run the following command in a terminal: pip install Pillow

# textures link: https://minecraft.fandom.com/wiki/List_of_block_textures
from PIL import Image
from pathlib import Path

directory = './'
pathlist = Path(directory).glob('*.webp')
for path in pathlist:
    image = Image.open(path)
    new_image = image.resize((16, 16))
    path = str(path).replace('.webp', '.png')
    new_image.save(path)