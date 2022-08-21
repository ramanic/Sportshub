const express = require("express");
var router = express.Router();
const auth = require("../../middleware/auth");
const { JsonResponse, JsonResponseWithMSG } = require("../../utils/JsonResponse");
const { MulterUpload, CloudinaryUpload } = require("../../utils/ImageManager");
const Venue = require("../../models/venue/Venue");
const User = require("../../models/common/User");
const fs = require("fs");
const { VenueSchedule } = require("../../models/venue/VenueSchedule");
const VenueBooking = require("../../models/venue/VenueBooking");
const { addNotification } = require("../../utils/Notification");
const Challenge = require("../../models/common/Challenge");
const { checkPreference } = require("../../utils/PreferenceManager");
const sendgrid = require("../../utils/sendgrid");

router.post("/add", [auth.authUser, MulterUpload.array("images")], async (req, res) => {
  let { name, description, category, highlights, location, city, district, phone } = req.body;

  if (location) {
    location = JSON.parse(location);
  }

  if (highlights) {
    highlights = JSON.parse(highlights);
  }

  let files = req.files;

  try {
    let venueSchedule = await VenueSchedule.create({
      days: [
        {
          day: "sun",
          timing: [],
        },
        {
          day: "mon",
          timing: [],
        },
        {
          day: "tue",
          timing: [],
        },
        {
          day: "wed",
          timing: [],
        },
        {
          day: "thu",
          timing: [],
        },
        {
          day: "fri",
          timing: [],
        },
        {
          day: "sat",
          timing: [],
        },
      ],
    });

    let venue = await Venue.create({
      venueSchedule,
      name,
      description,
      category,
      location,
      address: {
        city,
        district,
      },
      highlights,
      phone,
      owner: req.user.user_id,
    });
    images = [];

    for (const file of files) {
      const { path } = file;
      try {
        imagePath = await CloudinaryUpload(path);
        if (imagePath) {
          images.push(imagePath.url);
        }
        fs.unlinkSync(path);
      } catch (error) {
        console.log(error);
      }
    }
    venue.images = images;

    await venue.save().then((venue) =>
      venue.populate({
        path: "owner",
        select: "name username profile.photo",
      })
    );
    res.status(200).json(JsonResponse(true, venue));
  } catch (error) {
    res.status(500).json(JsonResponse(false, error.message));
  }
});
router.get("/get", async (req, res) => {
  var filter = req.query.filter;
  const { page = 1, limit = 10 } = req.query;
  try {
    let venues = null;
    let count = 0;
    if (filter == "all") {
      venues = await Venue.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate({
          path: "owner",
          select: "name username profile.photo email",
        })
        .populate("saves")
        .sort("-createdAt")
        .exec();
      count = await Venue.countDocuments();
    } else if (filter == "unverified") {
      venues = await Venue.find({ verfied: false })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate({
          path: "owner",
          select: "name username profile.photo email",
        })
        .populate("saves")
        .sort("-createdAt")
        .exec();
      count = await Venue.countDocuments({ verfied: false });
    } else {
      venues = await Venue.find({ verified: true })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate({
          path: "owner",
          select: "name username profile.photo email",
        })
        .populate("saves")
        .sort("-createdAt")
        .exec();
      count = await Venue.countDocuments({ verified: true });
    }

    // get total documents in the Posts collection

    // return response with posts, total pages, and current page
    res.json(
      JsonResponse(true, {
        venues,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    );
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

// Filtered search for venues
router.post("/filtered", async (req, res) => {
  const { page = 1, limit = 500 } = req.query;
  const { sportsFilter, ratingFilter, textFilter } = req.body;
  try {
    venues = await Venue.find({ verified: true })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "owner",
        select: "name username profile.photo email",
      })
      .populate("saves")
      .sort("-createdAt")
      .exec();

    let finalVenues = [...venues];

    // Rating filter
    if (ratingFilter.length > 0) {
      finalVenues = finalVenues.filter((venue) => {
        const sumValues = venue.reviews.reduce((acc, curr) => acc + curr.reviewNumber, 0);
        const averageRating = venue.reviews.length === 0 ? 0 : sumValues / venue.reviews.length;
        return averageRating >= Number(ratingFilter);
      });
    }

    // Sports category filter
    if (sportsFilter.length > 0) {
      finalVenues = finalVenues.filter((venue) =>
        sportsFilter.includes(venue.category.toLowerCase())
      );
    }

    // Text input filter
    if (textFilter.length > 0) {
      finalVenues = finalVenues.filter((venue) =>
        venue.name.toLowerCase().includes(textFilter.toLowerCase())
      );
    }

    res.json(
      JsonResponse(true, {
        venues: finalVenues,
        totalPages: 1,
        currentPage: page,
      })
    );
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

router.post("/update/:id", [auth.authUser, MulterUpload.array("images")], async (req, res) => {
  try {
    let images = [];
    let { name, description, category, highlights, location, city, district, phone } = req.body;
    let venueUpdate = {};
    if (location) {
      location = JSON.parse(location);
      venueUpdate.location = location;
    }
    if (category) {
      venueUpdate.category = category;
    }
    if (city && district) {
      venueUpdate.address = {
        city,
        district,
      };
    }

    if (highlights) {
      highlights = JSON.parse(highlights);
      venueUpdate.highlights = highlights;
    }
    if (name) {
      venueUpdate.name = name;
    }
    if (description) {
      venueUpdate.description = description;
    }
    if (phone) {
      venueUpdate.phone = phone;
    }
    let venue = await Venue.findById(req.params.id);
    if (venue.owner != req.user.user_id) {
      return res.status(401).json(JsonResponse(false, "You are not authorized"));
    }
    if (!venue) {
      return res.status(404).json(JsonResponse(false, "Venue not found"));
    }
    try {
      let files = req.files;
      if (files.length > 0) {
        for (const file of files) {
          const { path } = file;
          try {
            imagePath = await CloudinaryUpload(path);
            if (imagePath) {
              images.push(imagePath.url);
            }
            fs.unlinkSync(path);
          } catch (error) {
            console.log(error);
          }
        }
        venueUpdate.images = images;
      }
    } catch (error) {
      console.log(error.message);
    }
    venue = await Venue.findByIdAndUpdate(req.params.id, venueUpdate, {
      new: true,
    });
    res.status(200).json(JsonResponse(true, venue));
  } catch (error) {
    console.log(error);
    res.status(500).json(JsonResponse(false, error.message));
  }
});

router.post("/schedule/update/:id", auth.authUser, async (req, res) => {
  let { sameEveryday, bookingAllowed, bookingGaps, default_timing, days } = req.body;

  let venue = await Venue.findById(req.params.id);
  if (venue.owner != req.user.user_id) {
    return res.status(401).json(JsonResponse(false, "You are not authorized"));
  }
  if (!venue) {
    return res.status(404).json(JsonResponse(false, "Venue not found"));
  }
  try {
    const venueScheduleUpdate = venue.venueSchedule;

    if (sameEveryday != undefined) {
      venueScheduleUpdate.sameEveryday = sameEveryday;
    }
    if (bookingAllowed != undefined) {
      venueScheduleUpdate.bookingAllowed = bookingAllowed;
    }
    if (default_timing) {
      venueScheduleUpdate.default_timing = default_timing;
    }
    if (bookingGaps) {
      venueScheduleUpdate.bookingGaps = bookingGaps;
    }
    if (days) {
      venueScheduleUpdate.days = days;
    }
    venue.venueSchedule = venueScheduleUpdate;
    await venue.save();
    res.status(200).json(JsonResponse(true, venue));
  } catch (error) {
    res.status(500).json(JsonResponse(false, error.message));
  }
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let venue = await Venue.findById(id)
      .populate("owner")
      .populate({
        path: "reviews.user",
        select: "_id name username profile.photo email",
      })
      .populate("saves");
    res.json(JsonResponse(true, venue));
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});
router.get("/availability/:id", async (req, res) => {
  const { id } = req.params;
  let { date } = req.query;
  const [qyear, qmonth, qday] = date.split("-");
  try {
    let venue = await Venue.findById(id);
    if (!venue.venueSchedule.bookingAllowed) {
      return res.json(JsonResponse(false, "Booking isn't allowed"));
    }
    let schedule = null;
    if (venue.venueSchedule.sameEveryday) {
      schedule = venue.venueSchedule.default_timing;
    } else {
      let day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][date.getDay()];
      schedule = venue.venueSchedule.days.find((data) => data.day === day).timing;
    }

    let availability = await Promise.all(
      schedule.map(async ({ startTime, endTime, price, _id }) => {
        let available = true;
        let blDate;
        let bookedList = await VenueBooking.findOne({
          startTime: startTime,
          endTime: endTime,
          venue: id,
        });
        if (bookedList) {
          blDate = new Date(bookedList.date);
          const year = blDate.getFullYear();
          const month = blDate.getMonth() + 1;
          const day = blDate.getDate();
          if (
            Number(qyear) === Number(year) &&
            Number(qmonth) === Number(month) &&
            Number(qday) === Number(day)
          ) {
            available = false;
          }
        }

        return { _id, startTime, endTime, price, available: available };
      })
    );
    // let availability = await Promise.all(
    //   schedule.map(async ({ startTime, endTime, price, _id }) => {
    //     let available = true;
    //     let bookedList = await VenueBooking.findOne({
    //       startTime: startTime,
    //       endTime: endTime,
    //       date: date,
    //       venue: id,
    //     });

    //     if (bookedList) {
    //       available = false;
    //     }
    //     return { _id, startTime, endTime, price, available: available };
    //   })
    // );
    return res.json(JsonResponse(true, availability));
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

// Function to get my venues
router.get("/my-venues/get", auth.authUser, async (req, res) => {
  try {
    let myVenues = await Venue.find({
      owner: req.user.user_id,
    }).populate("owner");
    res.json(JsonResponse(true, myVenues));
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

// Function to verify a venue
router.post("/verify/:venueId", auth.authAdmin, async (req, res) => {
  try {
    let venue = await Venue.findById(req.params.venueId).populate({
      path: "owner",
      select: "_id name username profile.photo email",
    });
    if (venue.verified) {
      res.json(JsonResponse(true, venue));
    } else {
      venue.verified = true;
      await venue.save();
      console.log(venue);
      addNotification(
        venue.owner._id,
        `Your venue ${venue.name} has been verifed.`,
        "venue-verified",
        venue._id
      );
      sendgrid.sendVenueVerifiedEmail(venue);
      res.json(JsonResponse(true, venue));
    }
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

// Function to save a venue
router.post("/save/:id", auth.authUser, async (req, res) => {
  const { id } = req.params;
  try {
    let venue = await Venue.findOne({ _id: id });
    if (venue) {
      let user = await User.findOne({ _id: req.user.user_id });
      if (user.profile.saved.venues.includes(id)) {
        user.profile.saved.venues.pull(id);
        await user.save();
        venue.saves.pull(req.user.user_id);
        await venue.save();
        venue = await Venue.findOne({ _id: id })
          .populate({
            path: "reviews.user",
            select: "_id name username profile.photo email",
          })
          .populate("saves");
        res.json(JsonResponseWithMSG(true, "Venue Unsaved", venue));
      } else {
        user.profile.saved.venues.push(id);
        await user.save();
        user = await User.findOne({
          _id: req.user.user_id,
        });
        venue.saves.push(req.user.user_id);
        await venue.save();
        venue = await Venue.findOne({ _id: id })
          .populate({
            path: "reviews.user",
            select: "_id name username profile.photo email",
          })
          .populate("saves");
        res.json(JsonResponseWithMSG(true, "Venue Saved", venue));
      }
    } else {
      res.json(JsonResponse(false, "Venue not found"));
    }
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

// Function to review a venue
router.post("/review/:id", auth.authUser, async (req, res) => {
  const newReview = {
    reviewNumber: req.body.reviewNumber,
    reviewText: req.body.reviewText,
    user: req.user.user_id,
  };
  try {
    const venue = await Venue.findById(req.params.id);
    venue.reviews.push(newReview);

    await venue.save();
    await venue.populate({
      path: "reviews.user",
      select: "_id name username profile.photo email",
    });
    await venue.populate("owner");
    res.json(JsonResponse(true, venue));
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

router.post("/book/:id", auth.authUser, async (req, res) => {
  const { id } = req.params;
  let { date, startTime, endTime, email, name, phone, challenge } = req.body;

  try {
    date = new Date(date);

    let venue = await Venue.findById(id);
    if (!venue.venueSchedule.bookingAllowed) {
      return res.json(JsonResponse(false, "Booking isn't allowed"));
    }
    let schedule = null;
    if (venue.venueSchedule.sameEveryday) {
      schedule = venue.venueSchedule.default_timing;
    } else {
      let day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][date.getDay()];
      schedule = venue.venueSchedule.days.find((data) => data.day === day).timing;
    }
    let availability = schedule.map(({ startTime, endTime, price, _id }) => {
      return { _id, startTime, endTime, price, available: true };
    });

    let data = availability.filter((timing) => {
      console.log("A", timing.startTime, startTime);
      return timing.startTime === startTime && timing.endTime === endTime && timing.available;
    });

    if (data.length == 0) {
      return res.json(JsonResponse(false, "Timing not available."));
    }
    bookTime = data[0];
    let venueBook = await VenueBooking.create({
      buyer: req.user.user_id,
      venue: id,
      date: date,
      startTime: startTime,
      endTime: endTime,
      totalCost: bookTime.price,
      email: email,
      name: name,
      phone: phone,
    });

    if (venueBook) {
      await addNotification(
        venue.owner,
        `${name} booked your venue ${
          venue.name
        } for ${date.toLocaleDateString()} (${startTime} - ${endTime})`,
        "venue-book",
        id
      );
      if (challenge == true) {
        let newChallenge = await Challenge.create({
          challenger: req.user.user_id,
          accepted: false,
          venue: id,
          details: {
            date: date,
            startTime: startTime,
            endTime: endTime,
          },
        });
        console.log("CHALLENGE", newChallenge);
      }

      return res.json(JsonResponse(true, venueBook));
    }
    return res, json(JsonResponse(false, "Something went wrong."));
  } catch (err) {
    console.log(err);
    res.json(JsonResponse(false, err.message));
  }
});

router.get("/recomended", auth.authUserPublic, async (req, res) => {
  try {
    let venues = await Venue.find({});
    venues = venues
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    final = venues.slice(0, 3);
    if (req.user) {
      const user = await User.findOne({ _id: req.user.user_id });
      let recomendation = venues.filter((venue) => {
        return checkPreference([venue.category], user.profile.preferences);
      });

      let others = venues.filter((venue) => {
        return !checkPreference([venue.category], user.profile.preferences);
      });

      final = [...recomendation, ...others].slice(0, 3);
    }
    console.log(final);
    res.json(JsonResponse(true, final));
  } catch (err) {
    console.log(err);
    res.json(JsonResponse(false, err.message));
  }
});

// Function to get venue booking history
router.get("/my-venues/:venueId/history", auth.authUser, async (req, res) => {
  try {
    let venue = await Venue.findById(req.params.venueId);
    let venueBookings = await VenueBooking.find({ venue: req.params.venueId }).populate({
      path: "buyer",
      select: "_id name email username profile.photo",
    });

    res.json(JsonResponse(true, { venue, venueBookings }));
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

// Function to get my venue bookings
router.get("/bookings/my", auth.authUser, async (req, res) => {
  try {
    let venueBookings = await VenueBooking.find({ buyer: req.user.user_id }).populate({
      path: "venue",
    });

    res.json(JsonResponse(true, venueBookings));
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

// Function of total aggregation
router.get("/my-venues/aggregate", auth.authUser, async (req, res) => {
  // GET OWNER VENUES
  const aggregate = Venue.aggregate([
    {
      $match: {
        $expr: { $eq: ["$owner", { $toObjectId: req.user.user_id }] },
      },
    },
  ]);

  const userVenues = await aggregate.exec();

  // FILTER OUT IDS FROM OWNER VENUES
  const userVenuesId = userVenues.map((venue) => venue._id);

  // GET CUSTOMER SPENT HISTORY FOR VENUES
  const aggregate2 = VenueBooking.aggregate([
    {
      $match: {
        venue: {
          $in: userVenuesId,
        },
      },
    },
    {
      $group: {
        _id: "$buyer",
        total: { $sum: "$totalCost" },
      },
    },
  ]);
  const payingCustomers = await aggregate2.exec();

  // GET BOOKING EARNINGS FOR EACH VENUES
  const aggregate3 = VenueBooking.aggregate([
    {
      $match: {
        venue: {
          $in: userVenuesId,
        },
      },
    },
    {
      $group: {
        _id: "$venue",
        total: { $sum: "$totalCost" },
      },
    },
  ]);

  const venueEarnings = await aggregate3.exec();

  // GET BOOKING AMOUNT IN EACH DATE
  const aggregate4 = VenueBooking.aggregate([
    {
      $match: {
        venue: {
          $in: userVenuesId,
        },
      },
    },
    {
      $group: {
        _id: { $dayOfMonth: "$date" },
        count: { $sum: 1 },
      },
    },
  ]);

  console.log(aggregate);
  const dailyBookings = await aggregate4.exec();

  // POPULATE THE DATA
  await User.populate(payingCustomers, { path: "_id" });

  res.json(JsonResponse(true, { payingCustomers, venueEarnings, dailyBookings }));
});

module.exports = router;
