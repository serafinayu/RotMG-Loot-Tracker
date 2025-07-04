cd ./client/src/assets && node -e "
const fs = require('fs');
const content = fs.readFileSync('assets.js', 'utf8');

// Extract the array portion that starts with the bracket
const arrayStartIndex = content.indexOf('[');
if (arrayStartIndex === -1) {
  console.error('Could not find array start');
  process.exit(1);
}

const arrayContent = content.substring(arrayStartIndex);
const arrayEndIndex = arrayContent.lastIndexOf(']');
if (arrayEndIndex === -1) {
  console.error('Could not find array end');
  process.exit(1);
}

const itemsArrayString = arrayContent.substring(0, arrayEndIndex + 1);

// Parse the items array
let itemsArray;
try {
  itemsArray = JSON.parse(itemsArrayString);
} catch (e) {
  console.error('Error parsing items array:', e.message);
  process.exit(1);
}

// Convert array to object using _id as key
const itemsObject = {};
itemsArray.forEach(item => {
  const id = item._id;
  // Remove the _id from the item object since it's now the key
  const { _id, ...itemData } = item;
  itemsObject[id] = itemData;
});

console.log('Successfully converted', itemsArray.length, 'items to object structure');
console.log('Sample keys:', Object.keys(itemsObject).slice(0, 5));

// Write the new structure
const newContent = \`import userImg from './userImg.png';

export const assets = {
    userImg,
}

export const collections = {
    \"_id\": \"660a8f9b1e4c2d3f56d0b789\",
    \"name\": \"Season 11\",
    items: [
        {
            itemId: 1,
            quantity: 2,
        },
        {
            itemId: 7,
            quantity: 2,
        },
        {
            itemId: 42,
            quantity: 5,
        }
    ]
}

export const items = \${JSON.stringify(itemsObject, null, 4)};
\`;

fs.writeFileSync('assets.js', newContent);
console.log('File restructured successfully!');
"