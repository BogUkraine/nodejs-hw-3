const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const Truck = require('../models/Truck');
const auth = require('../middleware/auth.middleware');

router.post('/add', auth, async (req, res) => {
    try {
        const id = req.user.userId;
        const {sizes, weight, type} = req.body;

        const truck = new Truck({
            created_by: id, status: 'IS', sizes, weight, type
        })

        await truck.save();

        return res.status(201).json({message: 'Truck was successfully added'});
    }
    catch (error) {
        return res.status(500).json({message: 'Truck wasn\'t added', error: error});
    };
});

router.get('/mytrucks', auth, async (req, res) => {
    try {
        const id = req.user.userId;
        const trucks = await Truck.find({created_by: id});
        
        return res.status(201).json(trucks);
    }
    catch (error) {
        return res.status(500).json({message: 'Truck wasn\'t added', error: error});
    };
});

router.put('/assign', auth, async (req, res) => {
    try {
        const {truck_id} = req.body;
        const user_id = req.user.userId;

        await Truck.findOneAndUpdate({assigned_to: user_id}, {assigned_to: null});
        const newAssignedTruck = await Truck.findByIdAndUpdate(truck_id, {assigned_to: user_id});
        
        return res.status(201).json({message: 'Truck was successfully assigned', newAssignedTruck});
    }
    catch (error) {
        return res.status(500).json({message: 'Truck wasn\'t assigned', error: error});
    };
});

router.delete('/delete', async (req, res) => {
    try {
        const {truck_id} = req.body;
        await Truck.findOneAndDelete(truck_id);

        return res.status(201).json({message: 'Truck was successfully deleted'});
    }
    catch (error) {
        return res.status(500).json({message: 'Truck wasn\'t added', error: error});
    };
});

module.exports = router;