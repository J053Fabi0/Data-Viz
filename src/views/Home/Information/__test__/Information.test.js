import React from "react";
import Information from "../Information";

import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

const data = [
  {
    data: {
      minIDH: 0.1,
      averageIDH: 0.5,
      maxIDH: 1,
    },
  },
];
const selectedStateIndex = 0;

test("Matches snapshot", () => {
  const tree = renderer.create(<Information data={data} selectedStateIndex={selectedStateIndex} />).toJSON();
  expect(tree).toMatchSnapshot();
});
