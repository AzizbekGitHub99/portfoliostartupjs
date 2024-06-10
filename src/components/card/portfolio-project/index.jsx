import PropTypes from "prop-types"
import getImgUrl from "../../../utils";

import "./style.scss"
const PortfolioProjectCard = ({name, url, description, photo}) => {
  return (
    <div className="project-card">
        <div className="project-card__img">
            <img src={getImgUrl(photo)} alt={"description"} />
        </div>
        <div className="project-card__box">
            <h2 className="project-card__title">{name} </h2>
            <p className="project-card__desc">{description} </p>
            <a href={`${url}`} target="_blank" className="project-card__link"> View portfolio</a>
        </div>
    </div>
  )
}

PortfolioProjectCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
}

export default PortfolioProjectCard