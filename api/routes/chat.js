var express = require("express");
var router = express.Router();

const data = [
  {
    id: "1",
    name: "archit",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
  },
  {
    id: "2",
    name: "oj",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
  },
  {
    id: "3",
    name: "pk",
    img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
  },
  {
    id: "4",
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
