const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const markdownItPrism = require('markdown-it-prism');

const mdDirectory = 'public/md/';
const outputDirectory = 'blog-entries/';
const imageDirectory = '../public/md_images/';

fs.readdir(mdDirectory, (err, files) => {
  if (err) {
    console.error('Error reading the directory:', err);
    return;
  }

  files.forEach(file => {
    if (path.extname(file) === '.md') {
      const mdFilePath = path.join(mdDirectory, file);
      const htmlFilePath = path.join(outputDirectory, `${path.basename(file, '.md')}.html`);

      fs.readFile(mdFilePath, 'utf8', (err, mdContent) => {
        if (err) {
          console.error('Error reading the markdown file:', err);
          return;
        }

        // Replace image syntax with HTML <img> tags
        const updatedMdContent = mdContent.replace(/!\[\[(.*?)\|(\d+)\]\]/g, (match, imageName, size) => {
          const imagePath = path.join(imageDirectory, imageName);
          return `<img src="${imagePath}" alt="${imageName}" width="${size}px">`;
        });

        const md = new MarkdownIt({
          html: true,
          linkify: true,
          typographer: true,
        }).use(markdownItPrism, {
          plugins: ['line-numbers'],
          init: (prism) => {
            prism.languages.insertBefore('clike', 'comment', {
              'doc-comment': {
                pattern: /(^|[^\\])\/\*\*[\s\S]*?\*\//,
                lookbehind: true,
                alias: 'comment'
              }
            });
          },
        });

        let htmlContent = md.render(updatedMdContent);

        // Remove the "language-" prefix from the class names
        htmlContent = htmlContent.replace(/class="language-(\w+)"/g, 'class="$1"');

        const blogEntryTemplate = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Blog Entry</title>
            <link rel="stylesheet" href="../public/prism-twilight.css">
            <link rel="stylesheet" href="../public/style.css">
            <link rel="icon" href="../public/svg/Pixel Cat.svg" type="image/x-icon">
          </head>
          <body>
            <nav id="desktop-nav">
              <a href="../index.html">
                <div class="logo">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="11" fill="#D9D9D9"/>
                  </svg>
                  ycet.<br><span class="dev">dev</span>
                </div>
              </a>
              <div>
                <div class="nav-container">
                  <ul class="nav-links">
                    <li><a href="../index.html">home</a></li>
                    <li><a href="../blog.html">blog</a></li>
                    <li><a href="../contact.html">contact</a></li>
                  </ul>
                </div>
              </div>
            </nav>
            <main>
              <div id="blog-entry">${htmlContent}</div>
            </main>
            <script src="../public/prism.js"></script>
            <script>
              Prism.highlightAll();
            </script>
          </body>
          </html>
        `;

        fs.writeFile(htmlFilePath, blogEntryTemplate, err => {
          if (err) {
            console.error('Error writing the HTML file:', err);
          } else {
            console.log(`Generated: ${htmlFilePath}`);
          }
        });
      });
    }
  });
});
