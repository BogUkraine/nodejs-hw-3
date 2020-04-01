const {Router} = require('express');
// eslint-disable-next-line new-cap
const router = Router();
const auth = require('../middleware/auth.middleware');
const Load = require('../models/Load');
const Truck = require('../models/Truck');

const validate = require('../middleware/valid.middleware');
const validLoad = require('../validation/load.validation');

//* **** POST ******//

router.post('/', auth, validate(validLoad.create, 'body'), async (req, res) => {
  try {
    const id = req.user.userId;
    const form = req.body;

    const load = await Load.create({
      ...form,
      created_by: id,
      logs: [{
        message: `url: ${req.url},
                  method: ${req.method},
                  host: ${req.host},
                  params: ${req.params},
                  body: ${req.body}`,
        time: Date.now(),
      }],
    });

    if (!load) {
      return res.status(500).json({message: 'Load was not created'});
    }

    load.save();
    return res.status(201).json({message: 'Load was successfully created'});
  } catch (error) {
    return res.status(500).json({
      message: 'Load wasn\'t created', error: error,
    });
  }
});

//* **** GET ******//

router.get('/shipper',
    auth, async (req, res) => {
      try {
        const userId = req.user.userId;

        const loads = await Load.find({created_by: userId});

        return res.status(201).json(loads);
      } catch (error) {
        return res.status(500).json({
          message: 'Loads were not fetched', error: error,
        });
      }
    });

router.get('/driver',
    auth, async (req, res) => {
      try {
        const userId = req.user.userId;
        const loads = await Load.find({assigned_to: userId});

        return res.status(201).json(loads);
      } catch (error) {
        return res.status(500).json({
          message: 'Loads were not fetched', error: error,
        });
      }
    });

//* **** PUT ******//

router.put('/:id/data',
    auth, validate(validLoad.change, 'body'), async (req, res) => {
      try {
        const loadId = req.params.id;

        const item = await Load.findById(loadId);
        if (!item) {
          return res.status(500).json({message: 'Load does not exist'});
        }
        const logs = item.logs;

        await Load.findByIdAndUpdate(
            loadId,
            {
              ...req.body,
              logs: [...logs, {
                message: `url: ${req.url},
                method: ${req.method},
                host: ${req.host},
                params: ${req.params},
                body: ${req.body}`,
                time: Date.now(),
              }],
            },
        );

        return res.status(201).json({message: 'Load was successfully changed'});
      } catch (error) {
        return res.status(500).json({
          message: 'Load was not changed', error: error,
        });
      }
    });

router.put('/:id/status',
    auth, async (req, res) => {
      try {
        const loadId = req.params.id;
        const {dimensions, payload} = req.body;

        const load = await Load.findById(loadId);
        if (!load) {
          return res.status(500).json({message: 'Load does not exist'});
        }

        const fittingTrucks = await Truck.find({
          status: 'IS',
          is_assigned: true,
        });

        if (!fittingTrucks) {
          return res.status(500).json({
            message: 'There are no fitting trucks at this moment',
          });
        }

        const fittingTruck = fittingTrucks.find((item) => {
          return (
            item.sizes.width >= dimensions.width &&
            item.sizes.height >= dimensions.height &&
            item.sizes.length >= dimensions.length &&
            item.weight >= payload
          );
        });

        if (!fittingTruck) {
          return res.status(500).json({
            message: 'There are no fitting trucks at this moment',
          });
        }

        const logs = load.logs;

        await Truck.findByIdAndUpdate(fittingTruck._id, {status: 'OL'});
        await Load.findByIdAndUpdate(loadId,
            {
              assigned_to: fittingTruck.created_by,
              status: 'ASSIGNED',
              state: 'En route to Pick up',
              logs: [...logs, {
                message: `url: ${req.url},
                method: ${req.method},
                host: ${req.host},
                params: ${req.params},
                body: ${req.body}`,
                time: Date.now(),
              }],
            });

        return res.status(201).json({
          message: 'Load was successfully assigned',
        });
      } catch (error) {
        return res.status(500).json({
          message: 'Load was not assigned', error: error,
        });
      }
    });

router.put('/:id/shipped',
    auth, async (req, res) => {
      try {
        const loadId = req.params.id;

        const item = await Load.findById(loadId);
        if (!item) {
          return res.status(500).json({message: 'Load does not exist'});
        }

        const truck = await Truck.findOne({
          created_by: item.assigned_to, is_assigned: true,
        });
        if (!truck) {
          return res.status(500).json({message: 'Truck does not found'});
        }
        const logs = item.logs;

        await Load.findByIdAndUpdate(
            loadId,
            {
              status: 'Arrived to Delivery',
              state: 'SHIPPED',
              logs: [...logs, {
                message: `url: ${req.url},
                method: ${req.method},
                host: ${req.host},
                params: ${req.params},
                body: ${req.body}`,
                time: Date.now(),
              }],
            },
        );

        await Truck.findByIdAndUpdate(truck._id, {
          status: 'IS',
        });

        return res.status(201).json({message: 'Load was successfully shipped'});
      } catch (error) {
        return res.status(500).json({
          message: 'Load was not shipped', error: error,
        });
      }
    });

//* **** DELETE ******//

router.delete('/:id',
    auth, async (req, res) => {
      try {
        const loadId = req.params.id;

        await Load.findByIdAndDelete(loadId);

        return res.status(201).json({message: 'Load was successfully deleted'});
      } catch (error) {
        return res.status(500).json({
          message: 'Load was not deleted', error: error,
        });
      }
    });

module.exports = router;
