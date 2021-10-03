const Events = require("../models/Events");
const Exampledata = require("../models/Exampledata");

const { notifyEvent, notifyEvening } = require("../functions/notify");
const cron = require("node-cron");
const moment = require("moment");
const fs = require("fs");

exports.query = async (req, res) => {
  try {
    console.log(req.body.datestart);
    const roitai = await Exampledata.find({
      datestart: {
        $gte: new Date(req.body.datestart),
        $lte: new Date(req.body.dateend),
      },
    });
    res.send(roitai)
    // Send
  } catch (err) {
    console.log("Server Error");
    res.status(500).send("Server Error!!!");
  }
};

exports.createEvent = async (req, res) => {
  try {
    res.send(await new Events(req.body).save());
  } catch (err) {
    console.log("Server Error");
    res.status(500).send("Server Error!!");
  }
};
exports.listEvent = async (req, res) => {
  try {
    res.send(await Events.find({}));
  } catch (err) {
    console.log("Server Error");
    res.status(500).send("Server Error!!");
  }
};

exports.updateEvent = async (req, res) => {
  try {
    console.log(req.body.id);
    res.send(
      await Events.findOneAndUpdate(
        { _id: req.body.id },
        { start: req.body.start, end: req.body.end }
      )
    );
  } catch (err) {
    console.log("Server Error");
    res.status(500).send("Server Error!!");
  }
};

exports.removeEvent = async (req, res) => {
  try {
    console.log(req.params.id);
    const removeEvent = await Events.findOneAndDelete({ _id: req.params.id });
    console.log(removeEvent.filename);
    await fs.unlink("./public/uploads/" + removeEvent.filename, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("remove Success");
      }
    });
    res.send("Success Hello");
  } catch (err) {
    console.log("Server Error");
    res.status(500).send("Server Error!!");
  }
};

exports.currentMonth = async (req, res) => {
  try {
    const m = parseInt(req.body.mm);
    console.log(typeof m);
    const currentM = await Events.find({
      $expr: {
        $eq: [
          {
            $month: "$start",
          },
          m,
        ],
      },
    }).sort({ start: 1 });
    console.log(currentM);
    res.send(currentM);
  } catch (err) {
    console.log("Server Error");
    res.status(500).send("Server Error!!");
  }
};
const currentDate = async (req, res) => {
  try {
    const d = new Date();
    const currentD = await Events.find({}).sort({ start: 1 });
    const current = currentD.filter((item) => {
      return d >= item.start && d < item.end;
    });

    for (t in current) {
      const msg = "วันนี้มีกิจกรรม " + current[t].title;
      console.log("curren notify");
      notifyEvent(msg);
    }
    //console.log(current)
    // res.send('hello')
  } catch (err) {
    console.log(err, "Server Error");
    //res.status(500).send('Server Error!!')
  }
};

exports.updateImage = async (req, res) => {
  try {
    const id = req.body.id;
    const filename = req.file.filename;
    const updateImage = await Events.findOneAndUpdate(
      { _id: id },
      { filename: filename }
    );
    res.send(updateImage);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

const currentEvening = async () => {
  try {
    const d = new Date();
    const currentD = await Events.find({}).sort({ start: 1 });
    const current = currentD.filter((item) => {
      return d >= item.start && d < item.end;
    });
    for (t in current) {
      const msg = "กิจกรรม " + current[t].title;
      console.log("curren notify");
      console.log("filename", current[t].filename);
      notifyEvening(msg, current[t].filename);
    }
    console.log(current.length);
    // res.send(current)
  } catch (err) {
    console.log(err);
  }
};

exports.workshop = async (req, res) => {
  try {
    //code
    const xample = await Exampledata.find({});
    console.log(xample);
    res.send(xample);
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

// Notify 07.00 น.
cron.schedule("46 17 * * *", () => {
  currentDate();
});

// Notify 1800
cron.schedule("06 18 * * *", () => {
  currentEvening();
});
