import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { sendPost } from "../../../network/requests";
import "./details.scss";
import RenderList from "../../../components/RenderList";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import converTime from "../../../utils/converTime";

const FilmsDetails = () => {
  let { idfilm } = useParams();
  const [data, setData] = useState([]);
  const [eidtMode, setEditMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("");
  const [releaseDay, setReleaseDay] = useState("");
  const [point, setPoint] = useState("");
  const [durations, setDurations] = useState("");
  const [type, setType] = useState("");
  const [idTrailer, setIdTrailer] = useState("");
  const [genre, setGenre] = useState([]);
  const [status, setStatus] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [episode, setEpisode] = useState({});

  const getData = async () => {
    const res = await sendPost("films/details", { idFilm: idfilm });
    if (res.status === 200) {
      setData(res.data);
      setAvatar(res.data.avatar);
      setName(res.data.name);
      setContent(res.data.content);
      setCountry(res.data.country);
      setReleaseDay(res.data.releaseDay);
      setPoint(res.data.point);
      setDurations(res.data.durations);
      setGenre(res.data.genre);
      setStatus(res.data.status);
      setListImage(res.data.listImage);
      setType(res.data.type);
      setIdTrailer(res.data.idTrailer);
      setEpisode(res.data.episode);
    } else {
      toast.error("Error!!!");
    }
  };

  useEffect(() => {
    if (data.length === 0) {
      getData();
    }
  }, []);

  const _handleClickEdit = () => {
    setEditMode(!eidtMode);
    setAvatar(data.avatar);
    setName(data.name);
    setContent(data.content);
    setCountry(data.country);
    setReleaseDay(data.releaseDay);
    setPoint(data.point);
    setDurations(data.durations);
    setGenre(data.genre);
    setStatus(data.status);
    setListImage(data.listImage);
    setType(data.type);
    setIdTrailer(data.idTrailer);
    setEpisode(data.episode);
  };
  const handleEditBasic = (event, setEdit) => {
    setEdit(event.target.value);
  };
  const _handleSave = async () => {
    const newEpisode = { ...episode };
    console.log("newEpisode", newEpisode);
    if (newEpisode.data) {
      newEpisode.data = newEpisode.data.filter(function (element) {
        return element.label !== "" && element.value !== "";
      });
    }
    console.log("newEpisode", newEpisode);
    const confirmed = window.confirm("Bạn có chắc chắn về các thay đổi?");
    if (confirmed) {
      setLoading(true);
      const newData = { ...data };
      newData.avatar = avatar;
      newData.name = name;
      newData.content = content;
      newData.country = country;
      newData.releaseDay = releaseDay;
      newData.point = point;
      newData.durations = durations;
      newData.genre = genre;
      newData.status = status;
      newData.listImage = listImage.filter(function (element) {
        return element !== "";
      });
      newData.type = type;
      newData.idTrailer = idTrailer;
      newData.episode = newEpisode;
      delete newData.listCmt;
      delete newData.updatedAt;
      delete newData.createdAt;
      delete newData._id;

      const res = await sendPost("films/update", {
        idFilm: data._id,
        data: newData,
      });
      if (res.status === 200) {
        toast.success("Cập nhật thành công!!!");
        getData();
        setEditMode(true);
      }

      setLoading(false);
    }
  };
  const _handleDelete = async () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa phim?");
    if (confirmed) {
      const res = await sendPost("films/delete", {
        idFilm: data._id,
      });
      if (res.status === 200) {
        window.history.back();
        toast.success("Xoá thành công!!!");
      }
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
      <h1>Thông tin phim</h1>
      <button onClick={_handleClickEdit}>Chỉnh sửa</button>
      {!eidtMode ? (
        <button onClick={_handleSave} disabled={loading}>
          <ClipLoader
            color="black"
            loading={loading}
            size={18}
            style={{ marginRight: 10 }}
          />
          Lưu thay đổi
        </button>
      ) : (
        <button
          className="delete-button"
          onClick={_handleDelete}
          disabled={loading}
        >
          <ClipLoader
            color="black"
            loading={loading}
            size={18}
            style={{ marginRight: 10 }}
          />
          Xoá phim
        </button>
      )}
      {data.length !== 0 ? (
        <div className="details-film">
          {eidtMode ? (
            <div style={divStyle}>
              <strong>ID phim:</strong>
              <br />
              <p>{data._id}</p>
            </div>
          ) : null}
          <div style={divStyle}>
            <strong>Link ảnh đại diện:</strong>
            <br />
            <RenderList
              eidtMode={eidtMode}
              link={true}
              title={data.avatar}
              value={avatar}
              setValue={setAvatar}
              sizeInput={avatar.length + 3}
            />
          </div>
          <div style={divStyle}>
            <strong>Tên Phim:</strong>
            <br />
            <RenderList
              eidtMode={eidtMode}
              link={false}
              title={data.name}
              value={name}
              setValue={setName}
              sizeInput={name.length + 3}
            />
          </div>
          <div style={divStyle}>
            <strong>Content:</strong>
            <br />
            {eidtMode ? (
              <p>{data.content}</p>
            ) : (
              <textarea
                type="text"
                value={content}
                onChange={(event) => {
                  handleEditBasic(event, setContent);
                }}
                style={{ width: "1000px", height: "100px" }}
              />
            )}
          </div>
          <div style={divStyle}>
            <strong>Loại Phim:</strong>
            <br />
            <RenderList
              eidtMode={eidtMode}
              link={false}
              title={data.type}
              value={type}
              setValue={setType}
              sizeInput={type.length + 3}
            />
          </div>
          <div style={divStyle}>
            <strong>Id Trailer:</strong>
            <br />
            <RenderList
              eidtMode={eidtMode}
              link={false}
              title={data.idTrailer}
              value={idTrailer}
              setValue={setIdTrailer}
              sizeInput={idTrailer.length + 5}
            />
          </div>
          <div style={divStyle}>
            <strong>Quốc gia:</strong>
            <br />
            <RenderList
              eidtMode={eidtMode}
              link={false}
              title={data.country}
              value={country}
              setValue={setCountry}
              sizeInput={country.length + 3}
            />
          </div>
          <div style={divStyle} v>
            <strong>Ngày ra mắt:</strong>
            <br />
            <RenderList
              eidtMode={eidtMode}
              link={false}
              title={data.releaseDay}
              value={releaseDay}
              setValue={setReleaseDay}
              sizeInput={releaseDay.length + 3}
            />
          </div>
          <div style={divStyle}>
            <strong>Điểm:</strong>
            <br />
            <RenderList
              eidtMode={eidtMode}
              link={false}
              title={data.point}
              value={point}
              setValue={setPoint}
              sizeInput={point.toString().length + 3}
              number={true}
            />
          </div>
          <div style={divStyle}>
            <strong>Thời lượng:</strong>
            <br />
            <RenderList
              eidtMode={eidtMode}
              link={false}
              title={data.durations}
              value={durations}
              setValue={setDurations}
              sizeInput={durations.toString().length + 3}
              number={true}
            />
          </div>
          <div style={divStyle}>
            <strong>Thể loại:</strong>
            <br />
            {eidtMode ? (
              data.genre.map((genre, index) => <p key={index}>{genre}</p>)
            ) : (
              <div>
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
            )}
          </div>
          <div style={divStyle}>
            <strong>Trạng thái:</strong>
            <br />
            {eidtMode ? (
              data.status.map((status) => <p key={status}>{status}</p>)
            ) : (
              <div>
                {status.map((item, index) => {
                  return (
                    <input
                      key={index}
                      type="text"
                      value={item}
                      onChange={(event) => {
                        handleEditMultipleInput(
                          event,
                          index,
                          status,
                          setStatus
                        );
                      }}
                      size={item.length + 5}
                    />
                  );
                })}
                <br />
                <button onClick={() => handleAdd(status, setStatus)}>
                  Thêm
                </button>
              </div>
            )}
          </div>
          <div style={divStyle}>
            <strong>Danh sách ảnh:</strong>
            <br />
            {eidtMode ? (
              data.listImage.map((img, index) => (
                <a
                  href={img}
                  key={img}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>{img}</p>
                </a>
              ))
            ) : (
              <div>
                {listImage.map((item, index) => {
                  return (
                    <div>
                      <input
                        key={index}
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
            )}
          </div>
          <div style={divStyle}>
            <strong>Tập phim:</strong>
            <br />
            {eidtMode ? (
              <div>
                <p>Tập hiện tại: {data.episode.current}</p>
                <p>Tổng số tập: {data.episode.total}</p>
                {data.episode.total === 1 ? (
                  <p>Link phim: {data.episode.value}</p>
                ) : (
                  <div>
                    {data?.episode?.data?.map((item, index) => {
                      return (
                        <p key={index}>
                          {item.label}: {item.value}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
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
                    <input
                      value={episode.value}
                      onChange={(event) => {
                        const value = event.target.value;
                        const newEpisode = { ...episode };
                        newEpisode.value = value;
                        setEpisode(newEpisode);
                      }}
                      size={episode?.value?.length}
                    />
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
                            value={item.label}
                            size={item?.label?.length}
                            onChange={(event) => editLabel(event, index)}
                          />
                          <p style={{ marginRight: 10 }}>Link phim: </p>
                          <input
                            value={item.value}
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
            )}
          </div>
          {eidtMode ? (
            <>
              <div style={divStyle}>
                <strong>Danh sách bình luận:</strong>
                {data.listCmt.map((cmt, index) => (
                  <p key={index}>{cmt}</p>
                ))}
              </div>
              <div style={divStyle}>
                <strong>Ngày tạo</strong>
                <p>{converTime(data.createdAt)}</p>
              </div>
              <div style={divStyle}>
                <strong>Ngày cập nhật</strong>
                <p>{converTime(data.updatedAt)}</p>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default FilmsDetails;
