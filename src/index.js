import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import styled from "styled-components";

import "./styles.css";
import Barchart from "./Barchart";

const Title = styled.text`
  font-size: 25px;
  font-weight: bold;
  fill: red;
`;

const Svg = styled.svg`
  cursor: pointer;
`;

class App extends React.Component {
  state = {
    data: null,
    value: "fake_trees"
  };

  componentDidMount() {
    d3.tsv("/data.tsv", ({ year, real_trees, fake_trees }) => ({
      year: Number(year),
      real_trees: Number(real_trees),
      fake_trees: Number(fake_trees)
    })).then(data => this.setState({ data }));
  }

  switchView = () =>
    this.setState({
      value: this.state.value === "fake_trees" ? "real_trees" : "fake_trees"
    });

  render() {
    const { data, value } = this.state;
    return (
      <div className="App">
        <h1> Christmas trees sold in USA</h1>
        <h2> ReactVizHoliday #Day 1 </h2>
        <p>
          Christmas tres sold in USA.Each tree 🎄 represents 1 million trees in
          real life.Click to compare real & fake tree sales.
        </p>
        {data ? (
          <Svg width="800" height="1200" onClick={this.switchView}>
            <Title>
              USA buys {d3.mean(data, d => d[value]).toFixed(1)}mil{" "}
              {value === "fake_trees" ? "Fake trees" : "Real trees"} per year on
              average
            </Title>
            <Barchart data={data} value={value} y={0} />
          </Svg>
        ) : null}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
