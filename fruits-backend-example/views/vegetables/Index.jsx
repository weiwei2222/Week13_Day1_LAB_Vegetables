const React = require("react");

class Index extends React.Component {
  render() {
    const { vegetables } = this.props;
    // const fruits = this.props.fruits;

    return (
      <div>
        <h1>vegetables Index Page</h1>
        <nav>
          <a href="/vegetables/new">Create a New vegetables</a>
        </nav>
        <ul>
          {vegetables.map((vegetable, i) => {
            return (
              <li>
                The <a href={`/vegetables/${i}`}>{vegetable.name}</a> is{" "}
                {vegetable.color} <br></br>
                {vegetable.readyToEat
                  ? `It is ready to eat`
                  : `It is NOT ready to eat`}
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

module.exports = Index;
