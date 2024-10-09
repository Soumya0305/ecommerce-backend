const express = require('express');
const Address = require('../models/Address');
const router = express.Router();
const authenticationToken = require('../middleware/auth');


router.post('/add-new-address', authenticationToken, async (req, res) => {
    const { houseNumber, addressLine, locality, city, state, pincode, name, mobileNumber, isDefault } = req.body;
    const userId = req.user.id;

    try {
        // Check if the user already has addresses
        const userAddress = await Address.findOne({ userId });

        // If user doesn't have an address entry, create one
        if (!userAddress) {
            const newAddress = new Address({
                userId,
                addresses: [{
                    houseNumber,
                    addressLine,
                    locality,
                    city,
                    state,
                    pincode,
                    name,
                    mobileNumber,
                    isDefault: isDefault || false
                }]
            });
            await newAddress.save();
            return res.status(201).json(newAddress);
        }

        // If the user already has an address entry, add the new address to the array
        userAddress.addresses.push({
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

        // If the new address is set as default, update all others to not default
        if (isDefault) {
            await Address.updateMany(
                { userId },
                { "addresses.$[].isDefault": false } // Update all addresses to not default
            );
        }

        await userAddress.save(); // Save the updated userAddress document
        res.status(200).json(userAddress); // Respond with the updated document
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
});

router.get('/all-address', authenticationToken, async(req, res) => {
    const userId = req.user.id;

    try {
        const userAddress = await Address.findOne({ userId });
        if(!userAddress){
            return res.status(404).json({ message: "No address found" });
        }
        res.json(userAddress?.addresses ? userAddress?.addresses : []);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error});
        console.error(error)
      }
});

module.exports = router;
