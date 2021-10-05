import { Component } from "react";
import { Button } from "../../Components/Button/Button";
import { Posts } from "../../Components/Posts";
import { TextInput } from "../../Components/TextInput/TextInput";
import { loadPosts } from "../../Utils/load-posts";

import "./style.css";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: "",
  };

  async componentDidMount() {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    console.log(page);
    console.log(postsPerPage);
    const nextPage = page + postsPerPage;

    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    console.log(nextPosts);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const disableLoadPosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        <div className="search-container" />
        {!!searchValue && <h1>Search value {searchValue}</h1>}
        <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        <div />

        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

        {filteredPosts.length === 0 && <h1>Não existe posts</h1>}

        <div class="button-container">
          {!searchValue && (
            <Button
              click={this.loadMorePosts}
              disabled={disableLoadPosts}
              text="Load more posts"
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
