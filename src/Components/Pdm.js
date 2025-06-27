import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Ct from "./Ct";
import { useNavigate } from "react-router-dom";

function Pdm() {
  let obj = useContext(Ct);
  let [data, setData] = useState([]);
  let navigate = useNavigate();
  let [cm, setCm] = useState({});
  let [acom, setAcom] = useState({});
  let [f, setF] = useState(false);

  useEffect(() => {
    let x = Cookies.get("lgc");
    if (x !== undefined) {
      x = JSON.parse(x);
      console.log(x);

      obj.updStore(x);
    }
    axios.get(`${process.env.REACT_APP_API_URL}/pdm/${obj.store.uid}`).then((res) => {
      setData(res.data);
    });
  }, [f]);
  let edit = (pid) => {
    navigate(`/edit/${pid}`);
  };
  let del = (pid) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/del/${pid}`).then((res) => {
      setF(!f);
    });
  };
  let toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  let addComment = (pid) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/addcomm`, {
        pid: pid,
        txt: acom[pid],
        name: obj.store.name,
        uid: obj.store.uid,
      })
      .then((res) => {
        setAcom({ ...acom, [pid]: "" });

        setF(!f);
      });
  };
  let delcom = (pid, cid) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/delcom`, { pid: pid, cid: cid })
      .then((res) => {
        setF(!f);
      });
  };
  let like = (pid) => {
    let t = Cookies.get("lgc");
    if (t != undefined) {
      t = JSON.parse(t);
      axios
        .put(`${process.env.REACT_APP_API_URL}/like`, { pid: pid, uid: t.uid })
        .then((res) => {
          setF(!f);
        });
    } else {
      navigate("/login");
    }
  };
  let dlike = (pid) => {
    let t = Cookies.get("lgc");
    if (t != undefined) {
      t = JSON.parse(t);
      axios
        .put(`${process.env.REACT_APP_API_URL}/dlike`, { pid: pid, uid: t.uid })
        .then((res) => {
          setF(!f);
        });
    } else {
      navigate("/login");
    }
  }
   
  
  return (
    <div className="con">
      {data.map((post) => {
        return (
          <div className="card">
            <h1>{post.title}</h1>
            <p>{toTitleCase(post.desc)}</p>
            <div>
              <p>{post.name}</p>
              <p>{new Date(post.date).toLocaleDateString()}</p>
              <p>{toTitleCase(post.cat)}</p>
              {post.comm !== undefined && <p>Comm : {post.comm}</p>}
              <p>Status : {toTitleCase(post.status)}</p>
            </div>
            <div>
              {obj.store.uid !== null && !post.like.includes(obj.store.uid) && (
                <h2 onClick={() => like(post._id)}>
                  <i class="fa-regular fa-thumbs-up"></i>
                  {post.like.length}
                </h2>
              )}
              {(obj.store.uid === null ||
                (obj.store.uid !== null &&
                  post.like.includes(obj.store.uid))) && (
                <h2 onClick={() => like(post._id)}>
                  <i class="fa-solid fa-thumbs-up"></i>
                  {post.like.length}
                </h2>
              )}

              <button
                className="comm"
                onClick={() => setCm({ ...cm, [post._id]: !cm[post._id] })}
              >
                Comments
              </button>
              {obj.store.uid !== null &&
                !post.dlike.includes(obj.store.uid) && (
                  <h2 onClick={() => dlike(post._id)}>
                    <i class="fa-regular fa-thumbs-down"></i>
                    {post.dlike.length}
                  </h2>
                )}
              {(obj.store.uid === null ||
                (obj.store.uid !== null &&
                  post.dlike.includes(obj.store.uid))) && (
                <h2 onClick={() => dlike(post._id)}>
                  <i class="fa-sharp-duotone fa-solid fa-thumbs-down"></i>
                  {post.dlike.length}
                </h2>
              )}
            </div>
            {cm[post._id] && post.comments.length === 0 && (
              <div className="commentbox">
                <div className="nocomm">No Comments Yet</div>
                {obj.store.token !== "" && (
                  <div className="addcomment">
                    <input
                      type="text"
                      placeholder="Enter Comment"
                      value={acom[post._id]}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setAcom({ ...acom, [post._id]: e.target.value });
                      }}
                    ></input>
                    <button onClick={() => addComment(post._id)}>
                      Comment
                    </button>
                  </div>
                )}
              </div>
            )}
            {cm[post._id] && post.comments && post.comments.length > 0 && (
              <div className="commentbox">
                <table>
                  <tbody>
                    {post.comments.map((comm) => {
                      return (
                        <tr className="comment">
                          <td className="title">{comm.name}</td>
                          <td className="text">{comm.text}</td>
                          {obj.store.uid === comm.id && (
                            <td className="trash">
                              <i
                                onClick={() => delcom(post._id, comm._id)}
                                class="fa-sharp fa-solid fa-trash"
                              ></i>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {obj.store.token !== "" && (
                  <div className="addcomment">
                    <input
                      type="text"
                      placeholder="Enter Comment"
                      value={acom[post._id]}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setAcom({ ...acom, [post._id]: e.target.value });
                      }}
                    ></input>
                    <button onClick={() => addComment(post._id)}>
                      Comment
                    </button>
                  </div>
                )}
              </div>
            )}
            <div>
              <button onClick={() => edit(post._id)}>Edit</button>
              <button onClick={() => del(post._id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Pdm;
