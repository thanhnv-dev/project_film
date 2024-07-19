import React, { useState, useEffect, useContext } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import "./cmts.scss";
import { sendGet, sendPost } from "../../network/requests";
import { useNavigate } from "react-router-dom";
import converTime from "../../utils/converTime";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

function CmtsPage() {
  const [dataCmts, setDataCmts] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await sendGet("cmts/dataall");
    if (res.status === 200) {
      setDataCmts(res.data);
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
      const results = dataCmts.filter((element) => {
        const text1 = convertetText(element.idFilm);
        const text3 = convertetText(element._id);
        const text4 = convertetText(element.idUser);

        const text2 = convertetText(text);

        return (
          text1.includes(text2) ||
          text2.includes(text3) ||
          text3.includes(text4)
        );
      });
      setResults(results);
    } else {
      setResults([]);
    }
  };

  // const __handClickItemFilms = (idfilm) => {
  // navigate(`/dataCmts/${idfilm}`);
  // };
  const deleteItem = async (id) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa đánh giá này?");
    if (confirmed) {
      setLoading(true);
      const res = await sendPost("cmts/delete", { id: id });
      if (res.status === 200) {
        getData();
        toast.success("Xoá thành công!!!");
      }
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
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
            <th>ID Cmt</th>
            <th>ID Film</th>
            <th>ID User</th>
            <th>Đánh giá</th>
            <th>Nội dung</th>
            <th>Ngày cập nhật</th>
          </thead>

          {dataCmts.length !== 0 ? (
            <tbody>
              {(results.length !== 0 ? results : dataCmts).map(
                (order, index) => (
                  <tr
                    key={order._id.toString()}
                    // onClick={() => __handClickItemFilms(order._id)
                    // }
                  >
                    <td>
                      <span>{index}</span>
                    </td>
                    <td>
                      <span>{order._id}</span>
                    </td>
                    <td>
                      <span>{order.idFilm}</span>
                    </td>
                    <td>
                      <span>{order.idUser}</span>
                    </td>
                    <td>
                      <span>{order.rating}</span>
                    </td>
                    <td>
                      <span>{order.content}</span>
                    </td>
                    <td>
                      <span>{converTime(order.updatedAt)}</span>
                    </td>
                    <td>
                      {loading ? (
                        <ClipLoader
                          color="black"
                          loading={loading}
                          size={18}
                          style={{ marginRight: 10 }}
                        />
                      ) : (
                        <span
                          className="delete-text"
                          onClick={() => deleteItem(order._id)}
                        >
                          <span className="underline" style={{ color: "red" }}>
                            Xoá
                          </span>
                        </span>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          ) : null}
        </table>
      </div>
    </div>
  );
}

export default CmtsPage;
