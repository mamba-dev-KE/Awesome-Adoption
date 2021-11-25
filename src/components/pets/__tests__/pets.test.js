import { cleanup, render, screen } from "@testing-library/react";
import Pets, { AnimalType } from "../Pets";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
afterEach(() => {
  cleanup();
});

test("matches animal link snapshot", () => {
  const animalLink = {
    img: "https://via.placeholder.com/150",
    type: "playtpus",
    link: "pets/playtpus",
  };
  const tree = renderer
    .create(
      <BrowserRouter>
        <AnimalType
          type={animalLink.type}
          img={animalLink.img}
          link={animalLink.link}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Pets component should render with button", () => {
  render(
    <BrowserRouter>
      <Pets />
    </BrowserRouter>
  );
  const ClickHereButton = screen.getAllByRole("button", {
    name: /Click Here/i,
  });
  expect(ClickHereButton[0]).toBeInTheDocument();
});

test("should render list", () => {
  render(
    <BrowserRouter>
      <Pets />
    </BrowserRouter>
  );
  const petTypeList = screen.getAllByAltText(/Image Img/i);
  expect(petTypeList.length).toBe(6);
});
