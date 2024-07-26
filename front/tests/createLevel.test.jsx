import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CreateLevelPage from "./CreateLevelPage";

jest.mock("../src/components/AppContext", () => ({
  AppContext: {
    Consumer: ({ children }) =>
      children({
        jwt: "mock-jwt",
        logout: jest.fn(),
        isError: false,
        levels: [],
        myProfile: {},
        isLightMode: true,
        toggleLightMode: jest.fn(),
        quiz: {},
      }),
  },
}));

describe("CreateLevelPage Component", () => {
  test("renders component correctly", () => {
    const { getByText } = render(<CreateLevelPage />);
    expect(getByText("Create Level")).toBeInTheDocument();
    expect(getByText("View all levels")).toBeInTheDocument();
  });

  test("changes tab content when clicking on tab button", () => {
    const { getByText, getByTestId } = render(<CreateLevelPage />);

    expect(getByText("Create Level")).toBeInTheDocument();
    expect(getByTestId("create-level-tab")).toHaveStyle("display: block;");
    expect(getByTestId("level-table-tab")).toHaveStyle("display: none;");

    fireEvent.click(getByText("View all levels"));

    expect(getByText("View all levels")).toBeInTheDocument();
    expect(getByTestId("create-level-tab")).toHaveStyle("display: none;");
    expect(getByTestId("level-table-tab")).toHaveStyle("display: block;");
  });
});
