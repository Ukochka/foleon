import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import ResourceCard from "./index";

configure({ adapter: new Adapter() });

it("renders Publication Card", () => {
  const wrapper = shallow(<ResourceCard />);
  wrapper.setProps({ title: "Test Publication", type: "publication" });
  const headerText = wrapper.find("p").text();
  expect(headerText).toEqual("Test Publication");
});
