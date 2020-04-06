const {Router} = require('express');
// eslint-disable-next-line new-cap
const router = Router();
const Truck = require('../models/Truck');
const auth = require('../middleware/auth.middleware');

const validate = require('../middleware/valid.middleware');
const validTruck = require('../validation/truck.validation');

//* **** POST ******//

/**
 * @api {post} /api/trucks/:id create truck by user id.
 * @apiName PostTruck
 * @apiGroup trucks
 *
 * @apiHeader {String} authorization User's jwt from local storage.
 *
 * @apiParam {Object} sizes truck sizes.
 * @apiParam {Number} weight truck can carry this weight.
 * @apiParam {Number} sizes.width truck width.
 * @apiParam {Number} sizes.height truck height.
 * @apiParam {Number} sizes.length truck length.
 * @apiParam {String} name truck name.
 *
 * @apiSuccess {String} message Truck was successfully added.
 *
 * @apiError UserIsntAuthorized User is not authorized.
 * @apiError TruckWasntCreated Truck wasn't created.
 */

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

/**
 * @api {get} /api/trucks/ get trucks.
 * @apiName GetTruck
 * @apiGroup trucks
 *
 * @apiHeader {String} authorization User's jwt from local storage.
 *
 * @apiSuccess {Object[]} trucks user trucks.
 *
 * @apiError UserIsntAuthorized User is not authorized.
 * @apiError TrucksWerntFetched Trucks weren't fetched.
 */

router.get('/', auth, async (req, res) => {
  try {
    const id = req.user.userId;

    const trucks = await Truck.find({created_by: id});

    return res.status(201).json(trucks);
  } catch (error) {
    return res.status(500).json(
        {message: 'Trucks were not fetched', error: error},
    );
  }
});

//* **** PUT ******//

/**
 * @api {put} /api/trucks/:id/assign assign truck by truck id.
 * @apiName PutTruck
 * @apiGroup trucks
 *
 * @apiHeader {String} authorization User's jwt from local storage.
 *
 * @apiSuccess {String} message Truck was successfully assigned.
 *
 * @apiError UserIsntAuthorized User is not authorized.
 * @apiError DriverIsBusy Driver is busy, you can not change any info.
 * @apiError TruckWasntAssigned Truck wasn't assigned.
 */

router.put('/:id/assign', auth, async (req, res) => {
  try {
    const truckId = req.params.id;

    const someTruck = await Truck.findById(truckId);
    const isBusy = await Truck.findOne({
      created_by: someTruck.created_by, status: 'OL',
    });

    if (isBusy) {
      return res.status(500).json({
        message: 'Driver is busy, you can not change any info',
      });
    }

    await Truck.findOneAndUpdate({
      created_by: someTruck.created_by,
      is_assigned: true},
    {is_assigned: false},
    );
    await Truck.findByIdAndUpdate(truckId, {is_assigned: true});

    return res.status(201).json({
      message: 'Truck was successfully assigned',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Truck wasn\'t assigned', error: error,
    });
  }
});

/**
 * @api {put} /api/trucks/:id/name change truck name by truck id.
 * @apiName PutTruck
 * @apiGroup trucks
 *
 * @apiHeader {String} authorization User's jwt from local storage.
 *
 * @apiParam {String} name new truck name.
 *
 * @apiSuccess {String} message Truck was successfully renamed.
 *
 * @apiError UserIsntAuthorized User is not authorized.
 * @apiError DriverIsBusy Driver is busy, you can not change any info.
 * @apiError TruckWasntRenamed Truck wasn't renamed.
 */

router.put('/:id/name',
    auth, validate(validTruck.change, 'body'), async (req, res) => {
      try {
        const truckId = req.params.id;
        const {name} = req.body;

        const someTruck = await Truck.findById(truckId);
        const isBusy = await Truck.findOne({
          created_by: someTruck.created_by, status: 'OL',
        });

        if (isBusy) {
          return res.status(500).json({
            message: 'Driver is busy, you can not change any info',
          });
        }

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

/**
 * @api {delete} /api/trucks/:id delete truck by truck id.
 * @apiName DeleteTruck
 * @apiGroup trucks
 *
 * @apiHeader {String} authorization User's jwt from local storage.
 *
 * @apiSuccess {String} message Truck was successfully deleted.
 *
 * @apiError UserIsntAuthorized User is not authorized.
 * @apiError DriverIsBusy Driver is busy, you can not change any info.
 * @apiError TruckWasntDeleted Truck wasn't deleted.
 */

router.delete('/:id', auth, async (req, res) => {
  try {
    const truckId = req.params.id;
    const someTruck = await Truck.findById(truckId);
    const isBusy = await Truck.findOne({
      created_by: someTruck.created_by, status: 'OL',
    });

    if (isBusy) {
      return res.status(500).json({
        message: 'Driver is busy, you can not change any info',
      });
    }

    await Truck.findOneAndDelete(truckId);

    return res.status(201).json({message: 'Truck was successfully deleted'});
  } catch (error) {
    return res.status(500).json(
        {message: 'Truck wasn\'t deleted', error: error},
    );
  }
});

module.exports = router;
