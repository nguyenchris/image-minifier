# Image Minifier Tool

## Description

This tool is designed to recursively compress/minify images within a specified source directory and save the compressed images to a destination directory. It handles `.jpg`, `.jpeg`, and `.png` files, compressing them to a specified quality level.

## Install

Note: Requires the Node.js runtime environment, versions 20.x are supported.

1. Clone the repository:
   ```bash
   git clone https://github.com/nguyenchris/image-minifier.git
   ```

2. Install dependencies:
   ```bash
   # To install locally
   npm install

   # To install globally. This allows you to run the script from any location on your system.
   npm install -g
   ```

## Usage

```text
Usage: minify-images [options]

Options:

      --help          Show help
      --version       Show version number
  -s, --source        Source directory
  -d, --destination   Destination directory
  -q, --quality       Quality of the image compression (default: 60)
```

Run the script from the command line, specifying the source and destination directories, and optionally, the quality of compression (default is 80):
```bash
minify-images -s <source-directory> -d <destination-directory> -q <quality>
```

## License
MIT License

Copyright (c) 2024 Chris Nguyen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.