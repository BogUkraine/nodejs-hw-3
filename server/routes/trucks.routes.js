const {Router} = require('express');
// eslint-disable-next-line new-cap
const router = Router();
const Truck = require('../models/Truck');
const auth = require('../middleware/auth.middleware');

const validate = require('../middleware/valid.middleware');
const validTruck = require('../validation/truck.validation');

//* **** POST ******//

router.post('/:id',
    auth, validate(validTruck.create, 'body'), async (req, res) => {
      try {
        const id = req.params.id;
        const jwtId = req.user.userId;
        if (id !== jwtId) {
          res.status(401).json({message: 'User has no permissions'});
        }

        const {sizes, weight, type, name} = req.body;

        const truck = new Truck({
          created_by: id, status: 'IS', sizes, weight, type, name,
        });

        await truck.save();

        return res.status(201).json({message: 'Truck was successfully added'});
      } catch (error) {
        return res.status(500).json({
          message: 'Truck wasn\'t added', error: error,
        });
      }
    });

//* **** GET ******//

router.get('/', auth, async (req, res) => {
  try {
    const id = req.user.userId;

    const trucks = await Truck.find({created_by: id});

    return res.status(201).json(trucks);
  } catch (error) {
    return res.status(500).json({message: 'Truck wasn\'t added', error: error});
  }
});

//* **** PUT ******//

router.put('/:id/assign', auth, async (req, res) => {
  try {
    const truckId = req.params.id;
    const userId = req.user.userId;

    await Truck.findOneAndUpdate({assigned_to: userId}, {assigned_to: null});
    await Truck.findByIdAndUpdate(truckId, {assigned_to: userId});

    return res.status(201).json({
      message: 'Truck was successfully assigned',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Truck wasn\'t assigned', error: error,
    });
  }
});

router.put('/:id/name', auth, async (req, res) => {
  try {
    const truckId = req.params.id;
    const {name} = req.body;

    await Truck.findByIdAndUpdate(truckId, {name});

    return res.status(201).json({
      message: 'Truck was successfully renamed',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Truck wasn\'t renamed', error: error,
    });
  }
});

//* **** DELETE ******//

router.delete('/:id', auth, async (req, res) => {
  try {
    const truckId = req.params.id;
    await Truck.findOneAndDelete(truckId);

    return res.status(201).json({message: 'Truck was successfully deleted'});
  } catch (error) {
    return res.status(500).json({message: 'Truck wasn\'t added', error: error});
  }
});

module.exports = router;
