import { LINK_TYPE } from "../containers/LinkManagementContainer";

const TextLink = ({ link, ...props }) => {
  return (
    <a href={link} className="d-flex gap-2 align-items-center" {...props}>
      <i className="bi bi-link fs-3"></i>
      {link}
    </a>
  );
};

const YoutubeLink = ({ link }) => {
  let v = "";
  if (link.includes("watch")) {
    v = new URL(link).searchParams.get("v");
  }
  let src = link.includes("embed")
    ? link
    : `https://www.youtube.com/embed/${v}?feature=oembed`;
  return (
    <>
      <div className="embed-responsive ratio ratio-16x9">
        <iframe className="rounded embed-responsive-item" src={src}></iframe>
      </div>
    </>
  );
};

const ImageLink = ({ link }) => {
  return (
    <div>
      <img src={link} className="rounded img-thumbnail"></img>
    </div>
  );
};

const LinkDetailComponent = ({ link, onEditLink, onDeleteLink, ...props }) => {
  const linkTypeBadge = {
    [LINK_TYPE.LINK]: "text-bg-primary",
    [LINK_TYPE.IMAGE]: "text-bg-warning",
    [LINK_TYPE.YOUTUBE]: "text-bg-danger",
  };
  console.log("LinkDetailComponent:render");
  return (
    <>
      <div className="card my-4">
        <div className="card-title d-flex justify-content-between border-bottom p-3">
          <div className="d-flex justify-content-between gap-4">
            <span className={"btn " + linkTypeBadge[link.type]}>
              {link.type}
            </span>
            <h5 className="m-0 lh-lg">{link.title}</h5>
          </div>
          <div className="btn text-bg-warning align-middle">
            {link.publishedDate.toISOString()}
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              {link.type === LINK_TYPE.LINK && <TextLink link={link.link} />}
              {link.type === LINK_TYPE.YOUTUBE && (
                <YoutubeLink link={link.link} />
              )}
              {link.type === LINK_TYPE.IMAGE && <ImageLink link={link.link} />}
            </div>
            <div className="col d-flex justify-content-between flex-column">
              {[LINK_TYPE.YOUTUBE, LINK_TYPE.IMAGE].includes(link.type) && (
                <TextLink
                  link={link.link}
                  className={
                    "d-flex gap-2 align-items-center justify-content-end"
                  }
                />
              )}
              <div className="d-flex gap-2 justify-content-end align-self-end">
                <button
                  className="btn btn-warning"
                  style={{ width: "120px", height: "40px" }}
                  onClick={() => {
                    onEditLink(link);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  style={{ width: "120px", height: "40px" }}
                  onClick={() => {
                    onDeleteLink(link);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

LinkDetailComponent.displayName = "LinkDetailComponent";

export default LinkDetailComponent;
