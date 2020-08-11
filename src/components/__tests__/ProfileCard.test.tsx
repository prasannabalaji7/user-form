import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import ProfileCard from "../ProfileCard";

describe("<ProfileCard />", () => {
    test("should display the values", async () => {
        const { getByText } = render(<ProfileCard userProfileName="Test123" file="" userProfileRole="TestRole" userProfileCountry="Singapore" isEditEnabled={false} />)
        expect(getByText('Test123')).toBeInTheDocument();
        expect(getByText('TestRole')).toBeInTheDocument();
        expect(getByText('Singapore')).toBeInTheDocument();
    });
});