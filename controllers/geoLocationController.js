const Province = require("../data/province.json");
const City = require("../data/city.json")

const getProvince = async (req, res) => {
  try {
    res.status(200).json({
      data: Province,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

const getCity = async (req, res) => {
  const { province } = req.body;
  const arrCity = [];

  City.map((item) => {
    if (item.province === province) {
      arrCity.push({
        name: item.name,
      });
    }
  });

  arrCity.sort((a, b) => a.name.localeCompare(b.name));

  return res.status(200).json({
    data: arrCity,
  });
};

module.exports = { getProvince, getCity };
