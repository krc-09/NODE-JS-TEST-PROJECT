const Shop = require('../Models/Shop');

// Get all expenses
exports.getAdditems = (req, res, next) => {
   Shop.findAll()
        .then(items => {
            res.status(200).json(items); // Return the array directly
        })
        .catch(err => {
            console.error('Error fetching items:', err);
            res.status(500).json({ error: 'An error occurred' });
        });
};

// Add a new expense
exports.postAdditems = (req, res, next) => {
  const item = req.body.item;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const description = req.body.description;

  if (!price) {
      return res.status(400).json({ error: 'Price is mandatory' });
  }
  if (!quantity) {
      return res.status(400).json({ error: 'quantity is mandatory' });
  }

  Shop.create({
      item: item,  
      quantity: quantity,
      description: description,
      price:price

  })
  .then(() => {
      return Shop.findAll(); 
  })
  .then(items => {
      res.status(201).json(items);
  })
  .catch(err => {
      console.error('Error adding items:', err);
      res.status(500).json({ error: 'An error occurred' });
  });
};



exports.updateItemQuantity = (req, res, next) => {
    const itemId = req.params.itemId;
    const quantityToBuy = req.body.quantityToBuy;

    Shop.findByPk(itemId)
        .then(item => {
            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }
            const newQuantity = item.quantity - quantityToBuy;
            if (newQuantity < 0) {
                return res.status(400).json({ error: 'Not enough quantity available' });
            }
            item.quantity = newQuantity;
            return item.save();
        })
        .then(() => {
            return Shop.findAll(); // Fetch updated items to display
        })
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            console.error('Error updating quantity:', err);
            res.status(500).json({ error: 'An error occurred' });
        });
};
