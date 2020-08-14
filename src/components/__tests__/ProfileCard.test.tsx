import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import ProfileCard from '../ProfileCard';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

describe('<ProfileCard />', () => {
    test('should display the values', async () => {
        const { getByText } = render(
            <ProfileCard
                userProfileName='Test123'
                userProfileRole='TestRole'
                userProfileCountry='Singapore'
                isEditBtnVisible={false}
            />
        );
        expect(getByText('Test123')).toBeInTheDocument();
        expect(getByText('TestRole')).toBeInTheDocument();
        expect(getByText('Singapore')).toBeInTheDocument();
    });
    test('Snapshot Testing', () => {
        const tree = renderer
            .create(
                <ProfileCard
                    userProfileName='Test123'
                    userProfileRole='TestRole'
                    userProfileCountry='Singapore'
                    isEditBtnVisible={false}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});