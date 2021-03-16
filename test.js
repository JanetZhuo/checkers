//This is just a demo to show how I may test since there is no UI at the moment and checker.js is not executable
//Assume we use react for this checker application, then we can use Jest and Enzyme to test
//We need to import those libraries and components in real world

describe("rendering components", () => {
    it("renders App component", () => {
        shallow(<App />);
    });
    it("renders Checker component", () => {
        shallow(<Checker />);
    });
    it("renders App component header", () => {
        const wrapper = shallow(<App />);
        const header = (<h1 className="header">Welcome to the checker game!</h1>);
        expect(wrapper.contains(header)).toEqual(true);
    });
});


const players = [{ name: 'white player' }, { name: 'red player' }];
describe("passing props", () => {
    const playerWrapper = mount(<Player players={players} />);
    it("accepts player props", () => {
        expect(playerWrapper.props().players).toEqual(players);
    });
});

describe("logic", () => {
    const checkerWrapper = mount(<Checker />);
    const playerWrapper = mount(<Player players={players} />);
    checkerWrapper.find("#white-move").simulate("click");
    it("button click - change turns", () => {
        const playerNameValue = playerWrapper.find(".playerName").text();
        const expectedValue = 'red player';
        expect(savingsValue).toEqual(expectedValue);
    });
});

describe("snapshots", () => {
    it("App snapshot", () => {
        const tree = shallow(<App />);
        expect(toJson(tree)).toMatchSnapshot();
    });
    it("Checker snapshots", () => {
        const checkerTree = shallow(<Checker />);
        expect(toJson(checkerTree)).toMatchSnapshot();
    });
});