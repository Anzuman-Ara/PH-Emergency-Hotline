# PH-Emergency-Hotline

### 1\. What is the difference between `getElementById`, `getElementsByClassName`, and `querySelector`/`querySelectorAll`?

  * `getElementById`: This method retrieves a single element from the DOM by its unique **ID**. Since IDs must be unique, it always returns a single element object or `null` if none is found.
  * `getElementsByClassName`: This method retrieves a collection of elements from the DOM by their class name. It returns a **live HTMLCollection**, which means it automatically updates if elements with that class are added or removed from the page.
  * `querySelector`: This method returns the **first element** that matches a specified CSS selector. It can select elements by ID, class, tag name, or any combination of CSS selectors. It returns a single element or `null` if no matches are found.
  * `querySelectorAll`: This method returns a **static NodeList** containing all elements that match a specified CSS selector. Unlike `getElementsByClassName`, the NodeList does not automatically update with changes to the DOM.

-----

### 2\. How do you create and insert a new element into the DOM?

1.  **Create the element:**  By Using `document.createElement()` we can create a new HTML element.

    ```javascript
    const newElement = document.createElement('div');
    ```

2.  **Add content or attributes:** We can set its text content using `textContent` or `innerHTML`, and add classes or attributes.

    ```javascript
    newElement.textContent = 'This is a new element!';
    newElement.classList.add('new-class');
    ```

3.  **Insert the element:** Use one of the following methods to insert it into an existing parent element:

      * `appendChild()`: Inserts the new element as the last child of a parent element.
      * `prepend()`: Inserts the new element as the first child of a parent element.
      * `insertBefore()`: Inserts the new element before a specified child element.

    <!-- end list -->

    ```javascript
    const parentElement = document.querySelector('.card-section');
    parentElement.appendChild(newElement);
    ```

-----

### 3\. What is Event Bubbling and how does it work?

**Event bubbling** is the process by which an event propagates or "bubbles up" through the DOM tree from the element where the event occurred to its ancestors.

When an event, such as a click, happens on an element (e.g., a button), the browser first triggers the event on that specific element. It then moves up to the element's parent, then to the parent's parent, and so on, all the way up to the `document` and `window` objects. This allows a single event to be handled at multiple levels of the DOM tree.

For example, a click on a button inside a card will bubble up to the card, then to the `card-section`, and finally to the `document`.

-----

### 4\. What is Event Delegation in JavaScript? Why is it useful?

**Event delegation** is a technique that leverages event bubbling. Instead of adding an event listener to every single child element, you place a single event listener on a common ancestor. When an event bubbles up from a child, the single listener on the ancestor handles it.

This is extremely useful because:

  * **Performance:** It reduces the number of event listeners on a page, saving memory and improving performance, especially with a large number of elements.
  * **Dynamic elements:** It works automatically for elements added to the DOM after the listener has been set up. For example, the event listener on the `.card-section` can handle events for all cards, even those that are dynamically created.
  * **Cleaner code:** It results in cleaner, more concise code by centralizing event handling logic.

-----

### 5\. What is the difference between `preventDefault()` and `stopPropagation()` methods?

  * preventDefault(): This method **stops the browser's default behavior** for a specific event. For example, using it on a form submission event (`<form onsubmit="...">`) prevents the page from reloading, while using it on a link (`<a>`) prevents the browser from navigating to the URL.
  * stopPropagation(): This method **stops the event from bubbling up** the DOM tree. It prevents the event from reaching parent elements. If you call `stopPropagation()` on a button's click event, the event will not "bubble up" to the parent card, and any listeners on the parent will not be triggered.
