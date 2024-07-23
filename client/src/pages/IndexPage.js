import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:4000/post?pageNo=${pageNo}`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, [pageNo]);

  const nextPage = () => {
    setPageNo(pageNo + 1);
  };

  const previousPage = () => {
    if (pageNo !== 1) setPageNo(pageNo - 1);
  };

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" onClick={previousPage}>
              Previous
            </a>
          </li>
          <li className={"page-item page-link active"}>{pageNo}</li>
          <li className="page-item">
            <a className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
