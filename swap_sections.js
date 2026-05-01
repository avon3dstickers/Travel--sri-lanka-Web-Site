const fs = require('fs');
const path = 'f:\\Web Design\\Tuskerways\\web templates\\2\\sri-lanka-edit.html';
let content = fs.readFileSync(path, 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

// Extract See Plan Do section
const seePlanDoRegex = /<section id="sl-header-section"[\s\S]*?<\/section>/;
const seePlanDoMatch = content.match(seePlanDoRegex);

// Extract Live Conditions section
const liveConditionsRegex = /<section class="py-24 relative overflow-hidden" id="weather-section">[\s\S]*?<\/section>/;
const liveConditionsMatch = content.match(liveConditionsRegex);

if (seePlanDoMatch && liveConditionsMatch) {
    let seePlanDo = seePlanDoMatch[0];
    let liveConditions = liveConditionsMatch[0];

    // Swap them in the content
    // We replace the first one with a placeholder, then replace the second one with the first, then replace placeholder with the second.
    // Actually, it's easier to just find the range and swap.
    
    const firstPos = content.indexOf(seePlanDo);
    const secondPos = content.indexOf(liveConditions);
    
    if (firstPos < secondPos) {
        // order is SeePlanDo then LiveConditions
        const newContent = content.substring(0, firstPos) + 
                           liveConditions + 
                           "\n\n\n" + 
                           seePlanDo + 
                           content.substring(secondPos + liveConditions.length);
        fs.writeFileSync(path, newContent, 'utf8');
        console.log("Successfully swapped See Plan Do and Live Conditions sections.");
    } else {
        console.log("Sections are already in the requested order or reversed.");
    }
} else {
    console.log("Could not find one or both sections.");
    if (!seePlanDoMatch) console.log("Missing See Plan Do");
    if (!liveConditionsMatch) console.log("Missing Live Conditions");
}
