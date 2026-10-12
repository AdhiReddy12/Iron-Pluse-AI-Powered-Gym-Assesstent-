const fs = require('fs');
const path = require('path');

const iconMap = {
    'LayoutDashboard': 'SquaresFour',
    'Dumbbell': 'Barbell',
    'Utensils': 'ForkKnife',
    'BrainCircuit': 'Brain',
    'Scale': 'Scales',
    'User': 'User',
    'Flame': 'Fire',
    'LogOut': 'SignOut',
    'ChevronDown': 'CaretDown',
    'Keyboard': 'Keyboard',
    'Activity': 'Activity',
    'Timer': 'Timer',
    'Ruler': 'Ruler',
    'Cake': 'Cake',
    'Calendar': 'Calendar',
    'BarChart2': 'ChartBar',
    'Target': 'Target',
    'Zap': 'Lightning',
    'HeartPulse': 'Heartbeat',
    'Sprout': 'Plant',
    'Sparkles': 'Sparkle',
    'Rocket': 'RocketLaunch',
    'AlertCircle': 'WarningCircle',
    'CheckCircle2': 'CheckCircle',
    'Sunrise': 'SunHorizon',
    'Moon': 'Moon',
    'X': 'X',
    'ExternalLink': 'ArrowSquareOut',
    'MailCheck': 'EnvelopeSimpleOpen',
    'XCircle': 'XCircle',
    'Loader2': 'SpinnerGap',
    'Lock': 'Lock',
    'Check': 'Check',
    'Eye': 'Eye',
    'EyeOff': 'EyeClosed',
    'RefreshCw': 'ArrowsClockwise',
    'Mail': 'Envelope',
    'Key': 'Key',
    'Search': 'MagnifyingGlass',
    'Leaf': 'Leaf',
    'Sun': 'Sun',
    'Trash2': 'Trash',
    'Heart': 'Heart',
    'Save': 'FloppyDisk',
    'RotateCcw': 'ArrowCounterClockwise',
    'Bike': 'Bicycle',
    'Waves': 'Waves',
    'Footprints': 'Footprints',
    'Repeat': 'Repeat',
    'ClipboardList': 'ClipboardText',
    'Lightbulb': 'Lightbulb',
    'CheckCircle': 'CheckCircle',
    'Info': 'Info',
    'Calculator': 'Calculator',
    'Bot': 'Robot',
    'Send': 'PaperPlaneRight',
    'Minimize2': 'ArrowsInSimple',
    'GripHorizontal': 'DotsSix',
    'AlertTriangle': 'Warning',
    'ShieldCheck': 'ShieldCheck',
    'Droplets': 'Drop',
    'Edit': 'PencilSimple',
    'Menu': 'List'
};

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            processFile(fullPath);
        }
    }
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // Use [^{}]+ instead of [\s\S]+? to prevent crossing import boundaries
    const importRegex = /import\s+\{([^{}]+)\}\s+from\s+['"]lucide-react['"];?/g;
    
    content = content.replace(importRegex, (match, importsStr) => {
        modified = true;
        
        const imports = importsStr.split(',').map(i => i.trim()).filter(i => i);
        
        const newImports = [];
        for (let imp of imports) {
            if (iconMap[imp]) {
                newImports.push(`${iconMap[imp]} as ${imp}`);
            } else {
                newImports.push(`${imp} /* NOT MAPPED */`);
                console.log(`Warning: Icon not mapped: ${imp}`);
            }
        }
        
        return `import { ${newImports.join(', ')} } from '@phosphor-icons/react';`;
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${filePath}`);
    }
}

processDirectory('./src');
