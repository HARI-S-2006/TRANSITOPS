const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'src', 'app', '(app)');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // We want to extract everything inside <main ...> ... </main>
      // and replace the entire return (<> ... </>) block with it.
      
      const mainRegex = /<main[^>]*>([\s\S]*?)<\/main>/i;
      const match = content.match(mainRegex);
      
      if (match) {
        const innerContent = match[1];
        
        // We'll replace the nav, header, main tags
        // The structure is:
        // <>
        //   <nav ...>...</nav>
        //   <header ...>...</header>
        //   <main ...>...</main>
        // </>
        
        content = content.replace(/<>\s*<nav[\s\S]*?<\/main>\s*<\/>/i, `<>\n${innerContent}\n    </>`);
        
        fs.writeFileSync(fullPath, content);
        console.log(`Refactored layout in ${fullPath}`);
      }
    }
  }
}

processDirectory(appDir);
