const {Router} = require('express');
// eslint-disable-next-line new-cap
const router = Router();
const Truck = require('../models/Truck');
const auth = require('../middleware/auth.middleware');

router.post('/add', auth, async (req, res) => {
  try {
    const id = req.user.userId;
    const {sizes, weight, type} = req.body;

    const truck = new Truck({
      created_by: id, status: 'IS', sizes, weight, type,
    });

    await truck.save();

    return res.status(201).json({message: 'Truck was successfully added'});
  } catch (error) {
    return res.status(500).json({message: 'Truck wasn\'t added', error: error});
  }
});

router.get('/mytrucks', auth, async (req, res) => {
  try {
    const id = req.user.userId;
    const trucks = await Truck.find({created_by: id});

    return res.status(201).json(trucks);
  } catch (error) {
    return res.status(500).json({message: 'Truck wasn\'t added', error: error});
  }
});

router.put('/assign', auth, async (req, res) => {
  try {
    const {truckId} = req.body;
    const userId = req.user.userId;

    await Truck.findOneAndUpdate({assigned_to: userId}, {assigned_to: null});
    const newAssignedTruck = await Truck.findByIdAndUpdate(
        truckId, {assigned_to: userId},
    );

    return res.status(201).json({
      message: 'Truck was successfully assigned', newAssignedTruck,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Truck wasn\'t assigned', error: error,
    });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const {truckId} = req.body;
    await Truck.findOneAndDelete(truckId);

    return res.status(201).json({message: 'Truck was successfully deleted'});
  } catch (error) {
    return res.status(500).json({message: 'Truck wasn\'t added', error: error});
  }
});

module.exports = router;
