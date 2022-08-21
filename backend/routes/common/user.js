const express = require('express');
const { authAdmin, authUserPublic } = require('../../middleware/auth');
var router = express.Router();
const User = require('../../models/common/User');
const { JsonResponse } = require('../../utils/JsonResponse');
const { checkPreference } = require('../../utils/PreferenceManager');

router.get('/all', authAdmin, async (req, res) => {
  const { page = 1, limit = 100 } = req.query;

  try {
    // execute query with page and limit values
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort('-createdAt')
      .exec();

    // get total documents in the Users collection
    const count = await User.countDocuments();

    // return response with users, total pages, and current page
    res.json(
      JsonResponse(true, {
        users,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    );
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

// Function to change the role of a user
router.post('/change-role/:userId', authAdmin, async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);

    user.role = req.body.newRole;
    await user.save();
    res.json(JsonResponse(true, user));
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

router.get('/recomended', authUserPublic, async (req, res) => {
  try {
    let users = await User.find({});

    users = users
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    final = users.slice(0, 3);
    if (req.user) {
      users = users.filter((user) => {
        let isFriend = false;
        let friends = user.profile.friends;
        friends.map((friend) => {
          console.log(friend.user);
          if (friend.user === req.user.user_id) {
            isFriend = true;
          }
        });
        console.log(isFriend);
        return !isFriend;
      });
      const user = await User.findOne({ _id: req.user.user_id });
      let recomendation = users.filter((u) => {
        return checkPreference(u.profile.preferences, user.profile.preferences);
      });

      let others = users.filter((u) => {
        return !checkPreference(
          u.profile.preferences,
          user.profile.preferences
        );
      });
      final = [...recomendation, ...others].slice(0, 3);
    }
    res.json(JsonResponse(true, final));
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

module.exports = router;
