import {render} from "@testing-library/react-native"

import AppHeader from "@/components/AppHeader"

describe('<AppHeader />', () => {
    test("First part of text renders correctly on AppHeader", () => {
        const {getByText} = render(<AppHeader />);

        getByText("SmartCart");
    });

    test("Second part of text renders correctly on AppHeader",  () => {
        const {getByText} = render(<AppHeader/>);
        getByText("Save on every shop")
    });
});