import { useEffect, useRef, useState } from "react";
import LinkFormComponent from "../components/LinkFormComponent";
import { Modal } from "bootstrap";
import { useImmer } from "use-immer";
import PaginationComponent from "../components/PaginationComponent";
import LinkDetailComponent from "../components/LinkDetailComponent";
import LinkFilterComponent from "../components/LinkFilterComponent";

export const LINK_TYPE = {
  LINK: "link",
  YOUTUBE: "youtube",
  IMAGE: "image",
};

const searchLinkByQuery = (links, query) => {
  let items = structuredClone(links);
  if (query.type) {
    items = items.filter((l) => l.type === query.type);
  }
  if (query.searchText) {
    items = items.filter(
      (l) =>
        l.title.includes(query.searchText) || l.link.includes(query.searchText)
    );
  }
  // pagination
  const rowsPerPage = query.rowsPerPage || 1;
  const currentPage = query.currentPage || 1;
  const skip = (Math.max(1, currentPage) - 1) * Math.max(rowsPerPage, 0);
  const numberOfItems = items.length;
  const numberOfPages = Math.ceil(numberOfItems / rowsPerPage);

  return {
    currentPage,
    rowsPerPage,
    items: items.slice(skip, skip + rowsPerPage),
    numberOfItems,
    numberOfPages,
  };
};

const extractLinkType = (link) => {
  if (link.endsWith("png") || link.endsWith("jpg") || link.endsWith("jpeg")) {
    return LINK_TYPE.IMAGE;
  }
  if (link.startsWith("https://www.youtube.com")) {
    return LINK_TYPE.YOUTUBE;
  }
  return LINK_TYPE.LINK;
};

const DBName = "NextJSVietnam-LinkList";
const CollectionName = "links";

