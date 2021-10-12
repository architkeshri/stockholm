var express = require("express");
var router = express.Router();

const data = [
  {
    name: "archit",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
  },
  {
    name: "oj",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
  },
  {
    name: "pk",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
  },
  {
    name: "lk",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
  },
];

router.post("/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  res.json(data);
});

module.exports = router;
