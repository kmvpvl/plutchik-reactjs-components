# Library PLUTCHIK-REACTJS-COMPONENTS
[How to use](#how-to-use)

[Flower component](#flower)

[Pending component](#pending)

[Toaster component](#toast-and-toaster)

# Release notes
- **Release 1.2.3 (2024-08-08)**: Componets Toast and Toaster addedd
# Components
## Flower
**Flower** component is the simple way to present Plutchik vector. It has eight leafs. Each leaf if the basic emotion.
### Flower properties
Member|Type|Mandatory|Description
-|-|-|-
vector|IEmotionVector|Yes|Vector to show on flower
width|string|Yes|Width of ocmponent in css format
gridArea|string|No|You can point to special grid area where the component must be shown
## Pending
Pending component shows to user that internal process is to be countinued and user's input is unaccessable. Pending component has two methods incUse and decUse which increase or decrease internal count of use. If internal count of use is equal zero then component hides any its visible elements. If the internal count is positive then Pending component cover all accessable to it area of page from user input and shows the animation with plutchik wheel
### Pending component Properties
The Pending component has no properties
### Pending component Methods
| Method | Description | Parameters |
|-|-|-|
|incUse| Increase use counter. If internal counter of useness is more zero, then pending control is visible| No parameters|
|decUse|Decrease internal use counter. If internal counter of useness is equal zero, then pending control is invisible| No parameters|
### Pending component example
```typescript
class App extends React.Component<{}, {}>{
    pendingRef: React.RefObject<Pending> = React.createRef();
    toDoSomethingAsync() {
        this.pendingRef.current?.incUse()
        asyncFuncWithCallback (param1, (success) => {
            this.pendingRef.current?.decUse()
            ...
        }, (error) => {
            this.pendingRef.current?.decUse()
            ...
        })
    }
    render: React.Node {
        return <div>
            <Pending ref={pendingRef}/>
        </div>
    }
}
``` 

## Toast and Toaster
Toast is a pop-up window with message using to inform user about something. Toast can be of three types: info, warrning and error. Use ToastType enum for choosing toast's type. Toaster creates the Toasts by addToast method
### Toaster
Toaster properties
Member|Type|Mandatory|Description
-|-|-|-
placeCount|number|Yes|The count of places to arrange the toasts. This property is the count of toasts which are visible simultaneously

Toaster methods
| Method | Description | Parameters |
|-|-|-|
addToast|Adds new Toast to the Toaster. See the IToast interface to configure th new Toast|newToast: [IToast](#itoast-interface-members)

### IToast interface members
To create new Toast use the addToast method of Toaster class. addToast method has one parameter of IToast interface with members:

Member|Type|Mandatory|Description
-|-|-|-
type|string of ToastType enum|Yes|One of three types: info, warning, or error|
code|number|No|Reserved for future use|
message|string|Yes|Main message of toast. It's always visible if the toast is visible|
description|string|No|Extra message. If description is defined then Toast has ∴ button. User can see the description if ∴ button clicked by user.|
autohide|number|No| Count of seconds when the toast will be dissapeared without the user interaction. If autohide is undefined and the type of Toast is info, then Toaster set the 3 seconds to autohide as default|
saveInHistory|boolean|No|If this parameter is set true then the Toast won't be deleted from Toaster on hide event. It will be marked as shown and will be saved in the Toaster for future use|
modal|boolean|No|If Toaster has at least one not shown modal Toast then Toaster covers all accessible area and prohibit interaction with other elements on page. Use modal parameter if you want stop user interaction while user reads the message and close the Toast

# How to use
Run command in command-line <code>npm i plutchik-reactjs-components</code>

Add string into your javascript or Typescript

<code>import {
    Charts,
    ComplexEmotion,
    Emotion,
    Flower,
    Formula,
    Chart,
    IEmotionVector,
    Pending,
    Toaster,
    ToastType,
} from 'plutchik-reactjs-components'</code>