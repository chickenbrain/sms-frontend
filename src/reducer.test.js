import { initialState } from "./App";
import reducer from "./reducer";

let state = initialState;

describe("reducer", () => {
  const data1 = { key: "123", secret: "abc", name: "dummyKey1" };
  const data2 = { key: "1234", secret: "abc2", name: "dummyKey2" };

  it("should add first key to state", () => {
    state = reducer(state, {
      type: "NEWKEY",
      payload: data1
    });
    expect(state).toEqual({
      keys: [data1],
      msg: []
    });
  });

  it("should add second key to state", () => {
    state = reducer(state, {
      type: "NEWKEY",
      payload: data2
    });
    expect(state).toEqual({
      keys: [data1, data2],
      msg: []
    });
  });
});
