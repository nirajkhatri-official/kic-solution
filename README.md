MyComponent - Search and Select Functionality
This project implements a React Native component (MyComponent) that allows users to filter a list of items based on a search term and toggle the selection state of items. It features an input field for searching and displays a list of items that can be selected or deselected.

Issues :
1. Using setTimeout in useEffect to simulate delayed filtering introduces unnecessary complexity and inefficiency.
2. While the handleClear clears the input field, it doesn't reset the dataSource or the search term state.
3. Items not deselection after selection.
4. Lack of Accessibility Features.

For test cases Please refer to the __tests/MyComponent.test.tsx
