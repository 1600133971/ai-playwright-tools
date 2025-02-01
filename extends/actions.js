export const createActions = () => {
  return {
    locateElement: {
      name: "locateElement",
      description: "Locates element using a CSS selector and returns elementId. This element ID can be used with other functions to perform actions on the element.",
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    locator_evaluate: {
      name: "locator_evaluate",
      description: "Execute JavaScript code in the page, taking the matching element as an argument.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
          pageFunction: {
            type: "string",
            description:
              "Function to be evaluated in the page context, e.g. node => node.innerText",
          },
        },
      },
    },
    locator_getAttribute: {
      name: "locator_getAttribute",
      description: "Returns the matching element's attribute value.",
      parameters: {
        type: "object",
        properties: {
          attributeName: {
            type: "string",
          },
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_innerHTML: {
      name: "locator_innerHTML",
      description: "Returns the element.innerHTML.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_innerText: {
      name: "locator_innerText",
      description: "Returns the element.innerText.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_textContent: {
      name: "locator_textContent",
      description: "Returns the node.textContent.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_inputValue: {
      name: "locator_inputValue",
      description: "Returns input.value for the selected <input> or <textarea> or <select> element.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_blur: {
      name: "locator_blur",
      description: "Removes keyboard focus from the current element.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_boundingBox: {
      name: "locator_boundingBox",
      description: "This method returns the bounding box of the element matching the locator, or null if the element is not visible. The bounding box is calculated relative to the main frame viewport - which is usually the same as the browser window. The returned object has x, y, width, and height properties.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_check: {
      name: "locator_check",
      description: "Ensure that checkbox or radio element is checked.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_uncheck: {
      name: "locator_uncheck",
      description: "Ensure that checkbox or radio element is unchecked.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_isChecked: {
      name: "locator_isChecked",
      description: "Returns whether the element is checked.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_isEditable: {
      name: "locator_isEditable",
      description: "Returns whether the element is editable. Element is considered editable when it is enabled and does not have readonly property set.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_isEnabled: {
      name: "locator_isEnabled",
      description: "Returns whether the element is enabled. Element is considered enabled unless it is a <button>, <select>, <input> or <textarea> with a disabled property.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_isVisible: {
      name: "locator_isVisible",
      description: "Returns whether the element is visible.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_clear: {
      name: "locator_clear",
      description: "Clear the input field.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_click: {
      name: "locator_click",
      description: "Click an element.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_count: {
      name: "locator_count",
      description: "Returns the number of elements matching the locator.",
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_fill: {
      name: "locator_fill",
      description: "Set a value to the input field.",
      parameters: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
          elementId: {
            type: "string",
          },
        },
      },
    },
    locator_selectOption: {
      name: "locator_selectOption",
      description: "Selects option or options in <select>.",
      parameters: {
        type: "object",
        properties: {
          label: {
            type: "string",
          },
          elementId: {
            type: "string",
          },
        },
      },
    },
    page_goto: {
      name: "page_goto",
      description: "Set a value to the input field.",
      parameters: {
        type: "object",
        properties: {
          url: {
            type: "string",
          },
        },
      },
    },
    page_screenshot: {
      name: "page_screenshot",
      description: "Returns the buffer with the captured screenshot.",
      parameters: {
        type: "object",
        properties: {
          path: {
            type: "string",
          },
          fullPage: {
            type: "boolean",
          },
        },
      },
    },
    expect_toBe: {
      name: "expect_toBe",
      description: "Asserts that the actual value is equal to the expected value.",
      parameters: {
        type: "object",
        properties: {
          actual: {
            type: "string",
          },
          expected: {
            type: "string",
          },
        },
      },
    },
    expect_notToBe: {
      name: "expect_notToBe",
      description: "Asserts that the actual value is not equal to the expected value.",
      parameters: {
        type: "object",
        properties: {
          actual: {
            type: "string",
          },
          expected: {
            type: "string",
          },
        },
      },
    },
    resultAssertion: {
      name: "resultAssertion",
      description: "This function is called when the initial instructions asked to assert something; then 'assertion' is either true or false (boolean) depending on whether the assertion succeeded.",
      parameters: {
        type: "object",
        properties: {
          assertion: {
            type: "boolean",
          },
        },
      },
    },
    resultQuery: {
      name: "resultQuery",
      description: "This function is called at the end when the initial instructions asked to extract data; then 'query' property is set to a text value of the extracted data.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
          },
        },
      },
    },
    resultAction: {
      name: "resultAction",
      description: "This function is called at the end when the initial instructions asked to perform an action.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
    resultError: {
      name: "resultError",
      description: "If user instructions cannot be completed, then this function is used to produce the final response.",
      parameters: {
        type: "object",
        properties: {
          errorMessage: {
            type: "string",
          },
        },
      },
    },
  };
};
