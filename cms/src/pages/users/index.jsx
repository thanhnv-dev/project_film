import React, { useState, useEffect, useContext } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import "./users.scss";
import { sendGet } from "../../network/requests";
import { useNavigate } from "react-router-dom";
import converTime from "../../utils/converTime";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await sendGet("admin/userdata");
    if (res.status === 200) {
      setUsers(res.data);
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
      const results = users.filter((element) => {
        const text1 = convertetText(element.name);
        const text3 = convertetText(element._id);
        const text4 = convertetText(element.email);

        const text2 = convertetText(text);

        return (
          text1.includes(text2) ||
          text3.includes(text2) ||
          text4.includes(text2)
        );
      });
      setResults(results);
    } else {
      setResults([]);
    }
  };

  const __handClickItemFilms = (userId) => {
    navigate(`/users/${userId}`);
  };

  return (
    <div className="dashboard-content">
      <DashboardHeader
        btnText="Thêm người dùng mới"
        onClick={() => navigate("/users/create")}
      />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Danh sách người dùng</h2>
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
            <th>Tên</th>
            <th>Email</th>
            <th>Ngày tạo</th>
            <th>Ngày cập nhật</th>
          </thead>

          {users.length !== 0 ? (
            <tbody>
              {(results.length !== 0 ? results : users).map((user, index) => (
                <tr
                  key={user._id.toString()}
                  onClick={() => __handClickItemFilms(user._id)}
                >
                  <td>
                    <span>{index}</span>
                  </td>
                  <td>
                    <span>{user._id}</span>
                  </td>
                  <td>
                    <span>{user.name}</span>
                  </td>
                  <td>
                    <span>{user.email}</span>
                  </td>
                  <td>
                    <span>{converTime(user.createdAt)}</span>
                  </td>
                  <td>
                    <span>{converTime(user.updatedAt)}</span>
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

export default UsersPage;
