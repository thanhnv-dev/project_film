import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { sendPost } from "../../../network/requests";
import "./details.scss";
import RenderList from "../../../components/RenderList";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import converTime from "../../../utils/converTime";
import { Formik } from "formik";
import { SignUpSchema } from "../../../utils/SchemaValidation";

const FilmsDetails = () => {
  let { userId } = useParams();
  const [data, setData] = useState({});
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
    const res = await sendPost("admin/getdatauser", { userId: userId });
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
    getData();
  }, []);

  const _handleClickEdit = () => {
    setEditMode(!eidtMode);
    setAvatar(data.avatar);
    setName(data.name);
    setContent(data.content);
  };
  const handleEditBasic = (event, setEdit) => {
    setEdit(event.target.value);
  };
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

      const res = await sendPost("films/update", {
        idFilm: data._id,
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
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xoá người dùng này không?"
    );
    if (confirmed) {
      const res = await sendPost("admin/deleteuser", {
        userId: data._id,
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

  return (
    <div>
      <h1>Thông tin người dùng</h1>
      <button onClick={_handleClickEdit}>Chỉnh sửa</button>
      {!eidtMode ? null : (
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
          Xoá người dùng
        </button>
      )}
      {data.length !== 0 ? (
        <div className="details-film">
          {eidtMode ? (
            <>
              <div style={divStyle}>
                <strong>Tên người dùng</strong>
                <br />
                <p>{data.name}</p>
              </div>
              <div style={divStyle}>
                <strong>Email</strong>
                <br />
                <p>{data.email}</p>
              </div>
              <div style={divStyle}>
                <strong>Mật khẩu</strong>
                <br />
                <p>{data.password}</p>
              </div>
              <div style={divStyle}>
                <strong>Danh sách yêu thích</strong>
                {data.listLike?.map((item) => {
                  return <p>{item}</p>;
                })}
              </div>
              <div style={divStyle}>
                <strong>Danh sách phát</strong>
                {data.listPlay?.map((item) => {
                  return (
                    <div>
                      <p>{item.title}</p>
                      {item?.data.map((item) => (
                        <p style={{ marginLeft: 20 }}> - {item}</p>
                      ))}
                    </div>
                  );
                })}
              </div>
              <div style={divStyle}>
                <strong>Lịch sử xem</strong>
                {data.listHistory?.map((item) => {
                  return <p>{item.idFilm}</p>;
                })}
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
          ) : (
            <Formik
              initialValues={{
                email: data.email,
                password: data.password,
                name: data.name,
                confirmPassword: data.password,
              }}
              validationSchema={SignUpSchema}
              onSubmit={async (values, { setSubmitting }) => {
                delete values.confirmPassword;
                const res = await sendPost("admin/updateuser", {
                  idUser: data._id,
                  data: values,
                });
                if (res.status === 200) {
                  window.history.back();
                  toast.success("Cập nhật thông tin người dùng thành công!!!");
                } else {
                  toast.error(res.data.msg);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div style={divStyle}>
                    <strong>Tên người dùng</strong>
                    <br />
                    <input
                      type="tex"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <br />
                    <p style={{ color: "red" }}>
                      {errors.name && touched.name && errors.name}
                    </p>
                  </div>
                  <div style={divStyle}>
                    <strong>Email</strong>
                    <br />
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      size={values.email.length + 3}
                    />
                    <br />
                    <p style={{ color: "red" }}>
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <div style={divStyle}>
                    <strong>Mật khẩu</strong>
                    <br />
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <br />
                    <p style={{ color: "red" }}>
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>
                  <div style={divStyle}>
                    <strong>Xác nhận mật khẩu</strong>
                    <br />
                    <input
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                    />
                    <br />
                    <p style={{ color: "red" }}>
                      {errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword}
                    </p>
                  </div>
                  <button type="submit" disabled={isSubmitting}>
                    <ClipLoader
                      color="black"
                      loading={loading}
                      size={18}
                      style={{ marginRight: 10 }}
                    />
                    Lưu chỉnh sửa
                  </button>
                </form>
              )}
            </Formik>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FilmsDetails;
