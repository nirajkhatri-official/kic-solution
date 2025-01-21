import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import MyComponent from '../src/MyComponent';

describe('MyComponent', () => {
  const mockData = [
    {id: 1, name: 'Apple'},
    {id: 2, name: 'Mango'},
    {id: 3, name: 'Banana'},
    {id: 4, name: 'Orange'},
    {id: 5, name: 'Grapes'},
  ];

  it('renders the correct initial list of items', () => {
    const {getByText} = render(<MyComponent data={mockData} />);
    mockData.forEach(item => {
      expect(getByText(item.name)).toBeTruthy();
    });
  });

  it('filters items correctly based on search term', () => {
    render(<MyComponent data={mockData} />);
    const searchInput = screen.getByLabelText('Search Input');

    // Perform a search
    fireEvent.changeText(searchInput, 'apple');
    expect(screen.queryByText('Apple')).toBeTruthy();
    expect(screen.queryByText('Mango')).toBeNull();

    // Test case insensitivity
    fireEvent.changeText(searchInput, 'ApP');
    expect(screen.queryByText('Apple')).toBeTruthy();
  });

  it('toggles selection state on item press', () => {
    const {getByText} = render(<MyComponent data={mockData} />);
    const firstItem = getByText('Apple');

    // Select the item
    fireEvent.press(firstItem);
    const selectedText = screen.getByLabelText('Apple Selected');
    expect(selectedText).toBeTruthy();

    // Deselect the item
    fireEvent.press(firstItem);
    const notSelectedText = screen.getByLabelText('Apple Not Selected');
    expect(notSelectedText).toBeTruthy();
  });

  it('clears the search input and resets the list', () => {
    render(<MyComponent data={mockData} />);
    const searchInput = screen.getByLabelText('Search Input');
    const clearButton = screen.getByText('Clear');

    // Perform a search
    fireEvent.changeText(searchInput, 'apple');
    expect(screen.queryByText('Apple')).toBeTruthy();
    expect(screen.queryByText('Mango')).toBeNull();

    // Press the clear button
    fireEvent.press(clearButton);
    expect(searchInput.props.value).toBe('');
    mockData.forEach(item => {
      expect(screen.queryByText(item.name)).toBeTruthy();
    });
  });

  it('updates the filtered data when new props are received', () => {
    const {rerender, getByText} = render(<MyComponent data={mockData} />);

    const newData = [
      {id: 6, name: 'Strawberry'},
      {id: 7, name: 'Blueberry'},
    ];

    rerender(<MyComponent data={newData} />);

    // Check the new data is rendered
    expect(getByText('Strawberry')).toBeTruthy();
    expect(getByText('Blueberry')).toBeTruthy();

    // Check old data is no longer rendered
    mockData.forEach(item => {
      expect(screen.queryByText(item.name)).toBeNull();
    });
  });
});
