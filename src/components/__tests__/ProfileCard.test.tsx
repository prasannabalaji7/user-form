import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import ProfileCard from '../ProfileCard';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

describe('<ProfileCard />', () => {
    test('should display the values', async () => {
        const { getByText } = render(<ProfileCard userProfileName='Test123' file='' userProfileRole='TestRole' userProfileCountry='Singapore' isEditEnabled={false} />)
        expect(getByText('Test123')).toBeInTheDocument();
        expect(getByText('TestRole')).toBeInTheDocument();
        expect(getByText('Singapore')).toBeInTheDocument();
    });
    test('Select File to Be uploaded', async () => {
        const { getByTestId } = render(<ProfileCard userProfileName='Test123' file='' userProfileRole='TestRole' userProfileCountry='Singapore' isEditEnabled={false} />)
        fireEvent.change(getByTestId('transfer-file'), {
            target: {files: [{type: 'png'}]}
        })
    });
    test('Click Upload Button', async () => {
        const { getByTestId } = render(<ProfileCard userProfileName='Test123' file='' userProfileRole='TestRole' userProfileCountry='Singapore' isEditEnabled={false} />)
        fireEvent.click(getByTestId('upload-button'), undefined)
    });

    test('Snapshot Testing', () => {
        const tree = renderer
          .create(<ProfileCard userProfileName='Test123' file='' userProfileRole='TestRole' userProfileCountry='Singapore' isEditEnabled={false} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
    });
}); 