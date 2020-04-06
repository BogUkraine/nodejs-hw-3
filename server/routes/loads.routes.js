const {Router} = require('express');
// eslint-disable-next-line new-cap
const router = Router();
const auth = require('../middleware/auth.middleware');
const Load = require('../models/Load');
const Truck = require('../models/Truck');

const validate = require('../middleware/valid.middleware');
const validLoad = require('../validation/load.validation');

//* **** POST ******//

/**
 * @api {post} /api/loads/ create load.
 * @apiName PostLoad
 * @apiGroup loads
 *
 * @apiHeader {String} authorization User's jwt from local storage.
 * @apiParam {Object} dimensions load's dimensions.
 * @apiParam {Number} payload load's payload.
 * @apiParam {Number} dimensions.width load's width.
 * @apiParam {Number} dimensions.height load's height.
 * @apiParam {Number} dimensions.length load's length.
 * @apiParam {String{10...}} [message] load's additional message.
 * @apiParam {String} status='NEW' load's additional message.
 * @apiParam {String} state='Waiting' load's additional message.
 *
 * @apiSuccess {String} message Load was successfully created.
 *
 * @apiError UserIsntAuthorized User is not authorized.
 * @apiError LoadWasntCreated Load wasn\'t created.
 */

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

/**
 * @api {get} /api/loads/shipper get shipper's loads.
 * @apiName GetLoads
 * @apiGroup loads
 *
 * @apiHeader {String} authorization User's jwt from local storage.
 *
 * @apiSuccess {Object[]} loads shipper's loads.
 *
 * @apiError UserIsntAuthorized User is not authorized.
 * @apiError LoadsWerntFetched Loads were not fetched.
 */

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

/**
 * @api {get} /api/loads/driver get driver's loads.
 * @apiName GetLoads
 * @apiGroup loads
 *
 * @apiHeader {String} authorization User's jwt from local storage.
 *
 * @apiSuccess {Object[]} loads driver's loads.
 *
 * @apiError UserIsntAuthorized User is not authorized.
 * @apiError LoadsWerntFetched Loads were not fetched.
 */

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

/**
 * @api {put} /api/loads/:id/data change load info
 * @apiName PutLoad
 * @apiGroup loads
 *
 * @apiHeader {String} authorization User's jwt from local storage.
 * @apiParam {Object} dimensions load's dimensions.
 * @apiParam {Number} payload load's payload.
 * @apiParam {Number} dimensions.width load's width.
 * @apiParam {Number} dimensions.height load's height.
 * @apiParam {Number} dimensions.length load's length.
 * @apiParam {String{10...}} [message] load's additional message.
 *
 * @apiSuccess {String} message Load was successfully changed.
 *
 * @apiError UserIsntAuthorized User is not authorized.
 * @apiError LoadWasntChanged Load wasn't changed.
 * @apiError LoadDoesntExist Load doesn't exist.
 */

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

/**
 * @api {put} /api/loads/:id/status send load to system to find suitable truck
 * @apiName PutLoad
 * @apiGroup loads
 *
 * @apiHeader {String} authorization User's jwt from local storage.
 *
 * @apiSuccess {String} message Load was successfully assigned.
 *
 * @apiError UserIsntAuthorized User is not authorized.
 * @apiError LoadWasntAssigned Load wasn't assigned.
 * @apiError LoadDoesntExist Load doesn't exist.
 * @apiError TruckDoesntExist There are no fitting trucks at this moment.
 */

router.put('/:id/status',
    auth, async (req, res) => {
      try {
        const loadId = req.params.id;

        const load = await Load.findById(loadId);
        if (!load) {
          return res.status(500).json({message: 'Load does not exist'});
        }

        const fittingTruck = await Truck
            .where('is_assigned').equals(true)
            .where('status').equals('IS')
            .where('weight').gt(load.payload)
            .where('sizes.width').gt(load.dimensions.width)
            .where('sizes.length').gt(load.dimensions.length)
            .where('sizes.height').gt(load.dimensions.height)
            .findOne();

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

/**
 * @api {put} /api/loads/:id/shipped driver had operated with load and shippedit
 * @apiName PutLoad
 * @apiGroup loads
 *
 * @apiHeader {String} authorization User's jwt from local storage.
 *
 * @apiSuccess {String} message Load was successfully shipped.
 *
 * @apiError UserIsntAuthorized User is not authorized.
 * @apiError LoadWasntAssigned Load wasn't shipped.
 * @apiError LoadDoesntExist Load doesn't exist.
 * @apiError TruckDoesntExist Truck was not found.
 */

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
          return res.status(500).json({message: 'Truck was not found'});
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

/**
 * @api {put} /api/loads/:id deleting load by id
 * @apiName DeleteLoad
 * @apiGroup loads
 *
 * @apiHeader {String} authorization User's jwt from local storage.
 *
 * @apiSuccess {String} message Load was successfully deleted.
 *
 * @apiError UserIsntAuthorized User is not authorized.
 * @apiError LoadWasntAssigned Load wasn't deleted.
 */

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
