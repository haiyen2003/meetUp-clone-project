const express = require('express');

const { Group, Membership, User, Venue, GroupImage, sequelize, Event, EventImage, Attendance } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const router = express.Router();
const { Op } = require('sequelize');
const { check } = require('express-validator');
const attendance = require('../../db/models/attendance');

//delete an image for an event
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const thisEventImage = await EventImage.findByPk(imageId);
    if (!thisEventImage) {
        res.status(404);
        const error = new Error("Event Image couldn't be found");
        error.status = 404;
        return res.json({
            'message': error.message,
            'statusCode': error.status
        });
    }
    const thisEventId = thisEventImage.eventId;

    const thisEvent = await Event.findByPk(thisEventId);
    if (!thisEvent) {
        res.status(404);
        const error = new Error("Cannot found relationship between event and image");
        error.status = 404;
        return res.json({
            'message': error.message,
            'statusCode': error.status
        });
    }
    const thisGroupId = thisEvent.groupId;
    const thisGroupEvent = await Group.findByPk(thisGroupId);

    const currentStatus = await Membership.findOne({
        where: {
            groupId: thisGroupEvent.id,
            userId: req.user.id
        }
    })

    if (thisGroupEvent.organizerId === req.user.id || currentStatus.status === 'co-host') {
        await thisEventImage.destroy();
        res.status(200);
        return res.json({
            'message': "Successfully deleted",
            'statusCode': 200
        })
    } else {
        throw new Error('Unauthorized');
    }
})



module.exports = router;