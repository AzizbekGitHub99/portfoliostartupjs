import PropTypes from "prop-types";

import "./style.scss";
import { BASE } from "../../../consts";
import { Link } from "react-router-dom";

const ClientsCard = ({ firstName, lastName, username, photo, _id }) => {
  return (
    <div className="clients-card">
      <img
        src={`${BASE}upload/${photo}`}
        alt={firstName}
        width={50}
        height={50}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = "/vite.svg";
        }}
      />
      <div>
        <h1 className="clients-card__title">
          {firstName} {lastName}
        </h1>
        <p className="clients-card__text">{username}</p>
        <Link to={`/clients/portfolio/${_id}`} className="clients-card__btn">View portfolio </Link>
      </div>
    </div>
  );
};

ClientsCard.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  username: PropTypes.string,
  photo: PropTypes.string,
  _id: PropTypes.string,
};

export default ClientsCard;
