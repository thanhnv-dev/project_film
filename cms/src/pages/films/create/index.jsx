import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { sendPost } from "../../../network/requests";
import "./create.scss";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const CreateFilm = () => {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("");
  const [releaseDay, setReleaseDay] = useState("");
  const [durations, setDurations] = useState("");
  const [type, setType] = useState("");
  const [idTrailer, setIdTrailer] = useState("");
  const [genre, setGenre] = useState([]);
  const [status, setStatus] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [episode, setEpisode] = useState({});

  const _handleSave = async () => {
    const newEpisode = { ...episode };
    if (newEpisode.data) {
      newEpisode.data = newEpisode.data.filter(function (element) {
        return element.label !== "" && element.value !== "";
      });
    }
    const confirmed = window.confirm("Bạn có chắc chắn về các thay đổi?");
    if (confirmed) {
      setLoading(true);
      const newData = {};
      newData.avatar = avatar;
      newData.name = name;
      newData.content = content;
      newData.country = country;
      newData.releaseDay = releaseDay;
      newData.durations = durations;
      newData.genre = genre;
      newData.listImage = listImage.filter(function (element) {
        return element !== "";
      });
      newData.type = type;
      newData.idTrailer = idTrailer;
      newData.episode = newEpisode;
      newData.status = status;
      const res = await sendPost("films/create", newData);
      if (res.status === 200) {
        window.history.back();
        toast.success("Tạo phim thành công!!!");
      }

      setLoading(false);
    }
  };

  const handleEditMultipleInput = (event, index, state, setState) => {
    const value = event.target.value;
    const newState = [...state];
    newState[index] = value;
    setState(newState);
  };
  const handleAdd = (state, setState) => {
    const newState = [...state];
    newState.push("");
    setState(newState);
  };
  const divStyle = {
    border: "1px solid black",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "20px",
  };

  const editCurrentEpisode = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    const newEpisode = { ...episode };
    newEpisode.current = numericValue === "" ? 0 : parseInt(numericValue);
    setEpisode(newEpisode);
  };
  const editTotalEpisode = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    const newEpisode = { ...episode };
    newEpisode.total = numericValue === "" ? 0 : parseInt(numericValue);
    setEpisode(newEpisode);
  };
  const editLabel = (event, index) => {
    const value = event.target.value;
    const newEpisode = { ...episode };
    newEpisode.data[index].label = value;
    setEpisode(newEpisode);
  };
  const editValue = (event, index) => {
    const value = event.target.value;
    const newEpisode = { ...episode };
    newEpisode.data[index].value = value;
    setEpisode(newEpisode);
  };
  const handleAddEpisode = () => {
    const newEpisode = { ...episode };
    if (!newEpisode.data) {
      delete newEpisode.value;
      newEpisode.data = [{ label: "", value: "" }];
    } else {
      newEpisode.data.push({ label: "", value: "" });
    }
    setEpisode(newEpisode);
  };

  return (
    <div>
      <h1>Thêm phim mới</h1>
      <button onClick={_handleSave} disabled={loading}>
        <ClipLoader
          color="black"
          loading={loading}
          size={18}
          style={{ marginRight: 10 }}
        />
        Thêm phim
      </button>

      <div className="details-film">
        <div style={divStyle}>
          <strong>Tên phim:</strong>
          <br />
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            size={name.length}
          />
        </div>
        <div style={divStyle}>
          <strong>Link ảnh đại diện:</strong>
          <br />
          <input
            type="text"
            value={avatar}
            onChange={(event) => {
              setAvatar(event.target.value);
            }}
            size={avatar.length}
          />
        </div>
        <div style={divStyle}>
          <strong>Nội dung phim:</strong>
          <br />
          <textarea
            type="text"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
            style={{ width: "1000px", height: "100px" }}
          />
        </div>
        <div style={divStyle}>
          <strong>Loại phim:</strong>
          <br />
          <input
            type="text"
            value={type}
            onChange={(event) => {
              setType(event.target.value);
            }}
            size={type.length}
          />
        </div>
        <div style={divStyle}>
          <strong>ID Trailer:</strong>
          <br />
          <input
            type="text"
            value={idTrailer}
            onChange={(event) => {
              setIdTrailer(event.target.value);
            }}
            size={idTrailer.length + 3}
          />
        </div>
        <div style={divStyle}>
          <strong>Quốc Gia:</strong>
          <br />
          <input
            type="text"
            value={country}
            onChange={(event) => {
              setCountry(event.target.value);
            }}
            size={country.length}
          />
        </div>
        <div style={divStyle}>
          <strong>Ngày ra mắt:</strong>
          <br />
          <input
            type="text"
            value={releaseDay}
            onChange={(event) => {
              setReleaseDay(event.target.value);
            }}
            size={releaseDay.length}
          />
        </div>
        <div style={divStyle}>
          <strong>Thời lượng:</strong>
          <br />
          <input
            type="text"
            value={durations}
            onChange={(event) => {
              setDurations(event.target.value);
            }}
            size={durations.length}
          />
        </div>
        <div style={divStyle}>
          <strong>Thể loại:</strong>
          <br />
          {genre.map((item, index) => {
            return (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(event) => {
                  handleEditMultipleInput(event, index, genre, setGenre);
                }}
                size={item.length + 5}
              />
            );
          })}
          <br />
          <button onClick={() => handleAdd(genre, setGenre)}>Thêm</button>
        </div>
        <div style={divStyle}>
          <strong>Trạng thái:</strong>
          <br />
          {status.map((item, index) => {
            return (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(event) => {
                  handleEditMultipleInput(event, index, status, setStatus);
                }}
                size={item.length + 5}
              />
            );
          })}
          <br />
          <button onClick={() => handleAdd(status, setStatus)}>Thêm</button>
        </div>
        <div style={divStyle}>
          <strong>Danh sách ảnh:</strong>
          <br />
          {listImage.map((item, index) => {
            return (
              <div key={index}>
                <input
                  type="text"
                  value={item}
                  onChange={(event) => {
                    handleEditMultipleInput(
                      event,
                      index,
                      listImage,
                      setListImage
                    );
                  }}
                  size={item.length + 5}
                />
                <br />
              </div>
            );
          })}
          <br />
          <button onClick={() => handleAdd(listImage, setListImage)}>
            Thêm
          </button>
        </div>

        <div style={divStyle}>
          <strong>Tập phim:</strong>
          <br />
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <p style={{ marginRight: 10 }}>Tập hiện tại: </p>
              <input
                value={episode.current}
                onChange={editCurrentEpisode}
                size={episode?.current?.length}
              />
              <p style={{ marginRight: 10 }}>Tổng số tập: </p>
              <input
                value={episode.total}
                onChange={editTotalEpisode}
                size={episode?.total?.length}
              />
            </div>
            {episode.total <= 1 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={{ marginRight: 10 }}>Link phim: </p>
                <input value={episode?.value} size={episode?.value?.length} />
              </div>
            ) : (
              <div>
                {episode?.data?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ marginRight: 10 }}>Tiêu đề tập: </p>
                      <input
                        value={item?.label}
                        size={item?.label?.length}
                        onChange={(event) => editLabel(event, index)}
                      />
                      <p style={{ marginRight: 10 }}>Link phim: </p>
                      <input
                        value={item?.value}
                        size={item?.value?.length}
                        onChange={(event) => editValue(event, index)}
                      />
                    </div>
                  );
                })}
                <br />
                <button onClick={handleAddEpisode}>Thêm</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFilm;
