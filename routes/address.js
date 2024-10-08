const express = require('express');
const Address = require('../models/Address');
const router = express.Router();
const authenticationToken = require('../middleware/auth');


router.post('/add-new-address', authenticationToken, async (req, res) => {
    const { houseNumber, addressLine, locality, city, state, pincode, name, mobileNumber, isDefault } = req.body;
    const userId = req.user.id;

    try{
        if(isDefault){
            await Address.updateMany({userId}, {isDefault: false});
        }
        const newAddress = new Address({
            userId,
            houseNumber,
            addressLine,
            locality,
            city,
            state,
            pincode,
            name,
            mobileNumber,
            isDefault: isDefault || false
        });
        await newAddress.save();
        res.status(201).json(newAddress);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
});

router.get('/all-address', authenticationToken, async(req, res) => {
    const userId = req.user.id;

    try {
        const address = Address.find({userId});
        res.json(address ? address : []);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error});
      }
});

module.exports = router;
