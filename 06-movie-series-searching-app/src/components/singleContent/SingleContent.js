import React from "react";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import "./SingleContent.css";
import "./SingleContent.css";
import ContentModal from "../contentModal/ContentModal";
import { img_300, unavailable } from "../../config/config";

function SingleContent({ id, poster, title, date, media_type, vote_average }) {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={vote_average}
        color={vote_average > 7 ? "primary" : "secondary"}
      ></Badge>
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV SERIES" : "MOVIES"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
}

export default SingleContent;
