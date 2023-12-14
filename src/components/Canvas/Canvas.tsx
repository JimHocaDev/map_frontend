import close from "../../assets/icons/close.svg";
import React, { useRef, useState } from "react";
interface CanvasProps {
  showCanvas: boolean;
  setShowCanvas: React.Dispatch<React.SetStateAction<boolean>>;
  removeMarker: Function;
  data: any;
  onSubmit: Function;
  lnglat: [number, number];
}
import { Alert, Snackbar } from "@mui/material";

import "./Canvas.scss";
import Select from "react-select";
import { MapService } from "../../sevices/map.service";

export const Canvas: React.FC<CanvasProps> = ({
  showCanvas,
  setShowCanvas,
  removeMarker,
  data,
  onSubmit,
  lnglat,
}) => {
  const [openBar, setOpenBar] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const incidentTypeRef = useRef<any>(null);
  const incidentStartRef = useRef<HTMLInputElement>(null);
  const incidentEndRef = useRef<HTMLInputElement>(null);
  const incidentCommentsRef = useRef<HTMLTextAreaElement>(null);
  const incidentImagesRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`overlay   ${showCanvas ? "open" : ""}`}>
      <div id="canvasBox">
        <button
          onClick={() => {
            document.getElementById("canvasBox")?.classList.add("canvasActive");
            setTimeout(() => {
              setShowCanvas(false);
            }, 490);
            removeMarker();
          }}
          className={`canvas_button`}
          type="button"
        >
          <img src={close} width="34px" height="34px" />
        </button>
        <h1 className="canvas_title">Incident</h1>
        {/*             
    {typeMarker == "address" ? (
      <form className="adress_main">
        <p>Set the location pin on the road</p>
        <div className="address_body">
          <div>
            <label className="address_label" htmlFor="address_category">
              Category <span>*</span>
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={data[0]}
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              id="address_category"
              options={data}
            />
          </div>
          <div className="address_main_info">
            <div>
              <label
                className="address_label"
                htmlFor="address_category"
              >
                Number <span>*</span>
              </label>
              <input
                type="number"
                onKeyDown={(evt) => {
                  if (
                    (evt.which != 8 &&
                      evt.which != 0 &&
                      evt.which < 48) ||
                    evt.which > 57
                  ) {
                    evt.preventDefault();
                  }
                }}
              />
            </div>
            <div>
              <label
                className="address_label"
                htmlFor="address_category"
              >
                Street, City, State, Zip
                <span>*</span>
              </label>
              <input type="text" />
            </div>
          </div>
          <div className="address_comments">
            <label className="address_label" htmlFor="addres_comments">
              Comments
            </label>
            <textarea id="addres_comments"></textarea>
          </div>
          <div className="address_comments">
            <label className="address_label">Photos</label>
            <label
              className="photo_input"
              role="button"
              tabIndex={0}
              htmlFor="address_photos"
            >
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.43934 19.0607C3.72064 19.342 4.10218 19.5 4.5 19.5H19.5C19.8978 19.5 20.2794 19.342 20.5607 19.0607C20.842 18.7794 21 18.3978 21 18V7.5C21 7.10218 20.842 6.72064 20.5607 6.43934C20.2794 6.15804 19.8978 6 19.5 6H16.4995L14.9995 3.75H8.99945L7.49945 6H4.5C4.10218 6 3.72064 6.15804 3.43934 6.43934C3.15804 6.72064 3 7.10218 3 7.5V18C3 18.3978 3.15804 18.7794 3.43934 19.0607ZM9.625 12.375C9.625 11.0633 10.6883 10 12 10C13.3117 10 14.375 11.0633 14.375 12.375C14.375 13.6867 13.3117 14.75 12 14.75C10.6883 14.75 9.625 13.6867 9.625 12.375ZM12 8C9.58375 8 7.625 9.95875 7.625 12.375C7.625 14.7912 9.58375 16.75 12 16.75C14.4162 16.75 16.375 14.7912 16.375 12.375C16.375 9.95875 14.4162 8 12 8Z"
                ></path>
              </svg>
              Add a photo
              <input
                type="file"
                className="address_photo"
                id="address_photos"
                accept="image/jpeg,image/png,image/webp,image/avif"
                multiple
                onChange={(evt) => {
                  console.log(evt.target.value);
                  setImg(evt.target.value);
                  arr.push(evt.target.value);
                  console.log(arr);
                }}
              />
            </label>
          </div>
          <div className="images_container">

          </div>
        </div>
        <div className="submit_btns">
          <button type="submit" className="submit_btn">
            Submit
          </button>
          <button
            className="cancelBtn"
            onClick={() => {
              setShowCanvas(false);
              removeMarker();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    ) : typeMarker == "building" ? (
      <form className="adress_main">
        <p>Set the location pin on the road</p>
        <div className="address_body">
          <div className="address_comments">
            <label className="address_label" htmlFor="address_category">
              Name <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter the name of business"
            />
          </div>
          <div className="address_comments">
            <label className="address_label" htmlFor="address_category">
              Address <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter the address of business"
            />
          </div>
          <div>
            <label className="address_label" htmlFor="address_category">
              Category <span>*</span>
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={data2[0]}
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              id="address_category"
              options={data2}
            />
          </div>
          <div className="address_comments">
            <label className="address_label" htmlFor="addres_comments">
              Comments
            </label>
            <textarea id="addres_comments"></textarea>
          </div>
          <div className="address_comments">
            <label className="address_label">Photos</label>
            <label
              className="photo_input"
              role="button"
              tabIndex={0}
              htmlFor="address_photos"
            >
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.43934 19.0607C3.72064 19.342 4.10218 19.5 4.5 19.5H19.5C19.8978 19.5 20.2794 19.342 20.5607 19.0607C20.842 18.7794 21 18.3978 21 18V7.5C21 7.10218 20.842 6.72064 20.5607 6.43934C20.2794 6.15804 19.8978 6 19.5 6H16.4995L14.9995 3.75H8.99945L7.49945 6H4.5C4.10218 6 3.72064 6.15804 3.43934 6.43934C3.15804 6.72064 3 7.10218 3 7.5V18C3 18.3978 3.15804 18.7794 3.43934 19.0607ZM9.625 12.375C9.625 11.0633 10.6883 10 12 10C13.3117 10 14.375 11.0633 14.375 12.375C14.375 13.6867 13.3117 14.75 12 14.75C10.6883 14.75 9.625 13.6867 9.625 12.375ZM12 8C9.58375 8 7.625 9.95875 7.625 12.375C7.625 14.7912 9.58375 16.75 12 16.75C14.4162 16.75 16.375 14.7912 16.375 12.375C16.375 9.95875 14.4162 8 12 8Z"
                ></path>
              </svg>
              Add a photo
              <input
                type="file"
                className="address_photo"
                id="address_photos"
              />
            </label>
          </div>
        </div>
        <div className="submit_btns">
          <button type="submit" className="submit_btn">
            Submit
          </button>
          <button
            className="cancelBtn"
            onClick={() => {
              setShowCanvas(false);
              removeMarker();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    ) : typeMarker == "speed limit" ? (
      <form className="adress_main">
        <p>Set the location pin on the road</p>
        <div className="address_body">
          <div className="address_comments">
            <label className="address_label" htmlFor="address_category">
              Speed Limit <span>*</span>
            </label>
            <div className="speed_limit_div">
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                10
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                20
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                30
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                40
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                50
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                60
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                70
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                80
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                90
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                100
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                110
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                120
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                130
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                140
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                150
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                160
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                170
              </button>
              <button
                type="button"
                onClick={(evt) => {
                  const activeSpeedLimitBtn = document.getElementById(
                    "active_speed_limit_btn"
                  );
                  if (activeSpeedLimitBtn) {
                    activeSpeedLimitBtn.id = "";
                  }
                  (evt.target as HTMLElement).id =
                    "active_speed_limit_btn";
                }}
              >
                180
              </button>
            </div>
          </div>
          <div className="address_comments">
            <label className="address_label" htmlFor="addres_comments">
              Comments
            </label>
            <textarea id="addres_comments"></textarea>
          </div>
          <div className="address_comments">
            <label className="address_label">Photos</label>
            <label
              className="photo_input"
              role="button"
              tabIndex={0}
              htmlFor="address_photos"
            >
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.43934 19.0607C3.72064 19.342 4.10218 19.5 4.5 19.5H19.5C19.8978 19.5 20.2794 19.342 20.5607 19.0607C20.842 18.7794 21 18.3978 21 18V7.5C21 7.10218 20.842 6.72064 20.5607 6.43934C20.2794 6.15804 19.8978 6 19.5 6H16.4995L14.9995 3.75H8.99945L7.49945 6H4.5C4.10218 6 3.72064 6.15804 3.43934 6.43934C3.15804 6.72064 3 7.10218 3 7.5V18C3 18.3978 3.15804 18.7794 3.43934 19.0607ZM9.625 12.375C9.625 11.0633 10.6883 10 12 10C13.3117 10 14.375 11.0633 14.375 12.375C14.375 13.6867 13.3117 14.75 12 14.75C10.6883 14.75 9.625 13.6867 9.625 12.375ZM12 8C9.58375 8 7.625 9.95875 7.625 12.375C7.625 14.7912 9.58375 16.75 12 16.75C14.4162 16.75 16.375 14.7912 16.375 12.375C16.375 9.95875 14.4162 8 12 8Z"
                ></path>
              </svg>
              Add a photo
              <input
                type="file"
                className="address_photo"
                id="address_photos"
              />
            </label>
          </div>
        </div>
        <div className="submit_btns">
          <button type="submit" className="submit_btn">
            Submit
          </button>
          <button
            className="cancelBtn"
            onClick={() => {
              setShowCanvas(false);
              removeMarker();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    ) : typeMarker == "incident" ? (
      <form className="adress_main">
        <p>Set the location pin on the road</p>
        <div className="address_body">
          <div>
            <label className="address_label" htmlFor="address_category">
              Incident Type <span>*</span>
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={data3[0]}
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              id="address_category"
              options={data3}
            />
          </div>
          <div className="address_comments">
            <label className="address_label" htmlFor="address_category">
              Incident Start <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter the name of business"
              onFocus={(evt) => (evt.target.type = "date")}
            />
          </div>
          <div className="address_comments">
            <label className="address_label" htmlFor="address_category">
              Incident End
            </label>
            <input
              type="text"
              placeholder="Enter the name of business"
              onFocus={(evt) => (evt.target.type = "date")}
            />
          </div>
          <div className="address_comments">
            <label className="address_label" htmlFor="addres_comments">
              Comments
            </label>
            <textarea id="addres_comments"></textarea>
          </div>
          <div className="address_comments">
            <label className="address_label">Photos</label>
            <label
              className="photo_input"
              role="button"
              tabIndex={0}
              htmlFor="address_photos"
            >
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.43934 19.0607C3.72064 19.342 4.10218 19.5 4.5 19.5H19.5C19.8978 19.5 20.2794 19.342 20.5607 19.0607C20.842 18.7794 21 18.3978 21 18V7.5C21 7.10218 20.842 6.72064 20.5607 6.43934C20.2794 6.15804 19.8978 6 19.5 6H16.4995L14.9995 3.75H8.99945L7.49945 6H4.5C4.10218 6 3.72064 6.15804 3.43934 6.43934C3.15804 6.72064 3 7.10218 3 7.5V18C3 18.3978 3.15804 18.7794 3.43934 19.0607ZM9.625 12.375C9.625 11.0633 10.6883 10 12 10C13.3117 10 14.375 11.0633 14.375 12.375C14.375 13.6867 13.3117 14.75 12 14.75C10.6883 14.75 9.625 13.6867 9.625 12.375ZM12 8C9.58375 8 7.625 9.95875 7.625 12.375C7.625 14.7912 9.58375 16.75 12 16.75C14.4162 16.75 16.375 14.7912 16.375 12.375C16.375 9.95875 14.4162 8 12 8Z"
                ></path>
              </svg>
              Add a photo
              <input
                type="file"
                className="address_photo"
                id="address_photos"
              />
            </label>
          </div>
        </div>
        <div className="submit_btns">
          <button type="submit" className="submit_btn">
            Submit
          </button>
          <button
            className="cancelBtn"
            onClick={() => {
              setShowCanvas(false);
              removeMarker();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    ) : (
      <form className="adress_main">
        <p>Set the location pin on the road</p>
        <div className="address_body">
          <div>
            <label className="address_label" htmlFor="address_category">
              Clearance Type <span>*</span>
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={data4[0]}
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              id="address_category"
              options={data4}
            />
          </div>
          <div className="address_comments">
            <label className="address_label" htmlFor="addres_comments">
              Comments
            </label>
            <textarea id="addres_comments"></textarea>
          </div>
          <div className="address_comments">
            <label className="address_label">Photos</label>
            <label
              className="photo_input"
              role="button"
              tabIndex={0}
              htmlFor="address_photos"
            >
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.43934 19.0607C3.72064 19.342 4.10218 19.5 4.5 19.5H19.5C19.8978 19.5 20.2794 19.342 20.5607 19.0607C20.842 18.7794 21 18.3978 21 18V7.5C21 7.10218 20.842 6.72064 20.5607 6.43934C20.2794 6.15804 19.8978 6 19.5 6H16.4995L14.9995 3.75H8.99945L7.49945 6H4.5C4.10218 6 3.72064 6.15804 3.43934 6.43934C3.15804 6.72064 3 7.10218 3 7.5V18C3 18.3978 3.15804 18.7794 3.43934 19.0607ZM9.625 12.375C9.625 11.0633 10.6883 10 12 10C13.3117 10 14.375 11.0633 14.375 12.375C14.375 13.6867 13.3117 14.75 12 14.75C10.6883 14.75 9.625 13.6867 9.625 12.375ZM12 8C9.58375 8 7.625 9.95875 7.625 12.375C7.625 14.7912 9.58375 16.75 12 16.75C14.4162 16.75 16.375 14.7912 16.375 12.375C16.375 9.95875 14.4162 8 12 8Z"
                ></path>
              </svg>
              Add a photo
              <input
                type="file"
                className="address_photo"
                id="address_photos"
              />
            </label>
          </div>
        </div>
        <div className="submit_btns">
          <button type="submit" className="submit_btn">
            Submit
          </button>
          <button
            className="cancelBtn"
            onClick={() => {
              setShowCanvas(false);
              removeMarker();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    )}  */}
        <form
          className="adress_main"
          onSubmit={(evt) => {
            evt.preventDefault();

            setShowCanvas(false);

            const incidentImages = incidentImagesRef.current?.files;

            // marker.append(
            //   "data",
            //   JSON.stringify({
            //     title: incidentStartRef.current?.value || "",
            //     description: incidentCommentsRef.current?.value || "",
            //     coordinates: lnglat.join(":"),
            //     rating: incidentEndRef.current?.value || "",
            //   })
            // );
            // if (incidentImages && incidentImages.length > 0) {
            //   marker.append("files.image", incidentImages[0] || []);
            // }
            // marker.append("headers", `{"Content-Type": "multipart/form-data"}`);

            // (async () => {
            //   try {
            //     if (
            //       localStorage.getItem("token") ||
            //       sessionStorage.getItem("token")
            //     ) {
            //       await MapService.post(marker, setAlertMessage);
            //       // onSubmit();
            //       // location.reload();
            //     } else {
            //       location.replace("/sign-in");
            //     }
            //   } catch (error) {
            //     console.log(error);
            //   }
            // })();
            const token =
              localStorage.getItem("token") || sessionStorage.getItem("token");

            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const formdata = new FormData();
            formdata.append(
              "data",
              JSON.stringify({
                title: incidentStartRef.current?.value || "",
                description: incidentCommentsRef.current?.value || "",
                coordinates: lnglat.join(":"),
                rating: incidentEndRef.current?.value || 0,
              })
            );
            if (incidentImages && incidentImages.length > 0) {
              formdata.append("files.image", incidentImages[0] || []);
            }
            const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: formdata,
            };

            fetch("http://localhost:1337/api/plots", requestOptions)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    `Request failed with status ${response.status}`
                  );
                }
                return response.text();
              })
              .then((result) => {
                console.log(result);
                // Handle the successful response here
              })
              .catch((error) => {
                console.error("Error:", error.message);
                // Handle the error here
              });
          }}
        >
          <p>Set the location pin on the road</p>
          <div className="address_body">
            <div className="address_comments">
              <label className="address_label" htmlFor="address_category">
                Title <span>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter the title"
                ref={incidentStartRef}
              />
            </div>
            <div className="address_comments">
              <label className="address_label" htmlFor="address_category">
                Rating <span>*</span>
              </label>
              <input
                type="number"
                placeholder="Rate 0-5"
                ref={incidentEndRef}
              />
            </div>

            <div className="address_comments">
              <label className="address_label" htmlFor="addres_comments">
                Comments <span>*</span>
              </label>

              <textarea
                id="addres_comments"
                ref={incidentCommentsRef}
              ></textarea>
            </div>
            <div className="address_comments">
              <label className="address_label">
                Photos <span>*</span>
              </label>
              <label
                className="photo_input"
                role="button"
                tabIndex={0}
                htmlFor="address_photos"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.43934 19.0607C3.72064 19.342 4.10218 19.5 4.5 19.5H19.5C19.8978 19.5 20.2794 19.342 20.5607 19.0607C20.842 18.7794 21 18.3978 21 18V7.5C21 7.10218 20.842 6.72064 20.5607 6.43934C20.2794 6.15804 19.8978 6 19.5 6H16.4995L14.9995 3.75H8.99945L7.49945 6H4.5C4.10218 6 3.72064 6.15804 3.43934 6.43934C3.15804 6.72064 3 7.10218 3 7.5V18C3 18.3978 3.15804 18.7794 3.43934 19.0607ZM9.625 12.375C9.625 11.0633 10.6883 10 12 10C13.3117 10 14.375 11.0633 14.375 12.375C14.375 13.6867 13.3117 14.75 12 14.75C10.6883 14.75 9.625 13.6867 9.625 12.375ZM12 8C9.58375 8 7.625 9.95875 7.625 12.375C7.625 14.7912 9.58375 16.75 12 16.75C14.4162 16.75 16.375 14.7912 16.375 12.375C16.375 9.95875 14.4162 8 12 8Z"
                  ></path>
                </svg>
                Add a photo
                <input
                  type="file"
                  className="address_photo"
                  id="address_photos"
                  accept="image/png, image/jpeg, image/jpg"
                  ref={incidentImagesRef}
                />
              </label>
            </div>
          </div>
          <div className="submit_btns">
            <button type="submit" className="submit_btn">
              Submit
            </button>
            <button
              className="cancelBtn"
              onClick={() => {
                document
                  .getElementById("canvasBox")
                  ?.classList.add("canvasActive");
                setTimeout(() => {
                  setShowCanvas(false);
                }, 490);
                removeMarker();
              }}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Snackbar
        open={openBar}
        autoHideDuration={6000}
        onClose={() => setOpenBar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenBar(false)}
          severity={true ? "success" : "error"}
          sx={{
            width: "100%",
            textAlign: "center",
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
