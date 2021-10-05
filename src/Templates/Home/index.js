import { useState, useEffect, useCallback } from "react";
import { Button } from "../../Components/Button/Button";
import { Posts } from "../../Components/Posts";
import { TextInput } from "../../Components/TextInput/TextInput";
import { loadPosts } from "../../Utils/load-posts";

import "./style.css";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const disableLoadPosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [0, postsPerPage]);

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container" />
      {!!searchValue && <h1>Search value {searchValue}</h1>}
      <TextInput searchValue={searchValue} handleChange={handleChange} />
      <div />

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <h1>Não existe posts</h1>}

      <div className="button-container">
        {!searchValue && (
          <Button
            click={loadMorePosts}
            disabled={disableLoadPosts}
            text="Load more posts"
          />
        )}
      </div>
    </section>
  );
};

export default Home;