const LinkManagementContainer = () => {
  const linkFormComponentModalInstance = useRef(null);
  const linkFormComponentModal = useRef(null);
  const [editLink, setEditLink] = useState(null);
  const [links, setLinks] = useImmer([]);
  const [query, setQuery] = useImmer({
    currentPage: 1,
  });

  const [objectStore, setObjectStore] = useState(null);
  const db = useRef(null);

  const loadLinksFromStorage = () => {
    if (db.current) {
      const objectStore = db.current
        .transaction(CollectionName, "readwrite")
        .objectStore(CollectionName);
      setObjectStore(objectStore);
      const res = objectStore.getAll();
      res.onsuccess = (e) => {
        setLinks(e.target.result);
      };
    }
  };

  // init
  useEffect(() => {
    const DBOpenRequest = window.indexedDB.open(DBName, 1);
    // connection error
    DBOpenRequest.onerror = () => {
      alert("Can not connect IndexDB");
    };
    // for upgrade/init
    DBOpenRequest.onupgradeneeded = (event) => {
      const db = event.target.result;

      db.onerror = () => {
        alert("Can not connect IndexDB");
      };

      // Create an objectStore for this CollectionName

      const objectStore = db.createObjectStore(CollectionName, {
        keyPath: "id",
      });

      // define what data items the objectStore will contain
      objectStore.createIndex("link", "link", { unique: true });
      objectStore.createIndex("title", "title", { unique: false });
      objectStore.createIndex("type", "type", { unique: false });
      objectStore.createIndex("publishedDate", "publishedDate", {
        unique: false,
      });

      alert("Object store created.");
    };
    // success
    DBOpenRequest.onsuccess = (event) => {
      console.log(event);
      if (!objectStore) {
        // Store the result of opening the database in the db variable. This is used a lot below
        db.current = DBOpenRequest.result;
        loadLinksFromStorage();
      }
    };
  }, []);

  const storeLink = (link, action) => {
    // Open a read/write DB transaction, ready for adding the data
    if (db.current) {
      // Call an object store that's already been added to the database
      const objectStore = db.current
        .transaction(CollectionName, "readwrite")
        .objectStore(CollectionName);
      console.log(objectStore.indexNames);
      console.log(objectStore.keyPath);
      console.log(objectStore.name);
      console.log(objectStore.transaction);
      console.log(objectStore.autoIncrement);
      let objectStoreRequest = null;
      const { id } = link;

      if (action === "add") {
        objectStoreRequest = objectStore.add(link);
      }
      if (action === "edit") {
        objectStoreRequest = objectStore.put(link);
      }
      if (action === "delete") {
        objectStoreRequest = objectStore.delete(id);
      }
      if (objectStoreRequest) {
        objectStoreRequest.onsuccess = () => {
          console.log("object saved!");
        };
      }
    }
  };

  const openModal = () => {
    if (!linkFormComponentModalInstance.current) {
      console.log("new modal", linkFormComponentModalInstance.current);
      linkFormComponentModalInstance.current = new Modal(
        linkFormComponentModal.current,
        {
          backdrop: true,
          focus: true,
          keyboard: true,
        }
      );
      linkFormComponentModalInstance.current.show();
      console.log("created modal", linkFormComponentModalInstance.current);
      // handler event close
      linkFormComponentModal.current.addEventListener("hide.bs.modal", () => {
        // reset state
        setEditLink(null);
      });
      return;
    }
    console.log("existing modal", linkFormComponentModalInstance.current);
    linkFormComponentModalInstance.current.show();
  };

  const closeModal = () => {
    if (linkFormComponentModalInstance.current) {
      linkFormComponentModalInstance.current.hide();
    }
  };

  const onNewLink = (e) => {
    e.preventDefault();
    openModal();
  };

  const onEditLink = (link) => {
    // set editLink
    setEditLink(link);
    // open modal
    openModal();
  };

  const onDeleteLink = (link) => {
    // delete link
    setLinks((linkList) => {
      const deleteLinkIndex = linkList.findIndex((l) => l.id === link.id);
      linkList.splice(deleteLinkIndex, 1);
      storeLink(link, "delete");
    });
  };

  const onSaveLink = (data) => {
    const link = structuredClone(data);
    // new link has no id
    // existed link has id
    if (link && !link.id) {
      setLinks((linkList) => {
        Reflect.set(link, "id", Date.now());
        Reflect.set(link, "publishedDate", new Date());
        Reflect.set(link, "type", extractLinkType(link.link));
        linkList.push(link);
      });
      // close modal
      closeModal();
      // on add link
      storeLink(link, "add");
      return;
    }
    // otherwise edit mode
    if (link && link.id) {
      setLinks((linkList) => {
        Reflect.set(link, "publishedDate", new Date());
        Reflect.set(link, "type", extractLinkType(link.link));
        const editLinkIndex = linkList.findIndex((l) => l.id === link.id);
        linkList[editLinkIndex] = link;
      });
      // close modal
      closeModal();
      // on add link
      storeLink(link, "edit");
      return;
    }
  };

  const onChangeCurrentPage = (newCurrentPage) => {
    setQuery((q) => {
      q.currentPage = newCurrentPage;
    });
  };

  const onFilterChanged = (filter) => {
    setQuery((q) => {
      return { ...q, ...filter };
    });
  };
  const res = searchLinkByQuery(links, query);
  // computed values
  const paginator = {
    numberOfPages: res.numberOfPages,
    numberOfItems: res.numberOfItems,
    rowsPerPage: res.rowsPerPage,
    currentPage: res.currentPage,
  };
  const items = res.items;

  return (
    <>
      <div className="card">
        <div className="card-header text-bg-primary">
          <h3 className="card-title">Links</h3>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={onNewLink}>
              New Link
            </button>
          </div>
          <LinkFilterComponent onFilterChanged={onFilterChanged} />
          <div className="mt-4">
            {items.map((link) => (
              <LinkDetailComponent
                key={link.id}
                link={link}
                onEditLink={() => onEditLink(link)}
                onDeleteLink={() => onDeleteLink(link)}
              />
            ))}
          </div>
          <div className="d-flex justify-content-between">
            {paginator.numberOfItems > 0 && (
              <div>
                Showing{" "}
                {(paginator.currentPage - 1) * paginator.rowsPerPage + 1} to{" "}
                {Math.min(
                  paginator.currentPage * paginator.rowsPerPage,
                  paginator.numberOfItems
                )}{" "}
                of {paginator.numberOfItems}
              </div>
            )}
            <PaginationComponent
              numberOfPages={paginator.numberOfPages}
              currentPage={paginator.currentPage}
              onChangeCurrentPage={onChangeCurrentPage}
            />
          </div>
        </div>
      </div>
      <LinkFormComponent
        ref={linkFormComponentModal}
        link={editLink}
        onSaveLink={onSaveLink}
      ></LinkFormComponent>
    </>
  );
};

export default LinkManagementContainer;
