const mongoose = require('mongoose');
const { Schema } = mongoose;

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/crud_testing', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose schema
const itemSchema = new Schema({
  name: String,
  description: String,
});

// Create a Mongoose model
const Item = mongoose.model('Item', itemSchema);

// Create a new item (Create operation)
async function createItem(name, description) {
  const newItem = new Item({ name, description });
  await newItem.save();
  console.log('Item created:', newItem);
}

// Find items (Read operation)
async function getItems() {
  const items = await Item.find();
  console.log('Items found:', items);
}

// Update an item (Update operation)
async function updateItem(name, description) {
  const result = await Item.updateOne({ name }, { description });
  console.log('Item updated:', result);
}

// Delete an item (Delete operation)
async function deleteItem(name) {
  await Item.deleteOne({ name });
  console.log('Item deleted');
}

// Example usage:

// Create a new item
createItem('rais Faridi', 'rais is an software developer');

// Find all items
getItems();

// Update an item
updateItem('Sameer', 'Updated description to sdfasdfasfdasdfasdfasdfasdfas'); 

// Delete an item
deleteItem('rais Faridi');
