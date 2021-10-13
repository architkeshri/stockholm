import React from "react";
import { Link, useParams } from "react-router-dom";

import "./openchat.css";

const data = {
  id: "6166a22edaba7c1840cffc8f",
  name: "Prakhar Gupta",
  email: "prakhar.gupta.1106@gmail.com",
  password: "$2a$10$ne27Z2KkanSTjaiKa.G2Cu9ox1R9R8v8gz0CEwDUkEs8Wa.mxDNh6",
  dob: null,
  about: "",
  emergency_contact: "",
  gender: "Female",
  sexual_preference: "",
  activated: true,
  verified: false,
  interests: [],
  matches: [
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
      uid: "4",
      name: "lk",
      img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
    },
  ],
  likes: [],
  liked_by: [],
  imagesurl: [],
  __v: { $numberInt: "0" },
  education: "",
  fb_link: "",
  ig_link: "",
  location: "",
  occupation: "",
};
const Openchat = () => {
  const currenUser = localStorage.getItem("userId");
  const { id } = useParams();

  //   console.log(uid);
  //find conoversation with id = uid and display here
  return (
    <>
      <section className="messageContainer">
        <div className="messageHead">
          <img
            className="img"
            src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg"
          />
          <h3>UserName{id}</h3>
        </div>

        <div className="topMessage">
          <img
            className="img"
            src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg"
          />
          <p className="message">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero a
            molestiae sed exercitationem soluta sunt aperiam eligendi dolores
            laboriosam velit.
          </p>
        </div>
      </section>
    </>
  );
};

export default Openchat;
