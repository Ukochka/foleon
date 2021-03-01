import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Header from "./index";

configure({ adapter: new Adapter() });

it("renders Resource header", () => {
  const wrapper = shallow(<Header />);
  const headerText = wrapper.find("h1").text();
  expect(headerText).toEqual("Resources");
});
