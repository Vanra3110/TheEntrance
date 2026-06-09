const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Find backtick instances first
            let newContent = content.replace(/`http:\/\/localhost:5000([^`]*)`/g, function(match, p1) {
                return `\`\${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${p1}\``;
            });

            // Single quotes
            newContent = newContent.replace(/'http:\/\/localhost:5000([^']*)'/g, function(match, p1) {
                 return `\`\${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${p1}\``;
            });

            // Double quotes
            newContent = newContent.replace(/"http:\/\/localhost:5000([^"]*)"/g, function(match, p1) {
                 return `\`\${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${p1}\``;
            });
            
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log('Updated', fullPath);
            }
        }
    }
}

replaceInDir(path.join(__dirname, 'frontend/src'));
console.log("Done replacing API URLs.");
