const fs = require('fs');
const https = require('https');
const path = require('path');

const screensListPath = 'C:/Users/shari/.gemini/antigravity-ide/brain/edc1b69f-eae9-44d3-add0-3397062e0c68/.system_generated/steps/12/output.txt';

const screenToPath = {
  "Authentication - Elegant": "src/app/page.tsx",
  "TransitOps Dashboard - Unified Theme": "src/app/(app)/dashboard/page.tsx",
  "Trip Dispatcher - Unified Theme": "src/app/(app)/dispatcher/page.tsx",
  "Vehicle Registry - Unified Theme": "src/app/(app)/vehicles/page.tsx",
  "Driver Management - Unified Theme": "src/app/(app)/drivers/page.tsx",
  "Maintenance Log - Elegant": "src/app/(app)/maintenance/page.tsx",
  "Fuel & Expenses - Unified Theme": "src/app/(app)/fuel/page.tsx",
  "Reports & Analytics - Unified Theme": "src/app/(app)/reports/page.tsx",
  "Settings & RBAC - Elegant": "src/app/(app)/settings/page.tsx"
};

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function processHtmlToJsx(html) {
  // Extract body content
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return '';
  
  let jsx = bodyMatch[1];
  
  // Convert class to className
  jsx = jsx.replace(/class=/g, 'className=');
  // Convert style="..." to style={{...}} is hard with regex, hope there are no inline styles, wait Stitch doesn't use inline styles.
  
  // Close img tags
  jsx = jsx.replace(/<img([^>]*)>/g, (match, attrs) => {
    if (attrs.endsWith('/')) return match;
    return `<img${attrs} />`;
  });
  
  // Close input tags
  jsx = jsx.replace(/<input([^>]*)>/g, (match, attrs) => {
    if (attrs.endsWith('/')) return match;
    return `<input${attrs} />`;
  });
  
  // Replace links in sidebar
  jsx = jsx.replace(/<a([^>]*?)>([\s\S]*?)<span[^>]*>Dashboard<\/span>\s*<\/a>/gi, (match, p1, p2) => `<Link href="/dashboard" ${p1.replace(/href="[^"]*"/, '')}>${p2}<span>Dashboard</span></Link>`);
  jsx = jsx.replace(/<a([^>]*?)>([\s\S]*?)<span[^>]*>Fleet<\/span>\s*<\/a>/gi, (match, p1, p2) => `<Link href="/vehicles" ${p1.replace(/href="[^"]*"/, '')}>${p2}<span>Fleet</span></Link>`);
  jsx = jsx.replace(/<a([^>]*?)>([\s\S]*?)<span[^>]*>Drivers<\/span>\s*<\/a>/gi, (match, p1, p2) => `<Link href="/drivers" ${p1.replace(/href="[^"]*"/, '')}>${p2}<span>Drivers</span></Link>`);
  jsx = jsx.replace(/<a([^>]*?)>([\s\S]*?)<span[^>]*>Trips<\/span>\s*<\/a>/gi, (match, p1, p2) => `<Link href="/dispatcher" ${p1.replace(/href="[^"]*"/, '')}>${p2}<span>Trips</span></Link>`);
  jsx = jsx.replace(/<a([^>]*?)>([\s\S]*?)<span[^>]*>Maintenance<\/span>\s*<\/a>/gi, (match, p1, p2) => `<Link href="/maintenance" ${p1.replace(/href="[^"]*"/, '')}>${p2}<span>Maintenance</span></Link>`);
  jsx = jsx.replace(/<a([^>]*?)>([\s\S]*?)<span[^>]*>Fuel &amp; Expenses<\/span>\s*<\/a>/gi, (match, p1, p2) => `<Link href="/fuel" ${p1.replace(/href="[^"]*"/, '')}>${p2}<span>Fuel &amp; Expenses</span></Link>`);
  jsx = jsx.replace(/<a([^>]*?)>([\s\S]*?)<span[^>]*>Analytics<\/span>\s*<\/a>/gi, (match, p1, p2) => `<Link href="/reports" ${p1.replace(/href="[^"]*"/, '')}>${p2}<span>Analytics</span></Link>`);
  jsx = jsx.replace(/<a([^>]*?)>([\s\S]*?)<span[^>]*>Settings<\/span>\s*<\/a>/gi, (match, p1, p2) => `<Link href="/settings" ${p1.replace(/href="[^"]*"/, '')}>${p2}<span>Settings</span></Link>`);

  // Also auth login button
  jsx = jsx.replace(/<button([^>]*?)>([^<]*?)Sign In([^<]*?)<\/button>/gi, '<Link href="/dashboard"><button $1>$2Sign In$3</button></Link>');

  return `import Link from 'next/link';\n\nexport default function Page() {\n  return (\n    <>\n      ${jsx}\n    </>\n  );\n}`;
}

async function run() {
  const data = JSON.parse(fs.readFileSync(screensListPath, 'utf8'));
  
  let tailwindConfigExtracted = false;
  
  for (const screen of data.screens) {
    const title = screen.title;
    const targetPath = screenToPath[title];
    
    if (targetPath) {
      console.log(`Processing ${title}...`);
      const html = await fetchHtml(screen.htmlCode.downloadUrl);
      
      // Extract tailwind config once
      if (!tailwindConfigExtracted) {
        const configMatch = html.match(/tailwind\.config\s*=\s*({[\s\S]*?})\s*<\/script>/);
        if (configMatch) {
          const configStr = configMatch[1];
          const twConfig = `/** @type {import('tailwindcss').Config} */\nmodule.exports = ${configStr};`;
          fs.writeFileSync('tailwind.config.js', twConfig);
          console.log('Saved tailwind.config.js');
          tailwindConfigExtracted = true;
        }
      }
      
      const jsxContent = processHtmlToJsx(html);
      
      // Write file
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, jsxContent);
      console.log(`Saved ${targetPath}`);
    }
  }
}

run().catch(console.error);
