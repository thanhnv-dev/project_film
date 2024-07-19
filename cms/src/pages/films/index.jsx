import React, { useState, useEffect, useContext } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import "../styles.css";
import { sendGet } from "../../network/requests";
import { useNavigate } from "react-router-dom";
import converTime from "../../utils/converTime";

function Films() {
  const [films, setFilms] = useState([]);
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await sendGet("films/data");
    if (res.status === 200) {
      setFilms(res.data);
    }
  };

  const convertetText = (text) =>
    text
      .trim()
      .toLocaleLowerCase()
      .replaceAll(" ", "")
      .replaceAll(":", "")
      .replaceAll("`", "")
      .replaceAll("'", "")
      .replaceAll("-", "");

  const __handleSearch = (event) => {
    const text = event.target.value;

    if (text !== "") {
      const results = films.filter((element) => {
        const text1 = convertetText(element.name);
        const text3 = convertetText(element._id);

        const text2 = convertetText(text);

        return text1.includes(text2) || text3.includes(text2);
      });
      setResults(results);
    } else {
      setResults([]);
    }
  };

  const __handClickItemFilms = (idfilm) => {
    navigate(`/films/${idfilm}`);
  };

  return (
    <div className="dashboard-content">
      <DashboardHeader
        btnText="Thêm phim mới"
        onClick={() => navigate("/films/create")}
      />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Danh sách phim</h2>
          <div className="dashboard-content-search">
            <input
              type="text"
              placeholder="Search.."
              className="dashboard-content-input"
              onChange={(e) => __handleSearch(e)}
            />
          </div>
        </div>

        <table>
          <thead>
            <th>STT</th>
            <th>ID</th>
            <th>Tên Phim</th>
            <th>Điểm</th>
            <th>Trạng thái tập</th>
            <th>Ngày tạo</th>
            <th>Ngày cập nhật</th>
          </thead>

          {films.length !== 0 ? (
            <tbody>
              {(results.length !== 0 ? results : films).map((order, index) => (
                <tr
                  key={order._id.toString()}
                  onClick={() => __handClickItemFilms(order._id)}
                >
                  <td>
                    <span>{index}</span>
                  </td>
                  <td>
                    <span>{order._id}</span>
                  </td>
                  <td>
                    <span>{order.name}</span>
                  </td>
                  <td>
                    <span>{order.point}</span>
                  </td>
                  <td>
                    <span>
                      {order.episode.current}/{order.episode.total}
                    </span>
                  </td>
                  <td>
                    <span>{converTime(order.createdAt)}</span>
                  </td>
                  <td>
                    <span>{converTime(order.updatedAt)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
      </div>
    </div>
  );
}

export default Films;
