import fs from 'fs';
import path from 'path';

const dataFilePath = path.resolve('../frontend/src/data/productsData.js');
let content = fs.readFileSync(dataFilePath, 'utf8');

// Quick and dirty extraction of the array
const arrayStart = content.indexOf('[');
const arrayEnd = content.lastIndexOf('];') + 1;
const arrayString = content.substring(arrayStart, arrayEnd);

// To safely eval the array string into a javascript object:
const products = eval(arrayString);

fetch('http://localhost:5000/api/products/seed', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(products)
}).then(res => res.json())
  .then(data => console.log('Seeding result:', data))
  .catch(err => console.error('Error seeding:', err));
