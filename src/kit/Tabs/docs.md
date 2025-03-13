# Tabs Component Documentation

## Overview

The `Tabs` component is a reusable UI element that allows for easy creation of tabbed navigation. It supports customizable tab headers and content rendering, providing a flexible way to switch between different views in an interface.

## Import

```tsx
import { Tabs } from './Tabs';
export { TabType } from './constants';
```

## Props

| Prop            | Type                                                                              | Required | Default | Description                                                                           |
| --------------- | --------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------- |
| `renderTabs`    | `(handleTabClick: (index: number) => void, activeTab: number) => React.ReactNode` | ✅       | `N/A`   | Function to render the tab headers, receiving the click handler and active tab index. |
| `renderContent` | `(activeTab: number) => React.ReactNode`                                          | ✅       | `N/A`   | Function to render the tab content, receiving the active tab index.                   |

## Usage

### Basic Tabs Component

```tsx
import { Tabs } from '@/kit';
import { TabType } from './constants';

<Tabs
  renderTabs={(handleTabClick, activeTab) => (
    <div>
      <button
        onClick={() => handleTabClick(TabType.TAB_1)}
        className={activeTab === TabType.TAB_1 ? 'active' : ''}
      >
        {TabType.TAB_1}
      </button>
      <button
        onClick={() => handleTabClick(TabType.TAB_2)}
        className={activeTab === TabType.TAB_2 ? 'active' : ''}
      >
        {TabType.TAB_2}
      </button>
      <button
        onClick={() => handleTabClick(TabType.TAB_3)}
        className={activeTab === TabType.TAB_3 ? 'active' : ''}
      >
        {TabType.TAB_3}
      </button>
    </div>
  )}
  renderContent={activeTab => {
    switch (activeTab) {
      case TabType.TAB_1:
        return <div>Content for Tab 1</div>;
      case TabType.TAB_2:
        return <div>Content for Tab 2</div>;
      case TabType.TAB_3:
        return <div>Content for Tab 3</div>;
      default:
        return <div>No Content</div>;
    }
  }}
/>;
```

### Example with Styled Components

```tsx
import styled from 'styled-components';
import { Tabs } from '@/kit';

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabsHeader = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: ${({ theme }) => `${theme.pxs.x3}px`};
`;

const TabsContent = styled.div`
  padding: ${({ theme }) =>
    `${theme.pxs.x3}px ${theme.pxs.x3}px ${theme.pxs.x5}px ${theme.pxs.x3}px`};
  ${({ theme }) => theme.fonts.lightManrope};
  color: ${({ theme }) => theme.color.secWhite};
`;

function renderTabs(
  handleTabClick: (index: number) => void,
  activeTab: number,
) {
  return (
    <StyledTabsHeader>
      <button onClick={() => handleTabClick(0)}>Tab 1</button>
      <button onClick={() => handleTabClick(1)}>Tab 2</button>
      <button onClick={() => handleTabClick(2)}>Tab 3</button>
    </StyledTabsHeader>
  );
}

function renderContent(activeTab: number) {
  return activeTab === 0 ? (
    <div>Content for Tab 1</div>
  ) : activeTab === 1 ? (
    <div>Content for Tab 2</div>
  ) : (
    <div>Content for Tab 3</div>
  );
}

<Tabs renderTabs={renderTabs} renderContent={renderContent} />;
```

### TabType Enum

`TabType` contains values for the tabs (Tab 1, Tab 2, Tab 3), and is used in the `renderTabs` and `renderContent` functions to determine the active tab and display the corresponding content. It is passed as a prop and is used to manage the tabs in the `Tabs` component.

```tsx
export enum TabType {
  TAB_1 = 'Tab 1',
  TAB_2 = 'Tab 2',
  TAB_3 = 'Tab 3',
}
```

## Notes

- `renderTabs` should return the tab headers and take care of updating the active tab state using `handleTabClick`.
- `renderContent` is responsible for displaying the content corresponding to the active tab index.
- You can style the tab headers and content separately by using styled-components or your preferred styling method.

## Conclusion

The `Tabs` component offers a flexible and customizable way to create tabbed interfaces in React applications. By passing custom render functions for tabs and content, you can fully control the behavior and appearance of the tabs and content sections. This component provides an excellent way to manage complex, multi-view user interfaces.
